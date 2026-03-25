import {
  BLOCK_TYPES,
  HOTBAR_ITEMS,
  INPUT_RATE_HZ,
  WORLD_ID,
} from "@jrland/shared-config";
import { NakamaClient } from "./net/NakamaClient.js";
import { WorldGatewayClient } from "./net/WorldGatewayClient.js";
import { WorldSocketAdapter } from "./net/WorldSocketAdapter.js";
import { ChunkStore } from "./world/ChunkStore.js";
import { WorldRenderer } from "./world/WorldRenderer.js";
import { advanceOfflineBots, blockLabelForType, createOfflineWorld } from "./world/offlineWorld.js";

const FIXED_STEP = 1 / 60;
const INPUT_STEP = 1 / INPUT_RATE_HZ;
const MAX_FRAME_DELTA = 0.05;
const OFFLINE_SEED = 7;

const root = document.getElementById("app");
root.innerHTML = `
  <div class="shell">
    <div class="topbar">
      <div class="brand">
        <span class="brand-mark"></span>
        <div>
          <strong>JRLand</strong>
          <span id="status-line">Offline</span>
        </div>
      </div>
      <div class="status-strip">
        <div class="status-block">
          <span>World</span>
          <strong id="world-label">${WORLD_ID}</strong>
        </div>
        <div class="status-block">
          <span>Identity</span>
          <strong id="identity-label">Guest</strong>
        </div>
        <div class="status-block">
          <span>Region</span>
          <strong id="region-label">-</strong>
        </div>
      </div>
      <div class="action-cluster">
        <button id="enter-world-btn" class="action-button">Enter Main World</button>
        <button id="practice-btn" class="action-button secondary-button">Practice Offline</button>
      </div>
    </div>

    <div class="viewport-wrap">
      <div class="viewport" id="viewport"></div>
      <div class="overlay-panel">
        <div class="panel-row">
          <span>Transport</span>
          <strong id="transport-label">Nakama + World WS</strong>
        </div>
        <div class="panel-row">
          <span>Session</span>
          <strong id="mode-label">Idle shell</strong>
        </div>
        <div class="panel-row">
          <span>Loop</span>
          <strong id="loop-label">0 fps · 0 chunks · 0 rangers</strong>
        </div>
        <div class="panel-row">
          <span>Selection</span>
          <strong id="selection-label">Grass x0</strong>
        </div>
        <div class="panel-row">
          <span>Controls</span>
          <strong id="control-label">WASD or arrows move, Shift sprint, wheel or 1-5 changes block</strong>
        </div>
      </div>
      <div class="action-ribbon" id="action-ribbon">Start the main world or load the local practice range.</div>
      <div class="message-banner" id="message-banner">Authenticate through Nakama, resolve the world, then join the shared server.</div>
      <div class="reticle" aria-hidden="true"></div>
    </div>

    <div class="bottom-bar">
      <div class="hotbar" id="hotbar"></div>
      <div class="chat-panel">
        <div class="chat-log" id="chat-log"></div>
        <form id="chat-form" class="chat-form">
          <input id="chat-input" autocomplete="off" placeholder="Type a local message or /g for global" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
`;

const elements = {
  statusLine: document.getElementById("status-line"),
  worldLabel: document.getElementById("world-label"),
  identityLabel: document.getElementById("identity-label"),
  regionLabel: document.getElementById("region-label"),
  enterWorldBtn: document.getElementById("enter-world-btn"),
  practiceBtn: document.getElementById("practice-btn"),
  viewport: document.getElementById("viewport"),
  hotbar: document.getElementById("hotbar"),
  chatLog: document.getElementById("chat-log"),
  chatForm: document.getElementById("chat-form"),
  chatInput: document.getElementById("chat-input"),
  messageBanner: document.getElementById("message-banner"),
  actionRibbon: document.getElementById("action-ribbon"),
  transportLabel: document.getElementById("transport-label"),
  modeLabel: document.getElementById("mode-label"),
  loopLabel: document.getElementById("loop-label"),
  selectionLabel: document.getElementById("selection-label"),
  controlLabel: document.getElementById("control-label"),
};

const chunkStore = new ChunkStore();
const renderer = new WorldRenderer(elements.viewport, chunkStore);
const nakama = new NakamaClient();
const gateway = new WorldGatewayClient(nakama);
const world = new WorldSocketAdapter();

const state = {
  booting: false,
  mode: "idle",
  selfId: null,
  regionId: "-",
  worldEndpoint: "",
  selectedHotbarIndex: 0,
  inventory: new Map(),
  entities: new Map(),
  chat: [],
  predictedSelf: null,
  predictedVelocity: { x: 0, z: 0 },
  pressed: new Set(),
  pointer: {
    inside: false,
    clientX: 0,
    clientY: 0,
  },
  hoveredBlock: null,
  placeTarget: null,
  transportLabel: "Nakama + World WS",
  pendingTerrain: {
    scheduled: false,
    full: false,
    chunks: new Map(),
  },
  loop: {
    accumulator: 0,
    inputAccumulator: 0,
    previousFrame: performance.now(),
    fps: 60,
  },
  offline: {
    active: false,
    elapsed: 0,
    bots: [],
    seed: OFFLINE_SEED,
  },
};

function terrainKey(chunkX, chunkZ) {
  return `${chunkX}:${chunkZ}`;
}

function surroundingChunkRefs(chunkX, chunkZ) {
  const refs = [];
  for (let dz = -1; dz <= 1; dz += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      refs.push({ chunkX: chunkX + dx, chunkZ: chunkZ + dz });
    }
  }
  return refs;
}

function selectedHotbarItem() {
  return HOTBAR_ITEMS[state.selectedHotbarIndex] ?? HOTBAR_ITEMS[0];
}

function setStatus(line, banner = "") {
  elements.statusLine.textContent = line;
  if (banner) {
    elements.messageBanner.textContent = banner;
  }
}

function setIdentity(label) {
  elements.identityLabel.textContent = label;
}

function setRegion(regionId) {
  state.regionId = regionId;
  elements.regionLabel.textContent = regionId;
}

function setTransport(label) {
  state.transportLabel = label;
  elements.transportLabel.textContent = label;
}

function updateLoopLabel() {
  const entityCount = Array.from(state.entities.values()).filter((entity) => entity.kind === 1).length;
  elements.loopLabel.textContent = `${Math.round(state.loop.fps)} fps · ${chunkStore.getChunks().length} chunks · ${entityCount} rangers`;
}

function updateSelectionLabel() {
  const selected = selectedHotbarItem();
  const selectedCount = state.inventory.get(selected.blockType) ?? 0;
  if (state.hoveredBlock?.block) {
    const block = state.hoveredBlock.block;
    elements.selectionLabel.textContent = `${blockLabelForType(block.blockType)} @ ${block.x}, ${block.y}, ${block.z}`;
    return;
  }
  elements.selectionLabel.textContent = `${selected.label} x${selectedCount}`;
}

function updateModeLabel() {
  if (state.mode === "live") {
    elements.modeLabel.textContent = "Live shared world";
    return;
  }
  if (state.mode === "offline") {
    elements.modeLabel.textContent = "Offline practice range";
    return;
  }
  elements.modeLabel.textContent = "Idle shell";
}

function updateActionRibbon() {
  if (state.hoveredBlock?.block && state.placeTarget) {
    const block = state.hoveredBlock.block;
    const selected = selectedHotbarItem();
    const placeState = state.placeTarget.valid ? "ready" : "blocked";
    elements.actionRibbon.textContent =
      `LMB or Space mine ${blockLabelForType(block.blockType)} · RMB or B place ${selected.label} (${placeState})`;
    return;
  }
  if (state.mode === "live") {
    elements.actionRibbon.textContent = "WASD or arrows move, Shift sprint, LMB or Space mine, RMB or B place, Enter chat";
    return;
  }
  if (state.mode === "offline") {
    elements.actionRibbon.textContent = "Practice range: mine terrain, place blocks, and sprint between ridgelines.";
    return;
  }
  elements.actionRibbon.textContent = "Start the main world or load the local practice range.";
}

function updateHud() {
  updateModeLabel();
  updateLoopLabel();
  updateSelectionLabel();
  updateActionRibbon();
  elements.controlLabel.textContent =
    "WASD or arrows move, Shift sprint, wheel or 1-5 changes block, LMB or Space mine, RMB or B place";
  elements.enterWorldBtn.textContent = state.mode === "offline" ? "Retry Main World" : "Enter Main World";
}

function addChatMessage(scope, author, text) {
  state.chat.push({ scope, author, text });
  state.chat = state.chat.slice(-60);
  elements.chatLog.innerHTML = state.chat
    .map(
      (message) =>
        `<div class="chat-message"><span class="chat-scope">[${message.scope}]</span><strong>${message.author}</strong><span>${message.text}</span></div>`
    )
    .join("");
  elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
}

function setEntities(entities = []) {
  state.entities.clear();
  entities.forEach((entity) => state.entities.set(entity.entityId, entity));
  reconcileSelf();
}

function updateInventory(slots = []) {
  state.inventory.clear();
  for (const slot of slots) {
    state.inventory.set(slot.blockType, slot.count);
  }
  renderHotbar();
  updateHud();
}

function adjustInventory(blockType, delta) {
  const next = Math.max(0, (state.inventory.get(blockType) ?? 0) + delta);
  if (next > 0) {
    state.inventory.set(blockType, next);
  } else {
    state.inventory.delete(blockType);
  }
  renderHotbar();
  updateHud();
}

function renderHotbar() {
  elements.hotbar.innerHTML = HOTBAR_ITEMS.map((item, index) => {
    const count = state.inventory.get(item.blockType) ?? 0;
    const active = index === state.selectedHotbarIndex ? "active" : "";
    return `
      <button class="hotbar-slot ${active}" data-index="${index}">
        <span>${index + 1}</span>
        <strong>${item.label}</strong>
        <em>${count}</em>
      </button>
    `;
  }).join("");

  elements.hotbar.querySelectorAll("[data-index]").forEach((button) => {
    button.addEventListener("click", () => selectHotbar(Number(button.dataset.index)));
  });
}

function selectHotbar(index) {
  state.selectedHotbarIndex = Math.max(0, Math.min(HOTBAR_ITEMS.length - 1, index));
  renderHotbar();
  updatePointerTarget();
  updateHud();
}

function queueTerrainRebuild(chunkX = null, chunkZ = null) {
  if (chunkX === null || chunkZ === null) {
    state.pendingTerrain.full = true;
  } else {
    surroundingChunkRefs(chunkX, chunkZ).forEach((ref) => {
      state.pendingTerrain.chunks.set(terrainKey(ref.chunkX, ref.chunkZ), ref);
    });
  }

  if (state.pendingTerrain.scheduled) {
    return;
  }

  state.pendingTerrain.scheduled = true;
  requestAnimationFrame(() => {
    state.pendingTerrain.scheduled = false;
    if (state.pendingTerrain.full) {
      renderer.rebuildTerrain();
    } else {
      renderer.rebuildTerrainChunks(Array.from(state.pendingTerrain.chunks.values()));
    }
    state.pendingTerrain.full = false;
    state.pendingTerrain.chunks.clear();
  });
}

function reconcileSelf() {
  if (!state.selfId) {
    return;
  }
  const serverSelf = state.entities.get(state.selfId);
  if (!serverSelf?.position) {
    return;
  }
  if (!state.predictedSelf) {
    state.predictedSelf = { ...serverSelf.position, yaw: serverSelf.yaw ?? 0 };
    state.predictedVelocity.x = 0;
    state.predictedVelocity.z = 0;
    return;
  }
  const dx = serverSelf.position.x - state.predictedSelf.x;
  const dz = serverSelf.position.z - state.predictedSelf.z;
  const dist = Math.hypot(dx, dz);
  if (dist > 4) {
    state.predictedSelf = { ...serverSelf.position, yaw: serverSelf.yaw ?? state.predictedSelf.yaw ?? 0 };
    state.predictedVelocity.x = 0;
    state.predictedVelocity.z = 0;
    return;
  }
  state.predictedSelf.x += dx * 0.35;
  state.predictedSelf.y += (serverSelf.position.y - state.predictedSelf.y) * 0.35;
  state.predictedSelf.z += dz * 0.35;
  if (typeof serverSelf.yaw === "number") {
    state.predictedSelf.yaw = serverSelf.yaw;
  }
}

function getMoveIntent() {
  const left = state.pressed.has("a") || state.pressed.has("arrowleft");
  const right = state.pressed.has("d") || state.pressed.has("arrowright");
  const forward = state.pressed.has("w") || state.pressed.has("arrowup");
  const backward = state.pressed.has("s") || state.pressed.has("arrowdown");
  return {
    moveX: (right ? 1 : 0) - (left ? 1 : 0),
    moveZ: (backward ? 1 : 0) - (forward ? 1 : 0),
    sprint: state.pressed.has("shift"),
  };
}

function approachAngle(current, target, blend) {
  let delta = target - current;
  while (delta > Math.PI) {
    delta -= Math.PI * 2;
  }
  while (delta < -Math.PI) {
    delta += Math.PI * 2;
  }
  return current + delta * blend;
}

function stepLocalPrediction(delta) {
  if (!state.predictedSelf) {
    return;
  }

  const intent = getMoveIntent();
  const length = Math.hypot(intent.moveX, intent.moveZ);
  const baseSpeed = intent.sprint ? 8.2 : 5.4;
  const targetSpeed = length > 0 ? baseSpeed : 0;
  const targetVX = length > 0 ? (intent.moveX / length) * targetSpeed : 0;
  const targetVZ = length > 0 ? (intent.moveZ / length) * targetSpeed : 0;
  const blend = 1 - Math.exp(-delta * (length > 0 ? 16 : 10));

  state.predictedVelocity.x += (targetVX - state.predictedVelocity.x) * blend;
  state.predictedVelocity.z += (targetVZ - state.predictedVelocity.z) * blend;

  state.predictedSelf.x += state.predictedVelocity.x * delta;
  state.predictedSelf.z += state.predictedVelocity.z * delta;
  state.predictedSelf.y = chunkStore.surfaceHeightAt(state.predictedSelf.x, state.predictedSelf.z) + 1;

  const movement = Math.hypot(state.predictedVelocity.x, state.predictedVelocity.z);
  if (movement > 0.05) {
    const targetYaw = Math.atan2(state.predictedVelocity.x, state.predictedVelocity.z);
    state.predictedSelf.yaw = approachAngle(state.predictedSelf.yaw ?? 0, targetYaw, 1 - Math.exp(-delta * 12));
  } else if (typeof state.predictedSelf.yaw !== "number") {
    state.predictedSelf.yaw = 0;
  }

  if (state.offline.active && state.selfId) {
    const selfEntity = state.entities.get(state.selfId);
    if (selfEntity) {
      selfEntity.position = {
        x: state.predictedSelf.x,
        y: state.predictedSelf.y,
        z: state.predictedSelf.z,
      };
      selfEntity.yaw = state.predictedSelf.yaw ?? 0;
    }
  }
}

function stepOfflineWorld(delta) {
  if (!state.offline.active) {
    return;
  }
  state.offline.elapsed += delta;
  const botEntities = advanceOfflineBots(
    state.offline.bots,
    state.offline.elapsed,
    (x, z) => chunkStore.surfaceHeightAt(x, z)
  );
  botEntities.forEach((entity) => state.entities.set(entity.entityId, entity));
}

function sendLiveInputSample() {
  if (!world.connected) {
    return;
  }
  const intent = getMoveIntent();
  world.sendInput(intent.moveX, intent.moveZ, intent.sprint, state.predictedSelf?.yaw ?? 0);
}

function samplePlayerPosition() {
  if (state.predictedSelf) {
    return state.predictedSelf;
  }
  return state.selfId ? state.entities.get(state.selfId)?.position ?? null : null;
}

function blockDistance(worldX, worldY, worldZ) {
  const self = samplePlayerPosition();
  if (!self) {
    return Number.POSITIVE_INFINITY;
  }
  return Math.hypot(worldX + 0.5 - self.x, worldY + 0.5 - self.y, worldZ + 0.5 - self.z);
}

function canPlaceBlockAt(worldX, worldY, worldZ) {
  if (chunkStore.getBlock(worldX, worldY, worldZ) !== BLOCK_TYPES.AIR) {
    return false;
  }
  if (blockDistance(worldX, worldY, worldZ) > 7.5) {
    return false;
  }
  const self = samplePlayerPosition();
  if (!self) {
    return false;
  }
  const playerX = Math.floor(self.x);
  const playerZ = Math.floor(self.z);
  const footY = Math.floor(self.y - 1);
  const headY = footY + 1;
  if (worldX === playerX && worldZ === playerZ && (worldY === footY || worldY === headY)) {
    return false;
  }
  return true;
}

function clearPointerTarget() {
  state.hoveredBlock = null;
  state.placeTarget = null;
  renderer.setInteractionTarget(null, null);
  updateHud();
}

function ensurePointerFocus() {
  if (state.pointer.inside) {
    return;
  }
  const rect = renderer.renderer.domElement.getBoundingClientRect();
  state.pointer.inside = true;
  state.pointer.clientX = rect.left + rect.width / 2;
  state.pointer.clientY = rect.top + rect.height / 2;
}

function updatePointerTarget() {
  if (!state.pointer.inside) {
    clearPointerTarget();
    return;
  }

  const hit = renderer.pickBlock(state.pointer.clientX, state.pointer.clientY);
  state.hoveredBlock = hit;
  if (!hit?.block) {
    state.placeTarget = null;
    renderer.setInteractionTarget(null, null);
    updateHud();
    return;
  }

  const selected = selectedHotbarItem();
  const count = state.inventory.get(selected.blockType) ?? 0;
  const placement = {
    x: hit.block.x + hit.normal.x,
    y: hit.block.y + hit.normal.y,
    z: hit.block.z + hit.normal.z,
    blockType: selected.blockType,
    valid: count > 0 && canPlaceBlockAt(hit.block.x + hit.normal.x, hit.block.y + hit.normal.y, hit.block.z + hit.normal.z),
  };
  state.placeTarget = placement;
  renderer.setInteractionTarget(hit, placement);
  updateHud();
}

function applyOfflineMine() {
  const hit = state.hoveredBlock;
  if (!hit?.block || blockDistance(hit.block.x, hit.block.y, hit.block.z) > 7.5) {
    return;
  }
  const changed = chunkStore.setBlock(hit.block.x, hit.block.y, hit.block.z, BLOCK_TYPES.AIR);
  if (!changed) {
    return;
  }
  adjustInventory(hit.block.blockType, 1);
  queueTerrainRebuild(changed.chunkX, changed.chunkZ);
  updatePointerTarget();
}

function applyOfflineBuild() {
  const placement = state.placeTarget;
  if (!placement?.valid) {
    return;
  }
  const selected = selectedHotbarItem();
  if ((state.inventory.get(selected.blockType) ?? 0) <= 0) {
    return;
  }
  const changed = chunkStore.setBlock(placement.x, placement.y, placement.z, selected.blockType);
  if (!changed) {
    return;
  }
  adjustInventory(selected.blockType, -1);
  queueTerrainRebuild(changed.chunkX, changed.chunkZ);
  updatePointerTarget();
}

function resetRuntimeForMode(mode) {
  state.mode = mode;
  state.loop.accumulator = 0;
  state.loop.inputAccumulator = 0;
  state.predictedVelocity.x = 0;
  state.predictedVelocity.z = 0;
}

function startOfflinePractice(message = "") {
  world.disconnect();
  resetRuntimeForMode("offline");
  state.offline.active = true;
  state.offline.elapsed = 0;
  state.chat = [];
  elements.chatLog.innerHTML = "";

  const snapshot = createOfflineWorld(OFFLINE_SEED);
  state.selfId = snapshot.selfId;
  state.worldEndpoint = snapshot.endpoint;
  state.offline.bots = snapshot.bots;

  chunkStore.clear();
  snapshot.chunks.forEach((chunk) => chunkStore.applyChunkSnapshot(chunk));
  queueTerrainRebuild();

  setEntities(snapshot.entities);
  updateInventory(snapshot.inventory);
  state.predictedSelf = { ...snapshot.entities[0].position, yaw: snapshot.entities[0].yaw ?? 0 };

  elements.worldLabel.textContent = snapshot.worldId;
  setRegion(snapshot.regionId);
  setTransport("Offline Sandbox");
  setIdentity(nakama.session?.username || "Local Ranger");
  setStatus("Offline Practice", message || snapshot.message);
  addChatMessage("system", "range", "Practice range ready. The shared backend can stay offline while you iterate on movement and building.");
  updateHud();
}

async function probeRealtimeStack(timeoutMs = 1200) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    await fetch(nakama.getHealthcheckUrl(), {
      method: "GET",
      cache: "no-store",
      mode: "no-cors",
      signal: controller.signal,
    });
    return true;
  } catch {
    return false;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function startMainWorld({ allowOfflineFallback = true } = {}) {
  if (state.booting) {
    return;
  }
  state.booting = true;
  elements.enterWorldBtn.disabled = true;
  elements.practiceBtn.disabled = true;

  try {
    setStatus("Checking Realtime", "Probing Nakama before joining the shared world.");
    const available = await probeRealtimeStack();
    if (!available) {
      if (allowOfflineFallback) {
        startOfflinePractice("Main world services were unreachable, so the local practice range took over.");
        return;
      }
      throw new Error("Realtime services unavailable.");
    }

    resetRuntimeForMode("live");
    state.offline.active = false;
    state.offline.bots = [];
    setTransport("Nakama + World WS");

    setStatus("Authenticating", "Creating or restoring your Nakama session.");
    const session = await nakama.authenticate();
    setIdentity(session.username || session.user_id || "Ranger");

    setStatus("Realtime Online", "Joining the global Nakama socket.");
    await nakama.connectSocket();

    setStatus("Resolving World", "Requesting your current world session through rpc_world_resolve.");
    const worldSession = await gateway.resolve("");
    state.worldEndpoint = worldSession.endpoint;
    elements.worldLabel.textContent = worldSession.worldId;

    setStatus("Joining World", "Opening the authoritative world websocket.");
    await world.connect(worldSession.endpoint, {
      ticket: worldSession.ticket,
      clientName: worldSession.playerName,
    });
    updateHud();
  } catch (error) {
    if (allowOfflineFallback) {
      startOfflinePractice("Main world boot failed, so the local practice range is active instead.");
      return;
    }
    setStatus("Boot Failed", "Check Nakama, gateway, and worldd service availability.");
  } finally {
    state.booting = false;
    elements.enterWorldBtn.disabled = false;
    elements.practiceBtn.disabled = false;
  }
}

world.onWelcome = (welcome) => {
  resetRuntimeForMode("live");
  state.offline.active = false;
  state.offline.bots = [];
  state.selfId = welcome.selfPlayerId;
  state.worldEndpoint = state.worldEndpoint || "world://connected";
  setRegion(welcome.regionId);
  chunkStore.clear();
  welcome.chunks.forEach((chunk) => chunkStore.applyChunkSnapshot(chunk));
  queueTerrainRebuild();
  setEntities(welcome.entities);
  updateInventory(welcome.inventory);
  const self = welcome.entities.find((entity) => entity.entityId === welcome.selfPlayerId);
  if (self?.position) {
    state.predictedSelf = { ...self.position, yaw: self.yaw ?? 0 };
  }
  setTransport("Nakama + World WS");
  setStatus("Connected", "Authoritative world stream active.");
  updateHud();
};

world.onWorldState = (payload) => {
  setEntities(payload.entities);
  updateHud();
};

world.onChunkSnapshot = (snapshot) => {
  chunkStore.applyChunkSnapshot(snapshot);
  queueTerrainRebuild(snapshot.chunkX, snapshot.chunkZ);
  updateHud();
};

world.onChunkDelta = (delta) => {
  chunkStore.applyChunkDelta(delta);
  queueTerrainRebuild(delta.chunkX, delta.chunkZ);
  updateHud();
};

world.onInventoryDelta = (delta) => {
  updateInventory(delta.slots);
};

world.onChat = (message) => {
  addChatMessage("local", message.authorName || "local", message.text || "");
};

world.onError = (error) => {
  setStatus("World Error", error.message || "Unexpected world server error.");
  updateHud();
};

world.onHandoffPrepare = (handoff) => {
  state.worldEndpoint = handoff.nextAddress || state.worldEndpoint;
  setStatus(
    "Crossing Regions",
    `Crossing into ${handoff.nextRegionId}. Preconnecting to the next world server.`
  );
  updateHud();
};

world.onHandoffCommit = (handoff) => {
  if (handoff?.nextRegionId) {
    setRegion(handoff.nextRegionId);
  }
  setStatus("Connected", `Region handoff complete: ${handoff?.nextRegionId || state.regionId}.`);
  updateHud();
};

world.onDisconnect = () => {
  if (state.mode === "offline") {
    return;
  }
  setStatus("Disconnected", "The world socket closed. Use Enter Main World to reconnect.");
  updateHud();
};

nakama.onGlobalMessage = (message) => {
  addChatMessage(message.scope, message.author, message.text);
};

elements.enterWorldBtn.addEventListener("click", () => {
  startMainWorld({ allowOfflineFallback: true });
});

elements.practiceBtn.addEventListener("click", () => {
  startOfflinePractice("Practice range loaded directly from the browser client.");
});

elements.chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = elements.chatInput.value.trim();
  if (!text) {
    return;
  }
  elements.chatInput.value = "";

  if (text.startsWith("/g ")) {
    if (!nakama.socket) {
      addChatMessage("system", "relay", "Global chat is only available after the main world handshake.");
      return;
    }
    await nakama.sendGlobalChat(text.slice(3));
    return;
  }

  if (state.offline.active || !world.connected) {
    addChatMessage("local", "you", text);
    return;
  }

  world.sendLocalChat(text);
});

window.addEventListener("keydown", (event) => {
  if (event.target === elements.chatInput) {
    return;
  }
  if (event.key === "Enter") {
    elements.chatInput.focus();
    event.preventDefault();
    return;
  }
  if (/^[1-5]$/.test(event.key)) {
    selectHotbar(Number(event.key) - 1);
  }
  if (!event.repeat && event.code === "Space") {
    ensurePointerFocus();
    updatePointerTarget();
    if (state.offline.active) {
      applyOfflineMine();
    } else if (world.connected && state.hoveredBlock?.block) {
      world.sendMine(state.hoveredBlock.block.x, state.hoveredBlock.block.y, state.hoveredBlock.block.z);
    }
    event.preventDefault();
  }
  if (!event.repeat && event.key.toLowerCase() === "b") {
    ensurePointerFocus();
    updatePointerTarget();
    if (state.offline.active) {
      applyOfflineBuild();
    } else if (world.connected && state.placeTarget) {
      world.sendBuild(state.placeTarget.x, state.placeTarget.y, state.placeTarget.z, selectedHotbarItem().blockType);
    }
    event.preventDefault();
  }
  state.pressed.add(event.key.toLowerCase());
});

window.addEventListener("keyup", (event) => {
  state.pressed.delete(event.key.toLowerCase());
});

window.addEventListener("blur", () => {
  state.pressed.clear();
});

renderer.renderer.domElement.addEventListener("contextmenu", (event) => event.preventDefault());
renderer.renderer.domElement.addEventListener("pointermove", (event) => {
  state.pointer.inside = true;
  state.pointer.clientX = event.clientX;
  state.pointer.clientY = event.clientY;
});
renderer.renderer.domElement.addEventListener("pointerleave", () => {
  state.pointer.inside = false;
  clearPointerTarget();
});
renderer.renderer.domElement.addEventListener("wheel", (event) => {
  event.preventDefault();
  const direction = event.deltaY > 0 ? 1 : -1;
  const nextIndex = (state.selectedHotbarIndex + direction + HOTBAR_ITEMS.length) % HOTBAR_ITEMS.length;
  selectHotbar(nextIndex);
}, { passive: false });
renderer.renderer.domElement.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  state.pointer.inside = true;
  state.pointer.clientX = event.clientX;
  state.pointer.clientY = event.clientY;
  updatePointerTarget();

  if (!state.hoveredBlock?.block) {
    return;
  }

  if (state.offline.active) {
    if (event.button === 0) {
      applyOfflineMine();
      return;
    }
    if (event.button === 2) {
      applyOfflineBuild();
    }
    return;
  }

  if (!world.connected) {
    return;
  }

  if (event.button === 0) {
    world.sendMine(state.hoveredBlock.block.x, state.hoveredBlock.block.y, state.hoveredBlock.block.z);
    return;
  }

  if (event.button === 2 && state.placeTarget) {
    world.sendBuild(state.placeTarget.x, state.placeTarget.y, state.placeTarget.z, selectedHotbarItem().blockType);
  }
});

function advanceSimulation(seconds) {
  state.loop.accumulator += seconds;
  state.loop.inputAccumulator += seconds;

  while (state.loop.accumulator >= FIXED_STEP) {
    stepLocalPrediction(FIXED_STEP);
    stepOfflineWorld(FIXED_STEP);
    state.loop.accumulator -= FIXED_STEP;
  }

  while (state.loop.inputAccumulator >= INPUT_STEP) {
    sendLiveInputSample();
    state.loop.inputAccumulator -= INPUT_STEP;
  }
}

function renderFrame() {
  if (state.pointer.inside) {
    updatePointerTarget();
  }
  renderer.updateEntities(Array.from(state.entities.values()), state.selfId, state.predictedSelf);
  renderer.render(state.predictedSelf, state.predictedVelocity);
  updateHud();
}

function frame(now) {
  const delta = Math.min((now - state.loop.previousFrame) / 1000, MAX_FRAME_DELTA);
  state.loop.previousFrame = now;
  state.loop.fps += ((1 / Math.max(delta, 0.0001)) - state.loop.fps) * 0.08;

  advanceSimulation(delta);
  renderFrame();
  requestAnimationFrame(frame);
}

window.startGame = () => startMainWorld({ allowOfflineFallback: true });
window.startOfflinePractice = () => startOfflinePractice("Practice range loaded from the browser test hook.");
window.advanceTime = (ms = 16) => {
  const steps = Math.max(1, Math.round(ms / (FIXED_STEP * 1000)));
  for (let index = 0; index < steps; index += 1) {
    advanceSimulation(FIXED_STEP);
  }
  renderFrame();
};
window.render_game_to_text = () =>
  JSON.stringify({
    mode: state.mode,
    status: elements.statusLine.textContent,
    worldId: elements.worldLabel.textContent,
    regionId: state.regionId,
    endpoint: state.worldEndpoint,
    connected: world.connected,
    transport: state.transportLabel,
    selfId: state.selfId,
    predictedSelf: state.predictedSelf,
    predictedVelocity: {
      x: Number(state.predictedVelocity.x.toFixed(2)),
      z: Number(state.predictedVelocity.z.toFixed(2)),
    },
    hoveredBlock: state.hoveredBlock?.block ?? null,
    placement: state.placeTarget ?? null,
    selectedBlock: {
      ...selectedHotbarItem(),
      count: state.inventory.get(selectedHotbarItem().blockType) ?? 0,
    },
    fps: Number(state.loop.fps.toFixed(1)),
    entityCount: state.entities.size,
    chunkCount: chunkStore.getChunks().length,
    inventory: HOTBAR_ITEMS.map((item) => ({
      blockType: item.blockType,
      label: item.label,
      count: state.inventory.get(item.blockType) ?? 0,
    })),
    chatTail: state.chat.slice(-5),
    coordinateSystem: {
      origin: "world-space meters",
      x: "east positive",
      y: "up positive",
      z: "south positive",
    },
  });

renderHotbar();
updateHud();
requestAnimationFrame(frame);
