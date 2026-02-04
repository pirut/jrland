import { clamp } from "../utils/math.js";

export class CreatureMind {
  constructor(creature) {
    this.creature = creature;
    this.goal = null;
    this.goalTimer = 0;
    this.lastThreat = null;
  }

  update(dt, context) {
    const { player, world, creatures, trails, carcasses, isNight, season } = context;
    const creature = this.creature;
    const def = creature.def ?? {};
    const needs = creature.needs;
    this.goalTimer = Math.max(0, this.goalTimer - dt);

    const hungerRatio = needs.ratioHunger();
    const thirstRatio = needs.ratioThirst();
    const energyRatio = needs.ratioEnergy();
    const packInfo = this.getPackInfo(creatures, def.packRadius ?? 3.5);

    if (def.defendDen && creature.den) {
      const denDist = Math.hypot(player.x - creature.den.x, player.y - creature.den.y);
      if (denDist < (def.denDefenseRange ?? 4) && packInfo.confidence > 0.35) {
        return { state: "defend", target: player, speed: 1.1, attackPlayer: true };
      }
    }

    const threat = this.findThreat(player, creatures, def, packInfo.bravery, season);
    if (threat) {
      return { state: "flee", target: this.getFleeTarget(threat), speed: 1.2, stressed: true };
    }

    if (def.diet === "herbivore") {
      const avoidRange = def.avoidCarcassRange ?? 3;
      const carcass = carcasses?.findNearest?.(creature.x, creature.y, avoidRange);
      if (carcass) {
        return { state: "flee", target: this.getFleeTarget(carcass), speed: 1.05, stressed: true };
      }
    }

    const criticalThirst = thirstRatio < (def.criticalThirst ?? 0.2);
    const criticalHunger = hungerRatio < (def.criticalHunger ?? 0.25);
    const needsRest = energyRatio < (def.restThreshold ?? 0.25);
    const drought = season?.drought ?? false;

    if (drought && !def.nocturnal && !isNight && hungerRatio > 0.45 && thirstRatio > 0.4) {
      const homeTarget = creature.den ?? { x: creature.homeX, y: creature.homeY };
      const homeDist = Math.hypot(creature.x - homeTarget.x, creature.y - homeTarget.y);
      if (homeDist > (def.homeRange ?? 5)) {
        return { state: "return", target: { x: homeTarget.x, y: homeTarget.y }, speed: 0.65 };
      }
      return { state: "rest", target: null, speed: 0 };
    }

    if (criticalThirst) {
      const waterTarget = world.findNearestWaterEdge(creature.x, creature.y, def.waterSearchRange ?? 7);
      if (waterTarget) {
        return { state: "drink", target: waterTarget, speed: 0.9 };
      }
    }

    if (criticalHunger) {
      const foodIntent = this.findFoodIntent(world, creatures, trails, carcasses, def, hungerRatio);
      if (foodIntent) return foodIntent;
    }

    if (needsRest || (!def.nocturnal && isNight && energyRatio < 0.6)) {
      const homeTarget = creature.den ?? { x: creature.homeX, y: creature.homeY };
      const homeDist = Math.hypot(creature.x - homeTarget.x, creature.y - homeTarget.y);
      if (homeDist > (def.homeRange ?? 5)) {
        return { state: "return", target: { x: homeTarget.x, y: homeTarget.y }, speed: 0.8 };
      }
      return { state: "rest", target: null, speed: 0 };
    }

    if (hungerRatio < (def.hungerThreshold ?? 0.5)) {
      const foodIntent = this.findFoodIntent(world, creatures, trails, carcasses, def, hungerRatio);
      if (foodIntent) return foodIntent;
    }

    if (thirstRatio < (def.thirstThreshold ?? 0.45)) {
      const waterTarget = world.findNearestWaterEdge(creature.x, creature.y, def.waterSearchRange ?? 7);
      if (waterTarget) {
        return { state: "drink", target: waterTarget, speed: 0.9 };
      }
    }

    if (def.diet === "carnivore") {
      const prey = this.findPrey(creatures, def, def.huntRange ?? 7);
      if (prey && this.shouldHunt(prey, hungerRatio, packInfo.confidence)) {
        return { state: "hunt", target: prey, speed: 1.1, attackTarget: prey };
      }
      const scent = trails?.findNearest(
        "scent",
        creature.x,
        creature.y,
        def.scentRange ?? 6.5,
        (trail) => (def.prey ?? ["boar"]).includes(trail.sourceType)
      );
      if (scent && hungerRatio < 0.9) {
        return { state: "track", target: scent, speed: 0.8 };
      }
    }

    const grazeChance = def.diet === "herbivore" ? 0.25 : 0;
    if (creature.rng() < grazeChance && hungerRatio < 0.85) {
      return { state: "graze", target: null, speed: 0 };
    }

    return { state: "wander", target: null, speed: 0.45 };
  }

  getPackInfo(creatures, radius) {
    const creature = this.creature;
    let count = 0;
    creatures.forEach((other) => {
      if (other === creature || other.type !== creature.type) return;
      if (creature.packId && other.packId && creature.packId !== other.packId) return;
      const dist = Math.hypot(other.x - creature.x, other.y - creature.y);
      if (dist <= radius) count += 1;
    });
    const confidence = clamp(count / 3, 0, 1);
    return { count, confidence, bravery: 0.35 + confidence * 0.45 };
  }

  findThreat(player, creatures, def, bravery, season) {
    const creature = this.creature;
    let closest = null;
    let closestDist = Infinity;
    if (def.fearPlayer !== false) {
      const pdist = Math.hypot(player.x - creature.x, player.y - creature.y);
      const droughtMod = season?.drought ? 0.85 : 1;
      const fearRange = (def.fleeRange ?? 4.5) * (1 - bravery * 0.35) * droughtMod;
      if (pdist < fearRange) {
        closest = player;
        closestDist = pdist;
      }
    }
    if (def.predators && def.predators.length) {
      creatures.forEach((other) => {
        if (other === creature) return;
        if (!def.predators.includes(other.type)) return;
        const dist = Math.hypot(other.x - creature.x, other.y - creature.y);
        const droughtMod = season?.drought ? 0.85 : 1;
        const fearRange = (def.fleeRange ?? 4.5) * (1 - bravery * 0.35) * droughtMod;
        if (dist < fearRange && dist < closestDist) {
          closest = other;
          closestDist = dist;
        }
      });
    }
    return closest;
  }

  getFleeTarget(threat) {
    const creature = this.creature;
    const dx = creature.x - threat.x;
    const dy = creature.y - threat.y;
    const dist = Math.hypot(dx, dy) || 1;
    return { x: creature.x + (dx / dist) * 2.2, y: creature.y + (dy / dist) * 2.2 };
  }

  findFoodIntent(world, creatures, trails, carcasses, def, hungerRatio) {
    const creature = this.creature;
    if (def.diet === "carnivore") {
      const carcass = carcasses?.findNearest?.(creature.x, creature.y, def.carcassSearchRange ?? 5);
      if (carcass && hungerRatio < 0.9) {
        return { state: "feed", target: carcass, speed: 0.9, carcassTarget: carcass };
      }
      const prey = this.findPrey(creatures, def, def.huntRange ?? 7);
      if (prey) {
        return { state: "hunt", target: prey, speed: 1.1, attackTarget: prey };
      }
      const scent = trails?.findNearest(
        "scent",
        creature.x,
        creature.y,
        def.scentRange ?? 6.5,
        (trail) => (def.prey ?? ["boar"]).includes(trail.sourceType)
      );
      if (scent) {
        return { state: "track", target: scent, speed: 0.8 };
      }
      return null;
    }
    const range = def.foodSearchRange ?? 6;
    const target = world.findNearestResource(
      creature.x,
      creature.y,
      range,
      (entity) => entity.type === "berrybush"
    );
    if (target) {
      return {
        state: "eat",
        target: { ...target.entity, x: target.entity.x, y: target.entity.y, chunk: target.chunk },
        speed: 0.8,
      };
    }
    if (hungerRatio < 0.75) {
      return { state: "graze", target: null, speed: 0 };
    }
    return null;
  }

  findPrey(creatures, def, range) {
    const creature = this.creature;
    const preyTypes = def.prey ?? ["boar"];
    let closest = null;
    let closestDist = Infinity;
    creatures.forEach((other) => {
      if (other === creature) return;
      if (!preyTypes.includes(other.type)) return;
      const dist = Math.hypot(other.x - creature.x, other.y - creature.y);
      if (dist <= range && dist < closestDist) {
        closest = other;
        closestDist = dist;
      }
    });
    return closest;
  }

  shouldHunt(prey, hungerRatio, packConfidence) {
    if (!prey) return false;
    const base = hungerRatio < 0.7 ? 0.8 : 0.4;
    const packBonus = packConfidence * 0.45;
    return this.creature.rng() < base + packBonus;
  }
}
