import { Random } from "../core/Random.js";

export class SeasonSystem {
  constructor(seed) {
    this.reset(seed);
  }

  reset(seed) {
    this.rng = Random.mulberry32(seed ^ 0x9e3779b9);
    this.seasons = ["spring", "summer", "autumn", "winter"];
    this.index = Math.floor(this.rng() * this.seasons.length);
    this.name = this.seasons[this.index];
    this.timer = 140 + this.rng() * 140;
    this.drought = this.name === "summer" && this.rng() < 0.45;
    this.lastName = this.name;
  }

  update(dt) {
    this.timer -= dt;
    if (this.timer > 0) return null;
    this.index = (this.index + 1) % this.seasons.length;
    this.name = this.seasons[this.index];
    this.timer = 140 + this.rng() * 140;
    this.drought = this.name === "summer" && this.rng() < 0.45;
    const changed = this.name !== this.lastName;
    this.lastName = this.name;
    return changed ? this.name : null;
  }

  modifiers() {
    const isHot = this.name === "summer";
    const isCold = this.name === "winter";
    return {
      drought: this.drought,
      heat: isHot ? 1.12 : 1,
      cold: isCold ? 1.08 : 1,
    };
  }
}
