import { clamp } from "../utils/math.js";

export class Player {
  constructor() {
    this.radius = 0.35;
    this.baseHealth = 100;
    this.baseHunger = 100;
    this.baseStamina = 100;
    this.maxHealth = this.baseHealth;
    this.maxHunger = this.baseHunger;
    this.maxStamina = this.baseStamina;
    this.moveSpeed = 3.1;
    this.sprintSpeed = 4.6;
    this.reset({ x: 0.5, y: 0.5 });
  }

  reset(spawn) {
    this.x = spawn.x;
    this.y = spawn.y;
    this.vx = 0;
    this.vy = 0;
    this.facingX = 0;
    this.facingY = 1;
    this.hunger = this.maxHunger;
    this.health = this.maxHealth;
    this.stamina = this.maxStamina;
    this.gatherCooldown = 0;
    this.attackCooldown = 0;
  }

  applyProgression(level) {
    const bonus = Math.max(0, level - 1);
    this.maxHealth = this.baseHealth + Math.min(50, bonus * 6);
    this.maxStamina = this.baseStamina + Math.min(60, bonus * 7);
    this.maxHunger = this.baseHunger + Math.min(40, bonus * 5);
    this.moveSpeed = 3.1 + Math.min(0.6, bonus * 0.08);
    this.sprintSpeed = 4.6 + Math.min(0.9, bonus * 0.1);
    this.health = clamp(this.health, 0, this.maxHealth);
    this.stamina = clamp(this.stamina, 0, this.maxStamina);
    this.hunger = clamp(this.hunger, 0, this.maxHunger);
  }

  consume(edible) {
    const { hunger = 0, stamina = 0, health = 0 } = edible ?? {};
    this.hunger = clamp(this.hunger + hunger, 0, this.maxHunger);
    this.stamina = clamp(this.stamina + stamina, 0, this.maxStamina);
    this.health = clamp(this.health + health, 0, this.maxHealth);
  }

  updateCooldown(dt) {
    this.gatherCooldown = Math.max(0, this.gatherCooldown - dt);
    this.attackCooldown = Math.max(0, this.attackCooldown - dt);
  }

  updateMovement(dt, input, world, structureContext, weatherType) {
    let moveX = 0;
    let moveY = 0;
    if (input.isDown("w")) moveY -= 1;
    if (input.isDown("s")) moveY += 1;
    if (input.isDown("a")) moveX -= 1;
    if (input.isDown("d")) moveX += 1;
    const length = Math.hypot(moveX, moveY);
    if (length > 0) {
      moveX /= length;
      moveY /= length;
      this.facingX = moveX;
      this.facingY = moveY;
    }

    const wantsSprint = input.isDown("shift") && this.stamina > 5;
    const weatherMod = weatherType === "storm" ? 0.88 : weatherType === "fog" ? 0.94 : 1;
    const speed = (wantsSprint ? this.sprintSpeed : this.moveSpeed) * weatherMod;
    const shelterBoost = structureContext.nearShelter ? 1.4 : 1;
    if (wantsSprint && length > 0) {
      this.stamina = clamp(this.stamina - dt * 30, 0, this.maxStamina);
    } else {
      this.stamina = clamp(this.stamina + dt * 18 * shelterBoost, 0, this.maxStamina);
    }

    this.vx = moveX * speed;
    this.vy = moveY * speed;

    const nextX = this.x + this.vx * dt;
    const nextY = this.y + this.vy * dt;

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

  updateNeeds(dt, structureContext) {
    const warmth = structureContext.nearCampfire ? 0.45 : 1;
    const canopyShade = structureContext.underCanopy ? 0.75 : 1;
    const healBoost = structureContext.nearCampfire ? 1.4 : 1;
    const stormDrain = structureContext.stormDrain ?? 1;
    this.hunger = clamp(
      this.hunger - dt * 0.6 * warmth * canopyShade * stormDrain,
      0,
      this.maxHunger
    );
    if (this.hunger <= 0) {
      this.health = clamp(this.health - dt * 0.9, 0, this.maxHealth);
    } else if (this.hunger > 0.8 * this.maxHunger) {
      this.health = clamp(this.health + dt * 0.2 * healBoost, 0, this.maxHealth);
    }
  }
}
