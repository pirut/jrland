import { PROGRESSION } from "../config.js";

export class Progression {
  constructor() {
    this.reset();
  }

  reset() {
    this.level = 1;
    this.xp = 0;
    this.xpToNext = this.getXpForLevel(this.level);
  }

  getXpForLevel(level) {
    return Math.round(PROGRESSION.baseXpToLevel * Math.pow(PROGRESSION.xpGrowth, level - 1));
  }

  addXp(amount) {
    if (!Number.isFinite(amount) || amount <= 0) return false;
    this.xp += amount;
    let leveled = false;
    while (this.xp >= this.xpToNext) {
      this.xp -= this.xpToNext;
      this.level += 1;
      this.xpToNext = this.getXpForLevel(this.level);
      leveled = true;
    }
    return leveled;
  }

  progressRatio() {
    if (this.xpToNext <= 0) return 0;
    return Math.min(1, Math.max(0, this.xp / this.xpToNext));
  }
}
