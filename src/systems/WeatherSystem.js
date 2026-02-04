import { Random } from "../core/Random.js";

export class WeatherSystem {
  constructor(seed) {
    this.reset(seed);
  }

  reset(seed) {
    this.type = "clear";
    this.timer = 90 + Math.random() * 90;
    this.rng = Random.mulberry32(seed ^ 0x5f3759df);
    this.fxTime = 0;
  }

  update(dt) {
    this.timer -= dt;
    this.fxTime += dt;
    if (this.timer > 0) return;
    const roll = this.rng();
    let nextType = "clear";
    if (this.type === "clear") {
      nextType =
        roll < 0.18 ? "rain" : roll < 0.4 ? "overcast" : roll < 0.58 ? "fog" : roll < 0.68 ? "storm" : "clear";
    } else if (this.type === "overcast") {
      nextType = roll < 0.3 ? "rain" : roll < 0.55 ? "fog" : roll < 0.7 ? "storm" : "clear";
    } else if (this.type === "rain") {
      nextType = roll < 0.45 ? "overcast" : roll < 0.7 ? "storm" : "clear";
    } else if (this.type === "fog") {
      nextType = roll < 0.35 ? "overcast" : roll < 0.6 ? "clear" : "rain";
    } else if (this.type === "storm") {
      nextType = roll < 0.4 ? "rain" : roll < 0.7 ? "overcast" : "clear";
    }
    this.type = nextType;
    this.timer = 70 + this.rng() * 160;
  }
}
