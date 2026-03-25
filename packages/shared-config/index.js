export const WORLD_ID = "main";
export const CHUNK_SIZE = { x: 16, y: 128, z: 16 };
export const REGION_CHUNKS = { x: 16, z: 16 };
export const AOI_RADIUS_CHUNKS = 6;
export const PREFETCH_RADIUS_CHUNKS = 8;
export const SIMULATION_TICK_HZ = 20;
export const REPLICATION_TICK_HZ = 10;
export const INPUT_RATE_HZ = 20;
export const WORLD_SERVER_PORT = 7355;
export const WORLD_GATEWAY_PORT = 8081;
export const NAKAMA_HTTP_PORT = 7350;
export const NAKAMA_WS_PORT = 7351;

export const BLOCK_TYPES = {
  AIR: 0,
  GRASS: 1,
  DIRT: 2,
  STONE: 3,
  WOOD: 4,
  LEAF: 5,
  GLASS: 6,
};

export const BLOCK_PALETTE = {
  [BLOCK_TYPES.AIR]: 0x000000,
  [BLOCK_TYPES.GRASS]: 0x688f44,
  [BLOCK_TYPES.DIRT]: 0x7f5f46,
  [BLOCK_TYPES.STONE]: 0x8b8f97,
  [BLOCK_TYPES.WOOD]: 0x8c6538,
  [BLOCK_TYPES.LEAF]: 0x4a6a3a,
  [BLOCK_TYPES.GLASS]: 0xbfd5d9,
};

export const HOTBAR_ITEMS = [
  { id: "grass_block", label: "Grass", blockType: BLOCK_TYPES.GRASS },
  { id: "dirt_block", label: "Dirt", blockType: BLOCK_TYPES.DIRT },
  { id: "stone_block", label: "Stone", blockType: BLOCK_TYPES.STONE },
  { id: "wood_block", label: "Wood", blockType: BLOCK_TYPES.WOOD },
  { id: "glass_block", label: "Glass", blockType: BLOCK_TYPES.GLASS },
];
