const CHUNK_SIZE_X = 16;
const CHUNK_SIZE_Z = 16;

function chunkKey(chunkX, chunkZ) {
  return `${chunkX}:${chunkZ}`;
}

function positiveMod(value, base) {
  const mod = value % base;
  return mod < 0 ? mod + base : mod;
}

function floorDiv(value, base) {
  return value >= 0 ? Math.floor(value / base) : -Math.ceil(Math.abs(value) / base);
}

export class ChunkStore {
  constructor() {
    this.map = new Map();
  }

  clear() {
    this.map.clear();
  }

  applyChunkSnapshot(snapshot) {
    this.map.set(chunkKey(snapshot.chunkX, snapshot.chunkZ), {
      chunkX: snapshot.chunkX,
      chunkZ: snapshot.chunkZ,
      version: snapshot.version,
      sizeX: snapshot.sizeX,
      sizeY: snapshot.sizeY,
      sizeZ: snapshot.sizeZ,
      blocks: Uint32Array.from(snapshot.blocks),
    });
  }

  applyChunkDelta(delta) {
    const key = chunkKey(delta.chunkX, delta.chunkZ);
    const chunk = this.map.get(key);
    if (!chunk) {
      return;
    }
    for (const change of delta.changes) {
      chunk.blocks[change.index] = change.blockType;
    }
    chunk.version = delta.version;
  }

  getChunks() {
    return Array.from(this.map.values());
  }

  getChunk(chunkX, chunkZ) {
    return this.map.get(chunkKey(chunkX, chunkZ)) ?? null;
  }

  getBlock(worldX, worldY, worldZ) {
    const chunkX = floorDiv(worldX, CHUNK_SIZE_X);
    const chunkZ = floorDiv(worldZ, CHUNK_SIZE_Z);
    const chunk = this.getChunk(chunkX, chunkZ);
    if (!chunk || worldY < 0 || worldY >= chunk.sizeY) {
      return 0;
    }
    const localX = positiveMod(worldX, CHUNK_SIZE_X);
    const localZ = positiveMod(worldZ, CHUNK_SIZE_Z);
    const index = worldY * chunk.sizeX * chunk.sizeZ + localZ * chunk.sizeX + localX;
    return chunk.blocks[index];
  }

  setBlock(worldX, worldY, worldZ, blockType) {
    const chunkX = floorDiv(worldX, CHUNK_SIZE_X);
    const chunkZ = floorDiv(worldZ, CHUNK_SIZE_Z);
    const chunk = this.getChunk(chunkX, chunkZ);
    if (!chunk || worldY < 0 || worldY >= chunk.sizeY) {
      return null;
    }
    const localX = positiveMod(worldX, CHUNK_SIZE_X);
    const localZ = positiveMod(worldZ, CHUNK_SIZE_Z);
    const index = worldY * chunk.sizeX * chunk.sizeZ + localZ * chunk.sizeX + localX;
    if (chunk.blocks[index] === blockType) {
      return null;
    }
    chunk.blocks[index] = blockType;
    chunk.version += 1;
    return {
      chunkX,
      chunkZ,
      index,
      blockType,
      version: chunk.version,
    };
  }

  surfaceHeightAt(worldX, worldZ) {
    const x = Math.floor(worldX);
    const z = Math.floor(worldZ);
    for (let y = 127; y >= 0; y -= 1) {
      if (this.getBlock(x, y, z) !== 0) {
        return y;
      }
    }
    return 1;
  }
}
