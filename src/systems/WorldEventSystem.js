import { Random } from "../core/Random.js";

export class WorldEventSystem {
  constructor() {
    this.reset();
  }

  reset() {
    this.activeEvent = null;
    this.timer = 0;
    this.cooldown = 0;
    this.lastNight = false;
  }

  update(game, dt) {
    this.cooldown = Math.max(0, this.cooldown - dt);
    if (this.timer > 0) {
      this.timer = Math.max(0, this.timer - dt);
      if (this.timer <= 0) {
        this.activeEvent = null;
      }
    }
    const isNight = game.isNightTime();
    if (isNight && !this.lastNight) {
      this.startNightEvent(game);
    }
    if (!isNight && this.lastNight) {
      this.activeEvent = null;
      this.timer = 0;
    }
    this.lastNight = isNight;
  }

  startNightEvent(game) {
    if (this.cooldown > 0) return;
    const event = "night-hunt";
    const spawnCount =
      2 + (Random.hash2(Math.floor(game.player.x * 10), Math.floor(game.player.y * 10), game.seed) % 2);
    const biome = game.world.getBiome(Math.floor(game.player.x), Math.floor(game.player.y));
    const type = biome === "highland" || biome === "woodland" ? "wolf" : "boar";
    let spawned = 0;
    const baseAngle =
      (Random.hash2(Math.floor(game.player.x * 10), Math.floor(game.player.y * 10), game.seed + 99) /
        4294967295) *
      Math.PI *
      2;
    for (let i = 0; i < spawnCount; i += 1) {
      const angle = baseAngle + (Math.PI * 2 * i) / spawnCount;
      const radius = 3.5 + (i % 2) * 1.2;
      const sx = game.player.x + Math.cos(angle) * radius;
      const sy = game.player.y + Math.sin(angle) * radius;
      if (game.world.tileType(Math.floor(sx), Math.floor(sy)) === "water") continue;
      if (game.world.isPositionBlocked(sx, sy)) continue;
      game.creatures.spawnCreature(type, sx, sy, game.seed + 400 + i);
      spawned += 1;
    }
    if (spawned > 0) {
      this.activeEvent = { id: event, label: "Night Hunt", detail: `${type}s nearby` };
      this.timer = 30;
      this.cooldown = 80;
      game.notifications.push("Night Hunt begins");
    }
  }
}
