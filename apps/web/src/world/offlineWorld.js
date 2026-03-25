import { BLOCK_TYPES, CHUNK_SIZE, HOTBAR_ITEMS } from "@jrland/shared-config";

const OFFLINE_WORLD_RADIUS = 2;
const OFFLINE_WORLD_HEIGHT = 40;
const OFFLINE_WORLD_ID = "practice-range";
const OFFLINE_SELF_ID = "offline-self";
const SPAWN_POINT = { x: 2, z: 2 };

function spawnDistance(x, z) {
  return Math.hypot(x - SPAWN_POINT.x, z - SPAWN_POINT.z);
}

function fract(value) {
  return value - Math.floor(value);
}

function hash2d(x, z, seed) {
  return fract(Math.sin(x * 127.1 + z * 311.7 + seed * 74.7) * 43758.5453123);
}

function terrainHeight(x, z, seed) {
  const rolling = Math.sin((x + seed * 3.1) * 0.12) * 2.4 + Math.cos((z - seed * 2.3) * 0.1) * 1.9;
  const noise = (hash2d(x * 0.7, z * 0.7, seed) - 0.5) * 3.6;
  const rawHeight = 9 + rolling + noise;
  const clearBlend = Math.max(0, 1 - spawnDistance(x, z) / 12);
  const flattened = rawHeight * (1 - clearBlend) + 8.5 * clearBlend;
  return Math.max(5, Math.min(18, Math.round(flattened)));
}

function hasTreeAt(x, z, seed) {
  if (spawnDistance(x, z) < 9) {
    return false;
  }
  const height = terrainHeight(x, z, seed);
  if (height < 7 || height > 14) {
    return false;
  }
  return hash2d(x, z, seed * 1.31) > 0.988;
}

function crystalHeight(x, z, seed) {
  if (spawnDistance(x, z) < 8) {
    return 0;
  }
  const chance = hash2d(x + 17, z - 29, seed * 2.11);
  if (chance <= 0.996) {
    return 0;
  }
  return 1 + Math.floor(hash2d(x - 11, z + 7, seed * 1.73) * 3);
}

function blockAt(worldX, worldY, worldZ, seed) {
  const surface = terrainHeight(worldX, worldZ, seed);
  if (worldY === 0) {
    return BLOCK_TYPES.STONE;
  }
  if (worldY < surface - 3) {
    return BLOCK_TYPES.STONE;
  }
  if (worldY < surface) {
    return BLOCK_TYPES.DIRT;
  }
  if (worldY === surface) {
    if (spawnDistance(worldX, worldZ) < 5) {
      return hash2d(worldX - 4, worldZ + 6, seed) > 0.34 ? BLOCK_TYPES.STONE : BLOCK_TYPES.DIRT;
    }
    return surface >= 14 ? BLOCK_TYPES.STONE : BLOCK_TYPES.GRASS;
  }

  const spireHeight = crystalHeight(worldX, worldZ, seed);
  if (spireHeight > 0 && worldY <= surface + spireHeight) {
    return BLOCK_TYPES.GLASS;
  }

  for (let dz = -2; dz <= 2; dz += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      const anchorX = worldX - dx;
      const anchorZ = worldZ - dz;
      if (!hasTreeAt(anchorX, anchorZ, seed)) {
        continue;
      }
      const treeBase = terrainHeight(anchorX, anchorZ, seed);
      const trunkHeight = 3 + Math.floor(hash2d(anchorX + 5, anchorZ - 7, seed) * 2);
      const canopyBase = treeBase + trunkHeight - 1;

      if (dx === 0 && dz === 0 && worldY > treeBase && worldY <= treeBase + trunkHeight) {
        return BLOCK_TYPES.WOOD;
      }

      if (worldY < canopyBase || worldY > canopyBase + 2) {
        continue;
      }

      const spread = Math.abs(dx) + Math.abs(dz);
      if ((worldY === canopyBase + 2 && spread <= 1) || (worldY <= canopyBase + 1 && spread <= 3)) {
        return BLOCK_TYPES.LEAF;
      }
    }
  }

  return BLOCK_TYPES.AIR;
}

function makeChunkSnapshot(chunkX, chunkZ, seed) {
  const blocks = new Uint32Array(CHUNK_SIZE.x * OFFLINE_WORLD_HEIGHT * CHUNK_SIZE.z);
  for (let y = 0; y < OFFLINE_WORLD_HEIGHT; y += 1) {
    for (let z = 0; z < CHUNK_SIZE.z; z += 1) {
      for (let x = 0; x < CHUNK_SIZE.x; x += 1) {
        const worldX = chunkX * CHUNK_SIZE.x + x;
        const worldZ = chunkZ * CHUNK_SIZE.z + z;
        const index = y * CHUNK_SIZE.x * CHUNK_SIZE.z + z * CHUNK_SIZE.x + x;
        blocks[index] = blockAt(worldX, y, worldZ, seed);
      }
    }
  }
  return {
    chunkX,
    chunkZ,
    version: 1,
    sizeX: CHUNK_SIZE.x,
    sizeY: OFFLINE_WORLD_HEIGHT,
    sizeZ: CHUNK_SIZE.z,
    blocks,
  };
}

function makeBot(entityId, anchorX, anchorZ, radius, speed, phase) {
  return {
    entityId,
    kind: 1,
    anchor: { x: anchorX, z: anchorZ },
    radius,
    speed,
    phase,
  };
}

function makeBotEntity(bot, elapsedSeconds, sampleHeight) {
  const angle = elapsedSeconds * bot.speed + bot.phase;
  const x = bot.anchor.x + Math.cos(angle) * bot.radius;
  const z = bot.anchor.z + Math.sin(angle) * bot.radius * 0.72;
  const vx = -Math.sin(angle) * bot.radius * bot.speed;
  const vz = Math.cos(angle) * bot.radius * 0.72 * bot.speed;
  return {
    entityId: bot.entityId,
    kind: bot.kind,
    position: {
      x,
      y: sampleHeight(x, z) + 1,
      z,
    },
    yaw: Math.atan2(vx, vz),
  };
}

function sampleTerrainHeight(x, z, seed) {
  return terrainHeight(Math.floor(x), Math.floor(z), seed);
}

function initialInventory() {
  return HOTBAR_ITEMS.map((item, index) => ({
    blockType: item.blockType,
    count: index === HOTBAR_ITEMS.length - 1 ? 20 : 36,
  }));
}

export function createOfflineWorld(seed = 7) {
  const chunks = [];
  for (let chunkZ = -OFFLINE_WORLD_RADIUS; chunkZ <= OFFLINE_WORLD_RADIUS; chunkZ += 1) {
    for (let chunkX = -OFFLINE_WORLD_RADIUS; chunkX <= OFFLINE_WORLD_RADIUS; chunkX += 1) {
      chunks.push(makeChunkSnapshot(chunkX, chunkZ, seed));
    }
  }

  const bots = [
    makeBot("scout-1", -12, -6, 4.5, 0.7, 0.4),
    makeBot("scout-2", 14, 10, 5.5, 0.55, 1.1),
    makeBot("scout-3", -4, 16, 3.8, 0.8, 2.6),
  ];

  const sampleHeight = (x, z) => sampleTerrainHeight(x, z, seed);

  return {
    mode: "offline",
    worldId: OFFLINE_WORLD_ID,
    regionId: "sandbox-0-0",
    endpoint: "offline://practice-range",
    selfId: OFFLINE_SELF_ID,
    seed,
    chunks,
    inventory: initialInventory(),
    bots,
    entities: [
      {
        entityId: OFFLINE_SELF_ID,
        kind: 1,
        position: {
          x: SPAWN_POINT.x,
          y: sampleHeight(SPAWN_POINT.x, SPAWN_POINT.z) + 1,
          z: SPAWN_POINT.z,
        },
        yaw: 0,
      },
      ...bots.map((bot) => makeBotEntity(bot, 0, sampleHeight)),
    ],
    message: "Practice range loaded. Move with WASD or arrows, sprint with Shift, mine with left click, place with right click.",
  };
}

export function advanceOfflineBots(bots, elapsedSeconds, sampleHeight) {
  return bots.map((bot) => makeBotEntity(bot, elapsedSeconds, sampleHeight));
}

export function blockLabelForType(blockType) {
  const hotbarItem = HOTBAR_ITEMS.find((item) => item.blockType === blockType);
  if (hotbarItem) {
    return hotbarItem.label;
  }
  switch (blockType) {
    case BLOCK_TYPES.LEAF:
      return "Leaf";
    case BLOCK_TYPES.AIR:
      return "Air";
    default:
      return `Block ${blockType}`;
  }
}
