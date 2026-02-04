import { CREATURES } from "../config.js";
import { clamp } from "../utils/math.js";
import { Random } from "../core/Random.js";

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
  }

  get def() {
    return CREATURES[this.type];
  }

  takeDamage(amount) {
    this.health = clamp(this.health - amount, 0, this.maxHealth);
    this.hitFlash = 0.2;
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

  update(dt, player, world, weatherType) {
    this.attackCooldown = Math.max(0, this.attackCooldown - dt);
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.hypot(dx, dy);
    const inAggro = dist < this.aggroRange;
    const speedMod = weatherType === "storm" ? 0.85 : 1;

    if (inAggro) {
      this.state = "chase";
      if (dist > 0.05) {
        const nx = dx / dist;
        const ny = dy / dist;
        this.tryMove(nx * this.speed * speedMod, ny * this.speed * speedMod, dt, world);
      }
    } else {
      this.state = "wander";
      this.updateWander(dt);
      this.tryMove(this.wanderDir.x * this.speed * 0.4, this.wanderDir.y * this.speed * 0.4, dt, world);
    }

    let attacked = false;
    if (dist < this.attackRange && this.attackCooldown <= 0) {
      player.health = clamp(player.health - this.damage, 0, player.maxHealth);
      this.attackCooldown = 1.4;
      attacked = true;
    }
    return attacked;
  }

  tryMove(vx, vy, dt, world) {
    const nextX = this.x + vx * dt;
    const nextY = this.y + vy * dt;
    if (world.tileType(Math.floor(nextX), Math.floor(this.y)) !== "water") {
      this.x = nextX;
    }
    if (world.tileType(Math.floor(this.x), Math.floor(nextY)) !== "water") {
      this.y = nextY;
    }
  }
}
