import { Random } from "../core/Random.js";
import { BUILDINGS } from "../config.js";

export class World {
  constructor(seed) {
    this.chunkSize = 32;
    this.chunks = new Map();
    this.structures = new Map();
    this.seed = seed;
  }

  reset(seed) {
    this.seed = seed;
    this.chunks.clear();
    this.structures.clear();
  }

  tileHeight(x, y) {
    return Random.fractalNoise(x, y, this.seed);
  }

  biomeBand(x, y) {
    const n = Random.valueNoise(x * 0.02, y * 0.02, this.seed + 4242);
    if (n < 0.33) return "prairie";
    if (n < 0.66) return "woodland";
    return "highland";
  }

  tileType(x, y) {
    const h = this.tileHeight(x, y);
    const band = this.biomeBand(x, y);
    let grassMax = 0.62;
    let dirtMax = 0.76;
    if (band === "prairie") {
      grassMax = 0.68;
      dirtMax = 0.8;
    } else if (band === "highland") {
      grassMax = 0.58;
      dirtMax = 0.7;
    }
    if (h < 0.28) return "water";
    if (h < 0.36) return "sand";
    if (h < grassMax) return "grass";
    if (h < dirtMax) return "dirt";
    return "rock";
  }

  getBiome(x, y, typeOverride) {
    const type = typeOverride ?? this.tileType(x, y);
    if (type === "water") return "water";
    if (type === "sand") return "coastal";
    return this.biomeBand(x, y);
  }

  chunkKey(cx, cy) {
    return `${cx},${cy}`;
  }

  buildChunk(cx, cy) {
    const key = this.chunkKey(cx, cy);
    if (this.chunks.has(key)) return this.chunks.get(key);
    const chunk = {
      cx,
      cy,
      entities: [],
      removed: new Set(),
      creatures: [],
      removedCreatures: new Set(),
    };
    const rng = Random.mulberry32(Random.hash2(cx, cy, this.seed));
    for (let y = 0; y < this.chunkSize; y += 1) {
      for (let x = 0; x < this.chunkSize; x += 1) {
        const tx = cx * this.chunkSize + x;
        const ty = cy * this.chunkSize + y;
        const type = this.tileType(tx, ty);
        const biome = this.getBiome(tx, ty, type);
        const roll = rng();
        const creatureRoll = rng();
        if (type === "grass" || type === "dirt") {
          let treeChance = 0.05;
          if (biome === "prairie") treeChance = 0.03;
          if (biome === "woodland") treeChance = 0.06;
          if (biome === "highland") treeChance = 0.015;
          if (biome === "coastal") treeChance = 0.02;
          const berryChance = biome === "woodland" ? 0.03 : 0.015;
          if (roll < treeChance) {
            chunk.entities.push({
              id: `${tx},${ty}`,
              type: "tree",
              x: tx + 0.5,
              y: ty + 0.5,
            });
          } else if (roll < treeChance + berryChance) {
            chunk.entities.push({
              id: `${tx},${ty}`,
              type: "berrybush",
              x: tx + 0.5,
              y: ty + 0.5,
            });
          }
          const creatureChance = biome === "woodland" ? 0.02 : biome === "highland" ? 0.018 : 0.012;
          if (creatureRoll < creatureChance) {
            const creatureType =
              biome === "highland"
                ? creatureRoll < creatureChance * 0.55
                  ? "wolf"
                  : "boar"
                : biome === "coastal"
                  ? "boar"
                  : creatureRoll < creatureChance * 0.3
                    ? "wolf"
                    : "boar";
            chunk.creatures.push({
              id: `creature:${tx},${ty}`,
              type: creatureType,
              x: tx + 0.5,
              y: ty + 0.5,
            });
          }
        } else if (type === "rock") {
          let boulderChance = 0.08;
          if (biome === "highland") boulderChance = 0.12;
          if (roll < boulderChance) {
            chunk.entities.push({
              id: `${tx},${ty}`,
              type: "boulder",
              x: tx + 0.5,
              y: ty + 0.5,
            });
          }
        }
      }
    }
    this.chunks.set(key, chunk);
    return chunk;
  }

  getChunksInView(minX, minY, maxX, maxY) {
    const size = this.chunkSize;
    const cminX = Math.floor(minX / size);
    const cminY = Math.floor(minY / size);
    const cmaxX = Math.floor(maxX / size);
    const cmaxY = Math.floor(maxY / size);
    const chunks = [];
    for (let cy = cminY; cy <= cmaxY; cy += 1) {
      for (let cx = cminX; cx <= cmaxX; cx += 1) {
        chunks.push(this.buildChunk(cx, cy));
      }
    }
    return chunks;
  }

  getCreatureSpawnsInView(minX, minY, maxX, maxY) {
    const chunks = this.getChunksInView(minX, minY, maxX, maxY);
    const spawns = [];
    chunks.forEach((chunk) => {
      chunk.creatures.forEach((spawn) => {
        if (chunk.removedCreatures.has(spawn.id)) return;
        spawns.push({ ...spawn, chunk });
      });
    });
    return spawns;
  }

  getStructureChunk(cx, cy) {
    const key = this.chunkKey(cx, cy);
    if (!this.structures.has(key)) {
      this.structures.set(key, []);
    }
    return this.structures.get(key);
  }

  addStructure(type, originX, originY, w = 1, h = 1, rotation = 0) {
    const size = this.chunkSize;
    const cx = Math.floor(originX / size);
    const cy = Math.floor(originY / size);
    const list = this.getStructureChunk(cx, cy);
    const centerX = originX + w / 2;
    const centerY = originY + h / 2;
    const def = BUILDINGS[type];
    list.push({
      id: `${type}:${originX.toFixed(2)},${originY.toFixed(2)}`,
      type,
      x: centerX,
      y: centerY,
      originX,
      originY,
      w,
      h,
      rotation,
      open: def?.toggleable ? false : undefined,
    });
  }

  getStructuresInView(minX, minY, maxX, maxY) {
    const size = this.chunkSize;
    const padding = 3;
    const cminX = Math.floor((minX - padding) / size);
    const cminY = Math.floor((minY - padding) / size);
    const cmaxX = Math.floor((maxX + padding) / size);
    const cmaxY = Math.floor((maxY + padding) / size);
    const structures = [];
    for (let cy = cminY; cy <= cmaxY; cy += 1) {
      for (let cx = cminX; cx <= cmaxX; cx += 1) {
        const key = this.chunkKey(cx, cy);
        const list = this.structures.get(key);
        if (list && list.length) structures.push(...list);
      }
    }
    return structures;
  }

  resourceAtTile(tileX, tileY) {
    const size = this.chunkSize;
    const cx = Math.floor(tileX / size);
    const cy = Math.floor(tileY / size);
    const chunk = this.buildChunk(cx, cy);
    const id = `${tileX},${tileY}`;
    return chunk.entities.some((entity) => entity.id === id && !chunk.removed.has(entity.id));
  }

  findNearestResource(x, y, range) {
    const minX = x - range;
    const maxX = x + range;
    const minY = y - range;
    const maxY = y + range;
    const chunks = this.getChunksInView(minX, minY, maxX, maxY);
    let closest = null;
    let closestDist = Infinity;
    for (const chunk of chunks) {
      for (const entity of chunk.entities) {
        if (chunk.removed.has(entity.id)) continue;
        const dx = entity.x - x;
        const dy = entity.y - y;
        const dist = Math.hypot(dx, dy);
        if (dist <= range && dist < closestDist) {
          closest = { chunk, entity, dist };
          closestDist = dist;
        }
      }
    }
    return closest;
  }

  isStructureNear(x, y, radius) {
    const structures = this.getStructuresInView(x - radius, y - radius, x + radius, y + radius);
    return structures.some((structure) => Math.hypot(structure.x - x, structure.y - y) < radius);
  }

  isStructureNearRadius(x, y, radius) {
    const structures = this.getStructuresInView(x - radius, y - radius, x + radius, y + radius);
    return structures.some((structure) => {
      const size = Math.max(structure.w ?? 1, structure.h ?? 1) * 0.5;
      return Math.hypot(structure.x - x, structure.y - y) < radius + size;
    });
  }

  hasStructureOverlap(originX, originY, w, h) {
    const minX = originX - 1;
    const minY = originY - 1;
    const maxX = originX + w + 1;
    const maxY = originY + h + 1;
    const structures = this.getStructuresInView(minX, minY, maxX, maxY);
    return structures.some((structure) => {
      const sMinX = structure.originX ?? structure.x - 0.5;
      const sMinY = structure.originY ?? structure.y - 0.5;
      const sW = structure.w ?? 1;
      const sH = structure.h ?? 1;
      return (
        originX < sMinX + sW &&
        originX + w > sMinX &&
        originY < sMinY + sH &&
        originY + h > sMinY
      );
    });
  }

  isPositionBlocked(x, y) {
    const structures = this.getStructuresInView(x - 1, y - 1, x + 1, y + 1);
    return structures.some((structure) => {
      const def = BUILDINGS[structure.type];
      if (!def?.solid) return false;
      if (structure.type === "wood_gate" && structure.open) return false;
      const minX = structure.originX ?? structure.x - 0.5;
      const minY = structure.originY ?? structure.y - 0.5;
      const w = structure.w ?? 1;
      const h = structure.h ?? 1;
      return x >= minX && x <= minX + w && y >= minY && y <= minY + h;
    });
  }

  findNearestStructure(x, y, range) {
    const minX = x - range;
    const maxX = x + range;
    const minY = y - range;
    const maxY = y + range;
    const structures = this.getStructuresInView(minX, minY, maxX, maxY);
    let closest = null;
    let closestDist = Infinity;
    structures.forEach((structure) => {
      const dx = structure.x - x;
      const dy = structure.y - y;
      const dist = Math.hypot(dx, dy);
      if (dist <= range && dist < closestDist) {
        closest = { structure, dist };
        closestDist = dist;
      }
    });
    return closest;
  }

  findSpawn() {
    for (let radius = 0; radius < 12; radius += 1) {
      for (let y = -radius; y <= radius; y += 1) {
        for (let x = -radius; x <= radius; x += 1) {
          if (this.tileType(x, y) !== "water") {
            return { x: x + 0.5, y: y + 0.5 };
          }
        }
      }
    }
    return { x: 0.5, y: 0.5 };
  }
}
