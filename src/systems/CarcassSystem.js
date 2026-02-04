export class CarcassSystem {
  constructor() {
    this.carcasses = [];
  }

  reset() {
    this.carcasses = [];
  }

  addCarcass({ x, y, sourceType, nutrition = 40, ttl = 90 }) {
    this.carcasses.push({
      id: `carcass:${sourceType}:${x.toFixed(2)},${y.toFixed(2)}:${Date.now()}`,
      x,
      y,
      sourceType,
      nutrition,
      maxNutrition: nutrition,
      ttl,
      age: 0,
    });
  }

  update(dt) {
    this.carcasses.forEach((carcass) => {
      carcass.age += dt;
      carcass.nutrition = Math.max(0, carcass.nutrition - dt * 0.2);
    });
    this.carcasses = this.carcasses.filter((carcass) => carcass.age < carcass.ttl && carcass.nutrition > 0.1);
  }

  getInView(bounds) {
    return this.carcasses.filter(
      (carcass) =>
        carcass.x >= bounds.minX &&
        carcass.x <= bounds.maxX &&
        carcass.y >= bounds.minY &&
        carcass.y <= bounds.maxY
    );
  }

  findNearest(x, y, range, predicate = null) {
    let closest = null;
    let closestDist = Infinity;
    this.carcasses.forEach((carcass) => {
      if (predicate && !predicate(carcass)) return;
      const dist = Math.hypot(carcass.x - x, carcass.y - y);
      if (dist <= range && dist < closestDist) {
        closest = carcass;
        closestDist = dist;
      }
    });
    return closest;
  }

  consume(carcass, amount) {
    if (!carcass) return 0;
    const consumed = Math.min(amount, carcass.nutrition);
    carcass.nutrition -= consumed;
    return consumed;
  }
}
