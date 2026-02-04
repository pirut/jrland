import { clamp } from "../utils/math.js";

export class AnimalNeeds {
  constructor(def, rng) {
    const needs = def?.needs ?? {};
    this.maxHunger = needs.maxHunger ?? 100;
    this.maxThirst = needs.maxThirst ?? 100;
    this.maxEnergy = needs.maxEnergy ?? 100;
    this.hungerDrain = needs.hungerDrain ?? 0.55;
    this.thirstDrain = needs.thirstDrain ?? 0.45;
    this.energyDrain = needs.energyDrain ?? 0.7;
    this.energyRegen = needs.energyRegen ?? 0.9;
    const hungerStart = needs.startHungerRatio ?? 0.7;
    const thirstStart = needs.startThirstRatio ?? 0.75;
    const energyStart = needs.startEnergyRatio ?? 0.6;
    const jitter = () => (rng ? (rng() - 0.5) * 0.2 : 0);
    this.hunger = this.maxHunger * clamp(hungerStart + jitter(), 0.4, 1);
    this.thirst = this.maxThirst * clamp(thirstStart + jitter(), 0.4, 1);
    this.energy = this.maxEnergy * clamp(energyStart + jitter(), 0.3, 1);
  }

  tick(
    dt,
    { moving = false, stressed = false, nocturnal = false, isNight = false, drought = false, heat = 1, cold = 1 } = {}
  ) {
    const moveMod = moving ? 1.18 : 1;
    const stressMod = stressed ? 1.25 : 1;
    const nightMod = isNight && !nocturnal ? 1.08 : 1;
    const droughtMod = drought ? 1.35 : 1;
    const heatMod = heat ?? 1;
    const coldMod = cold ?? 1;
    this.hunger = clamp(
      this.hunger - dt * this.hungerDrain * moveMod * stressMod * nightMod * coldMod,
      0,
      this.maxHunger
    );
    this.thirst = clamp(
      this.thirst - dt * this.thirstDrain * moveMod * stressMod * nightMod * droughtMod * heatMod,
      0,
      this.maxThirst
    );
    if (moving) {
      this.energy = clamp(this.energy - dt * this.energyDrain * stressMod, 0, this.maxEnergy);
    } else {
      this.energy = clamp(this.energy + dt * this.energyRegen, 0, this.maxEnergy);
    }
  }

  feed(amount) {
    this.hunger = clamp(this.hunger + amount, 0, this.maxHunger);
  }

  drink(amount) {
    this.thirst = clamp(this.thirst + amount, 0, this.maxThirst);
  }

  rest(dt, bonus = 1) {
    this.energy = clamp(this.energy + dt * this.energyRegen * 1.6 * bonus, 0, this.maxEnergy);
  }

  ratioHunger() {
    return this.hunger / this.maxHunger;
  }

  ratioThirst() {
    return this.thirst / this.maxThirst;
  }

  ratioEnergy() {
    return this.energy / this.maxEnergy;
  }
}
