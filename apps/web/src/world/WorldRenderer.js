import * as THREE from "three";
import { BLOCK_PALETTE } from "@jrland/shared-config";

const BLOCK_AIR = 0;

function chunkKey(chunkX, chunkZ) {
  return `${chunkX}:${chunkZ}`;
}

function makeSkyTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#1b2231");
  gradient.addColorStop(0.45, "#5e7588");
  gradient.addColorStop(0.8, "#d0b48c");
  gradient.addColorStop(1, "#f0e3c8");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export class WorldRenderer {
  constructor(container, chunkStore) {
    this.container = container;
    this.chunkStore = chunkStore;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x5d6f82);
    this.scene.fog = new THREE.Fog(0xc8b491, 42, 150);

    this.camera = new THREE.PerspectiveCamera(58, 1, 0.1, 400);
    this.camera.position.set(18, 20, 18);
    this.cameraTarget = new THREE.Vector3(0, 0, 0);
    this.cameraOffset = new THREE.Vector3(14.5, 17.5, 14.5);
    this.targetVector = new THREE.Vector3();
    this.cameraVector = new THREE.Vector3();
    this.motionVector = new THREE.Vector3();
    this.tmpNormal = new THREE.Vector3();

    this.terrainGroup = new THREE.Group();
    this.scene.add(this.terrainGroup);
    this.terrainChunks = new Map();

    this.entityGroup = new THREE.Group();
    this.scene.add(this.entityGroup);
    this.entityMeshes = new Map();

    this.blockGeometry = new THREE.BoxGeometry(1, 1, 1);
    this.blockMaterials = new Map();
    this.instanceMatrix = new THREE.Matrix4();

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.skyDome = new THREE.Mesh(
      new THREE.SphereGeometry(220, 24, 20),
      new THREE.MeshBasicMaterial({
        map: makeSkyTexture(),
        side: THREE.BackSide,
        depthWrite: false,
      })
    );
    this.scene.add(this.skyDome);

    const hemi = new THREE.HemisphereLight(0xf5dfbc, 0x3d3428, 1.1);
    this.scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xffe0ad, 1.55);
    sun.position.set(26, 34, 14);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1536, 1536);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 140;
    sun.shadow.camera.left = -40;
    sun.shadow.camera.right = 40;
    sun.shadow.camera.top = 40;
    sun.shadow.camera.bottom = -40;
    this.scene.add(sun);

    const rim = new THREE.DirectionalLight(0x91aeca, 0.35);
    rim.position.set(-18, 16, -22);
    this.scene.add(rim);

    const grid = new THREE.GridHelper(256, 64, 0x76654d, 0x9a845f);
    grid.position.y = 0.01;
    grid.material.opacity = 0.16;
    grid.material.transparent = true;
    this.scene.add(grid);

    this.selectionBox = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.04, 1.04, 1.04)),
      new THREE.LineBasicMaterial({ color: 0xf7d06d, transparent: true, opacity: 0.95 })
    );
    this.selectionBox.visible = false;
    this.scene.add(this.selectionBox);

    this.placementBox = new THREE.Mesh(
      new THREE.BoxGeometry(1.02, 1.02, 1.02),
      new THREE.MeshBasicMaterial({
        color: 0x98d27c,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
      })
    );
    this.placementBox.visible = false;
    this.scene.add(this.placementBox);

    this.placementEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.06, 1.06, 1.06)),
      new THREE.LineBasicMaterial({ color: 0x98d27c, transparent: true, opacity: 0.95 })
    );
    this.placementEdges.visible = false;
    this.scene.add(this.placementEdges);

    window.addEventListener("resize", () => this.resize());
    this.resize();
  }

  getMaterial(blockType) {
    if (!this.blockMaterials.has(blockType)) {
      this.blockMaterials.set(
        blockType,
        new THREE.MeshStandardMaterial({
          color: BLOCK_PALETTE[blockType] ?? 0xffffff,
          flatShading: true,
          roughness: 0.9,
          metalness: blockType === 6 ? 0.16 : 0.04,
          transparent: blockType === 6,
          opacity: blockType === 6 ? 0.78 : 1,
        })
      );
    }
    return this.blockMaterials.get(blockType);
  }

  resize() {
    const { clientWidth, clientHeight } = this.container;
    const safeWidth = Math.max(clientWidth, 1);
    const safeHeight = Math.max(clientHeight, 1);
    this.camera.aspect = safeWidth / safeHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(safeWidth, safeHeight);
  }

  clearTerrain() {
    for (const key of this.terrainChunks.keys()) {
      this.disposeChunkMesh(key);
    }
  }

  disposeChunkMesh(key) {
    const group = this.terrainChunks.get(key);
    if (!group) {
      return;
    }
    this.terrainGroup.remove(group);
    group.clear();
    this.terrainChunks.delete(key);
  }

  rebuildTerrain() {
    this.clearTerrain();
    for (const chunk of this.chunkStore.getChunks()) {
      this.rebuildChunkMesh(chunk.chunkX, chunk.chunkZ);
    }
  }

  rebuildTerrainChunks(chunks = []) {
    chunks.forEach(({ chunkX, chunkZ }) => this.rebuildChunkMesh(chunkX, chunkZ));
  }

  rebuildChunkMesh(chunkX, chunkZ) {
    const chunk = this.chunkStore.getChunk(chunkX, chunkZ);
    const key = chunkKey(chunkX, chunkZ);
    this.disposeChunkMesh(key);
    if (!chunk) {
      return;
    }

    const exposedByType = new Map();
    for (let y = 0; y < chunk.sizeY; y += 1) {
      for (let z = 0; z < chunk.sizeZ; z += 1) {
        for (let x = 0; x < chunk.sizeX; x += 1) {
          const index = y * chunk.sizeX * chunk.sizeZ + z * chunk.sizeX + x;
          const blockType = chunk.blocks[index];
          if (blockType === BLOCK_AIR) {
            continue;
          }
          const worldX = chunk.chunkX * chunk.sizeX + x;
          const worldZ = chunk.chunkZ * chunk.sizeZ + z;
          if (!this.isExposed(worldX, y, worldZ)) {
            continue;
          }
          if (!exposedByType.has(blockType)) {
            exposedByType.set(blockType, []);
          }
          exposedByType.get(blockType).push({ x: worldX, y, z: worldZ });
        }
      }
    }

    if (!exposedByType.size) {
      return;
    }

    const group = new THREE.Group();
    group.name = key;

    for (const [blockType, blocks] of exposedByType.entries()) {
      const mesh = new THREE.InstancedMesh(this.blockGeometry, this.getMaterial(blockType), blocks.length);
      mesh.castShadow = false;
      mesh.receiveShadow = true;
      mesh.userData.blocks = blocks;
      mesh.userData.blockType = blockType;
      for (let index = 0; index < blocks.length; index += 1) {
        const block = blocks[index];
        this.instanceMatrix.makeTranslation(block.x + 0.5, block.y + 0.5, block.z + 0.5);
        mesh.setMatrixAt(index, this.instanceMatrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      group.add(mesh);
    }

    this.terrainChunks.set(key, group);
    this.terrainGroup.add(group);
  }

  isExposed(worldX, worldY, worldZ) {
    const neighbors = [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ];
    return neighbors.some(([dx, dy, dz]) => this.chunkStore.getBlock(worldX + dx, worldY + dy, worldZ + dz) === BLOCK_AIR);
  }

  updateEntities(entities, selfId, predictedSelf = null) {
    const nextIds = new Set();
    for (const entity of entities) {
      if (entity.kind !== 1) {
        continue;
      }
      nextIds.add(entity.entityId);
      let mesh = this.entityMeshes.get(entity.entityId);
      if (!mesh) {
        mesh = this.createPlayerMesh(entity.entityId === selfId);
        this.entityMeshes.set(entity.entityId, mesh);
        this.entityGroup.add(mesh);
      }
      const position = entity.entityId === selfId && predictedSelf ? predictedSelf : entity.position;
      const yaw = entity.entityId === selfId && predictedSelf?.yaw !== undefined
        ? predictedSelf.yaw
        : entity.yaw ?? 0;
      mesh.position.set(position.x, position.y, position.z);
      mesh.rotation.y = yaw;
      mesh.visible = true;
    }

    for (const [entityId, mesh] of this.entityMeshes.entries()) {
      if (nextIds.has(entityId)) {
        continue;
      }
      mesh.visible = false;
    }
  }

  createPlayerMesh(isSelf) {
    const group = new THREE.Group();

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.72, 24),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
      })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.04;
    group.add(shadow);

    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.36, 0.48, 1.28, 6),
      new THREE.MeshStandardMaterial({
        color: isSelf ? 0xd47e45 : 0x6f8ea3,
        flatShading: true,
        roughness: 0.88,
      })
    );
    body.position.y = 0.72;
    body.castShadow = true;
    group.add(body);

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 10, 10),
      new THREE.MeshStandardMaterial({
        color: isSelf ? 0xf2dab0 : 0xd7cab8,
        flatShading: true,
        roughness: 0.95,
      })
    );
    head.position.y = 1.48;
    head.castShadow = true;
    group.add(head);

    const marker = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.18, 0.55),
      new THREE.MeshStandardMaterial({
        color: isSelf ? 0xf8d26b : 0xcdd8df,
        emissive: isSelf ? 0x2d1900 : 0x11212b,
        flatShading: true,
      })
    );
    marker.position.set(0, 1.5, 0.38);
    marker.castShadow = true;
    group.add(marker);

    return group;
  }

  pickBlock(clientX, clientY) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const intersects = this.raycaster.intersectObjects(this.terrainGroup.children, true);
    const hit = intersects.find((entry) => entry.instanceId !== undefined);
    if (!hit) {
      return null;
    }
    const block = hit.object.userData.blocks[hit.instanceId];
    const blockType = hit.object.userData.blockType ?? BLOCK_AIR;
    const normal = this.tmpNormal.copy(hit.face.normal).transformDirection(hit.object.matrixWorld).round();
    return {
      block: { x: block.x, y: block.y, z: block.z, blockType },
      normal: { x: normal.x, y: normal.y, z: normal.z },
    };
  }

  setInteractionTarget(hit, placement) {
    if (hit?.block) {
      this.selectionBox.visible = true;
      this.selectionBox.position.set(hit.block.x + 0.5, hit.block.y + 0.5, hit.block.z + 0.5);
    } else {
      this.selectionBox.visible = false;
    }

    if (placement) {
      const color = placement.valid ? 0x9adb7d : 0xe27d5f;
      this.placementBox.visible = true;
      this.placementEdges.visible = true;
      this.placementBox.position.set(placement.x + 0.5, placement.y + 0.5, placement.z + 0.5);
      this.placementEdges.position.copy(this.placementBox.position);
      this.placementBox.material.color.setHex(color);
      this.placementEdges.material.color.setHex(color);
    } else {
      this.placementBox.visible = false;
      this.placementEdges.visible = false;
    }
  }

  render(target, motion = { x: 0, z: 0 }) {
    if (target) {
      this.targetVector.set(target.x, target.y + 2.1, target.z);
      this.cameraTarget.lerp(this.targetVector, 0.12);

      this.motionVector.set(motion.x * 0.18, 0, motion.z * 0.18);
      this.cameraVector.copy(this.cameraTarget).add(this.cameraOffset).add(this.motionVector);
      this.camera.position.lerp(this.cameraVector, 0.08);
      this.camera.lookAt(this.cameraTarget);
      this.skyDome.position.copy(this.camera.position);
    }
    this.renderer.render(this.scene, this.camera);
  }
}
