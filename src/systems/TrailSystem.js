import { clamp } from "../utils/math.js";

export class TrailSystem {
  constructor() {
    this.trails = [];
    this.lastPos = new Map();
  }

  reset() {
    this.trails = [];
    this.lastPos.clear();
  }

  record(creatures) {
    creatures.forEach((creature) => {
      const last = this.lastPos.get(creature.id) ?? { x: creature.x, y: creature.y };
      const dist = Math.hypot(creature.x - last.x, creature.y - last.y);
      const spacing = creature.def?.trailSpacing ?? 0.6;
      if (dist < spacing) return;
      const state = creature.state;
      const strength = state === "flee" || state === "hunt" || state === "chase" ? 1 : 0.6;
      this.addTrail("track", creature.x, creature.y, 12, strength, creature.type);
      if (creature.def?.diet) {
        const scentTtl = creature.def?.diet === "carnivore" ? 10 : 16;
        this.addTrail("scent", creature.x, creature.y, scentTtl, 0.5 + strength * 0.35, creature.type);
      }
      this.lastPos.set(creature.id, { x: creature.x, y: creature.y });
    });
  }

  addTrail(type, x, y, ttl, strength, sourceType) {
    this.trails.push({
      id: `${type}:${sourceType}:${x.toFixed(2)},${y.toFixed(2)}:${Date.now()}`,
      type,
      x,
      y,
      ttl,
      strength: clamp(strength, 0.2, 1),
      sourceType,
      age: 0,
    });
  }

  update(dt) {
    this.trails.forEach((trail) => {
      trail.age += dt;
    });
    this.trails = this.trails.filter((trail) => trail.age < trail.ttl);
  }

  getTrailsInView(bounds) {
    return this.trails.filter(
      (trail) =>
        trail.x >= bounds.minX &&
        trail.x <= bounds.maxX &&
        trail.y >= bounds.minY &&
        trail.y <= bounds.maxY
    );
  }

  findNearest(type, x, y, range, predicate = null) {
    let closest = null;
    let closestDist = Infinity;
    this.trails.forEach((trail) => {
      if (trail.type !== type) return;
      if (predicate && !predicate(trail)) return;
      const dist = Math.hypot(trail.x - x, trail.y - y);
      if (dist <= range && dist < closestDist) {
        closest = trail;
        closestDist = dist;
      }
    });
    return closest;
  }
}
