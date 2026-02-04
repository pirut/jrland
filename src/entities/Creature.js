import { CREATURES } from "../config.js";
import { clamp } from "../utils/math.js";
import { Random } from "../core/Random.js";
import { AnimalNeeds } from "./AnimalNeeds.js";
import { CreatureMind } from "./CreatureMind.js";

export class Creature {
  constructor({ id, type, x, y, seed }) {
    const def = CREATURES[type];
    this.id = id;
    this.type = type;
    this.x = x;
    this.y = y;
    this.homeX = x;
    this.homeY = y;
    this.maxHealth = def?.maxHealth ?? 20;
    this.health = this.maxHealth;
    this.speed = def?.speed ?? 1.4;
    this.aggroRange = def?.aggroRange ?? 3;
    this.attackRange = def?.attackRange ?? 0.8;
    this.damage = def?.damage ?? 6;
    this.attackCooldown = 0;
    this.hitFlash = 0;
    this.state = "idle";
    this.wanderDir = { x: 0, y: 0 };
    this.wanderTimer = 0;
    this.rng = Random.mulberry32(seed);
    this.needs = new AnimalNeeds(def, this.rng);
    this.mind = new CreatureMind(this);
    this.anger = 0;
    this.actionTimer = 0;
  }

  get def() {
    return CREATURES[this.type];
  }

  takeDamage(amount) {
    this.health = clamp(this.health - amount, 0, this.maxHealth);
    this.hitFlash = 0.2;
    this.anger = 6;
  }

  updateWander(dt) {
    this.wanderTimer -= dt;
    if (this.wanderTimer <= 0) {
      const angle = this.rng() * Math.PI * 2;
      this.wanderDir.x = Math.cos(angle);
      this.wanderDir.y = Math.sin(angle);
      this.wanderTimer = 1.5 + this.rng() * 2;
    }
  }

  update(dt, player, world, weatherType, isNight, creatures, onAttack) {
    const result = { attackedPlayer: false, attackedPrey: false };
    this.attackCooldown = Math.max(0, this.attackCooldown - dt);
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    this.anger = Math.max(0, this.anger - dt);
    this.actionTimer = Math.max(0, this.actionTimer - dt);
    const nightAggro = isNight ? this.def?.nightAggroMultiplier ?? 1.25 : 1;
    const nightSpeed = isNight ? this.def?.nightSpeedMultiplier ?? 1.2 : 1;
    const speedMod = (weatherType === "storm" ? 0.85 : weatherType === "fog" ? 0.92 : 1) * nightSpeed;

    let intent = this.mind.update(dt, { player, world, creatures, isNight });
    const hungerRatio = this.needs.ratioHunger();
    if (this.def?.diet === "carnivore") {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const dist = Math.hypot(dx, dy);
      const aggressive = this.anger > 0 || hungerRatio < (this.def.huntHungerThreshold ?? 0.6);
      const aggroRange = this.aggroRange * nightAggro * (aggressive ? 1.1 : 0.7);
      if (dist < aggroRange && aggressive) {
        intent = { state: "chase", target: player, speed: 1.15, attackPlayer: true };
      }
    }

    const moving = intent.speed > 0.1 && intent.state !== "rest";
    const stressed = intent.state === "flee" || intent.state === "hunt" || intent.state === "chase";
    this.needs.tick(dt, { moving, stressed, nocturnal: this.def?.nocturnal, isNight });

    if (this.needs.hunger <= 0 || this.needs.thirst <= 0) {
      this.health = clamp(this.health - dt * (this.def?.starveDamage ?? 0.6), 0, this.maxHealth);
    }

    if (intent.state === "rest") {
      this.needs.rest(dt, this.def?.restBonus ?? 1);
      this.state = intent.state;
      return result;
    }

    if (intent.state === "graze") {
      this.state = intent.state;
      if (this.actionTimer <= 0) {
        this.needs.feed(this.def?.grazeGain ?? 10);
        this.actionTimer = 1 + this.rng() * 0.6;
      }
      return result;
    }

    if (intent.state === "drink" && intent.target) {
      this.state = intent.state;
      const dist = Math.hypot(intent.target.x - this.x, intent.target.y - this.y);
      if (dist < 0.6 && this.actionTimer <= 0) {
        this.needs.drink(this.def?.drinkGain ?? 30);
        this.actionTimer = 1 + this.rng() * 0.5;
        return result;
      }
      this.moveToward(intent.target.x, intent.target.y, this.speed * speedMod * (intent.speed ?? 1), dt, world);
      return result;
    }

    if (intent.state === "eat" && intent.target) {
      this.state = intent.state;
      const dist = Math.hypot(intent.target.x - this.x, intent.target.y - this.y);
      if (dist < 0.6 && this.actionTimer <= 0) {
        if (intent.target.chunk && !intent.target.chunk.removed.has(intent.target.id)) {
          intent.target.chunk.removed.add(intent.target.id);
        }
        this.needs.feed(this.def?.berryGain ?? 32);
        this.actionTimer = 1 + this.rng() * 0.6;
        return result;
      }
      this.moveToward(intent.target.x, intent.target.y, this.speed * speedMod * (intent.speed ?? 1), dt, world);
      return result;
    }

    if (intent.state === "hunt" && intent.attackTarget) {
      this.state = intent.state;
      const target = intent.attackTarget;
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.05) {
        this.tryMove((dx / dist) * this.speed * speedMod * 1.1, (dy / dist) * this.speed * speedMod * 1.1, dt, world);
      }
      if (dist < this.attackRange && this.attackCooldown <= 0) {
        target.takeDamage(this.damage);
        if (target.health <= 0) {
          this.needs.feed(this.def?.meatGain ?? 30);
        }
        this.attackCooldown = 1.4;
        result.attackedPrey = true;
        return result;
      }
      return result;
    }

    if (intent.state === "chase" && intent.target) {
      this.state = intent.state;
      const dx = intent.target.x - this.x;
      const dy = intent.target.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.05) {
        this.tryMove((dx / dist) * this.speed * speedMod * 1.15, (dy / dist) * this.speed * speedMod * 1.15, dt, world);
      }
      if (dist < this.attackRange && this.attackCooldown <= 0) {
        if (onAttack) onAttack(this.damage);
        this.attackCooldown = 1.4;
        result.attackedPlayer = true;
        return result;
      }
      return result;
    }

    if (intent.state === "flee" && intent.target) {
      this.state = intent.state;
      this.moveToward(intent.target.x, intent.target.y, this.speed * speedMod * 1.2, dt, world);
      return result;
    }

    if (intent.state === "return" && intent.target) {
      this.state = intent.state;
      this.moveToward(intent.target.x, intent.target.y, this.speed * speedMod * 0.9, dt, world);
      return result;
    }

    this.state = "wander";
    this.updateWander(dt);
    this.tryMove(
      this.wanderDir.x * this.speed * 0.4 * nightSpeed,
      this.wanderDir.y * this.speed * 0.4 * nightSpeed,
      dt,
      world
    );

    return result;
  }

  moveToward(tx, ty, speed, dt, world) {
    const dx = tx - this.x;
    const dy = ty - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 0.05) return;
    this.tryMove((dx / dist) * speed, (dy / dist) * speed, dt, world);
  }

  tryMove(vx, vy, dt, world) {
    const nextX = this.x + vx * dt;
    const nextY = this.y + vy * dt;
    if (
      world.tileType(Math.floor(nextX), Math.floor(this.y)) !== "water" &&
      !world.isPositionBlocked(nextX, this.y)
    ) {
      this.x = nextX;
    }
    if (
      world.tileType(Math.floor(this.x), Math.floor(nextY)) !== "water" &&
      !world.isPositionBlocked(this.x, nextY)
    ) {
      this.y = nextY;
    }
  }
}
