import { CREATURES, ITEMS, PROGRESSION } from "../config.js";
import { Creature } from "../entities/Creature.js";
import { Random } from "../core/Random.js";

export class CreatureSystem {
  constructor(world) {
    this.world = world;
    this.creatures = new Map();
  }

  reset() {
    this.creatures.clear();
  }

  getActiveCreatures() {
    return Array.from(this.creatures.values());
  }

  ensureCreaturesInView(game, bounds) {
    const spawns = this.world.getCreatureSpawnsInView(bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
    spawns.forEach((spawn) => {
      if (this.creatures.has(spawn.id)) return;
      const seed = Random.hash2(Math.floor(spawn.x * 10), Math.floor(spawn.y * 10), game.seed);
      const creature = new Creature({
        id: spawn.id,
        type: spawn.type,
        x: spawn.x,
        y: spawn.y,
        seed,
      });
      creature.spawnChunk = spawn.chunk;
      this.creatures.set(spawn.id, creature);
    });
  }

  update(game, dt, bounds) {
    this.ensureCreaturesInView(game, bounds);
    const toRemove = [];
    this.creatures.forEach((creature, id) => {
      const attacked = creature.update(
        dt,
        game.player,
        game.world,
        game.weather.type,
        game.isNightTime(),
        (amount) => game.applyDamage(amount)
      );
      if (attacked) {
        game.notifications.push(`${creature.type} hit`);
      }
      if (creature.health <= 0) {
        toRemove.push(id);
        this.handleDeath(game, creature);
      }
    });
    toRemove.forEach((id) => this.creatures.delete(id));
  }

  spawnCreature(type, x, y, seed) {
    const id = `event:${type}:${x.toFixed(2)},${y.toFixed(2)}:${seed}`;
    if (this.creatures.has(id)) return;
    const creature = new Creature({ id, type, x, y, seed });
    creature.spawnChunk = null;
    this.creatures.set(id, creature);
  }

  findNearestInRange(player, range = 1.1) {
    let closest = null;
    let closestDist = Infinity;
    this.creatures.forEach((creature) => {
      const dist = Math.hypot(creature.x - player.x, creature.y - player.y);
      if (dist <= range && dist < closestDist) {
        closest = creature;
        closestDist = dist;
      }
    });
    return closest;
  }

  findNearestAt(x, y, range = 0.8) {
    let closest = null;
    let closestDist = Infinity;
    this.creatures.forEach((creature) => {
      const dist = Math.hypot(creature.x - x, creature.y - y);
      if (dist <= range && dist < closestDist) {
        closest = creature;
        closestDist = dist;
      }
    });
    return closest;
  }

  attack(game, weapon, target = null) {
    const chosen = target ?? this.findNearestInRange(game.player, 1.1);
    if (!chosen) return false;
    const dx = chosen.x - game.player.x;
    const dy = chosen.y - game.player.y;
    const dist = Math.hypot(dx, dy) || 1;
    const dot = (dx / dist) * (game.player.facingX || 0) + (dy / dist) * (game.player.facingY || 1);
    if (dot < -0.15) return false;
    const damage = weapon === "reinforced_spear" ? 20 : weapon === "stone_spear" ? 14 : 8;
    chosen.takeDamage(damage);
    game.notifications.push("Hit!");
    return true;
  }

  handleDeath(game, creature) {
    const def = CREATURES[creature.type];
    if (!def) return;
    if (creature.spawnChunk) {
      creature.spawnChunk.removedCreatures.add(creature.id);
    }
    game.awardXp(PROGRESSION.xp.combat);
    game.notifications.push(`${creature.type} defeated`);
    def.drops.forEach((drop) => {
      const count =
        drop.min === drop.max
          ? drop.min
          : Math.floor(Random.mulberry32(Random.hash2(creature.x, creature.y, game.seed + 42))() * (drop.max - drop.min + 1)) +
            drop.min;
      if (count <= 0) return;
      const maxStack = ITEMS[drop.id]?.maxStack ?? 32;
      if (game.inventory.canAdd(drop.id, count, maxStack)) {
        game.inventory.addItem(drop.id, count, maxStack);
        game.notifications.push(`Looted ${drop.id} x${count}`);
        game.quests.onGather(drop.id, count);
      }
    });
    game.quests.onDefeat(creature.type);
    game.resolveQuestCompletions();
  }
}
