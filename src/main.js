import { Game } from "./core/Game.js";
import { CONFIG } from "./config.js";
import { getHotbarLayout } from "./ui/hotbarLayout.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const menuOverlay = document.getElementById("menu");
const pauseOverlay = document.getElementById("pause");
const startBtn = document.getElementById("start-btn");
const resumeBtn = document.getElementById("resume-btn");
const seedLabel = document.getElementById("seed-label");
const seedInput = document.getElementById("seed-input");
const seedRandomBtn = document.getElementById("seed-random");
const optionInputs = Array.from(document.querySelectorAll("[data-ui]"));

function getSeedFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const seedParam = params.get("seed");
  if (seedParam && !Number.isNaN(Number(seedParam))) {
    return Number(seedParam);
  }
  return 1337;
}

function updateSeedInUrl(seed) {
  const params = new URLSearchParams(window.location.search);
  params.set("seed", String(seed));
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

function generateRandomSeed() {
  return Math.floor(Math.random() * 100000);
}

function sanitizeSeed(value, fallbackSeed) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isFinite(parsed)) return parsed;
  return fallbackSeed;
}

function updateSeedLabel(seed) {
  seedLabel.textContent = String(seed);
  if (seedInput) seedInput.value = String(seed);
}

const seedControls = {
  sanitizeSeed: () =>
    sanitizeSeed(seedInput?.value ?? seedLabel.textContent ?? getSeedFromUrl(), getSeedFromUrl()),
  onSeedChanged: (seed) => {
    updateSeedLabel(seed);
    updateSeedInUrl(seed);
  },
};

const game = new Game({
  ctx,
  seed: getSeedFromUrl(),
  overlays: { menu: menuOverlay, pause: pauseOverlay },
  seedControls,
});

updateSeedLabel(game.seed);
updateSeedInUrl(game.seed);
syncOptions();

function syncOptions() {
  optionInputs.forEach((input) => {
    const key = input.dataset.ui;
    if (!key) return;
    input.checked = Boolean(game.ui[key]);
  });
}

optionInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const key = input.dataset.ui;
    if (!key) return;
    game.ui.setOption(key, input.checked);
  });
});

function resizeCanvas() {
  const maxWidth = Math.min(window.innerWidth * 0.92, 1200);
  const maxHeight = window.innerHeight * 0.88;
  let width = maxWidth;
  let height = width / CONFIG.baseAspect;
  if (height > maxHeight) {
    height = maxHeight;
    width = height * CONFIG.baseAspect;
  }
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  game.setViewSize(width, height);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    if (canvas.requestFullscreen) canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function getPointerCoords(event) {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * game.view.width;
  const y = ((event.clientY - rect.top) / rect.height) * game.view.height;
  return { x, y };
}

function handleBuildCatalogClick(x, y) {
  const layout = game.ui.buildCatalogLayout;
  if (!layout) return false;
  if (
    x < layout.panel.x ||
    x > layout.panel.x + layout.panel.w ||
    y < layout.panel.y ||
    y > layout.panel.y + layout.panel.h
  ) {
    return false;
  }
  const hit = layout.lines.find(
    (line) =>
      !line.header &&
      x >= line.bounds.x &&
      x <= line.bounds.x + line.bounds.w &&
      y >= line.bounds.y &&
      y <= line.bounds.y + line.bounds.h
  );
  if (hit && !hit.locked) {
    game.selectBuild(hit.id);
  }
  return true;
}

function handleHotbarClick(x, y) {
  const layout = getHotbarLayout(game);
  for (let i = 0; i < layout.slots.length; i += 1) {
    const slot = layout.slots[i];
    if (x >= slot.x && x <= slot.x + slot.w && y >= slot.y && y <= slot.y + slot.h) {
      game.ui.activeHotbarIndex = i;
      game.syncBuildSelection();
      return true;
    }
  }
  return false;
}

startBtn.addEventListener("click", () => game.startGame());
startBtn.addEventListener("pointerdown", () => game.startGame());
resumeBtn.addEventListener("click", () => game.togglePause());
if (seedRandomBtn) {
  seedRandomBtn.addEventListener("click", () => {
    updateSeedLabel(generateRandomSeed());
  });
}

window.startGame = () => game.startGame();

window.addEventListener("keydown", (event) => {
  const target = event.target;
  if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) {
    return;
  }
  if (game.ui.inventoryOpen) {
    if (event.key === "Escape" || event.key.toLowerCase() === "i") {
      game.ui.inventoryOpen = false;
      game.storage.close();
      game.mode = "playing";
    }
    event.preventDefault();
    return;
  }
  if (game.chat.open) {
    event.preventDefault();
    if (game.chat.handleKey(event)) {
      return;
    }
  }
  const key = event.key.toLowerCase();
  if (key === "t" && game.mode === "playing") {
    game.chat.openChat();
    return;
  }
  if (key === "i" && game.mode === "playing") {
    game.ui.inventoryOpen = !game.ui.inventoryOpen;
    if (!game.ui.inventoryOpen) {
      game.storage.close();
    }
    game.mode = game.ui.inventoryOpen ? "inventory" : "playing";
    return;
  }
  if (key === "enter" && game.mode === "playing") {
    game.ui.inventoryOpen = true;
    game.storage.close();
    game.mode = "inventory";
    return;
  }
  if (key === "escape" && game.ui.inventoryOpen) {
    game.ui.inventoryOpen = false;
    game.storage.close();
    game.mode = "playing";
    return;
  }
  if (key === "f") {
    event.preventDefault();
    toggleFullscreen();
    return;
  }
  if (key === "`") {
    game.debug.enabled = !game.debug.enabled;
    game.notifications.push(game.debug.enabled ? "Debug HUD on" : "Debug HUD off");
    return;
  }
  if (key === "c" && !game.input.isDown("c")) {
    if (game.mode === "playing") {
      game.ui.inventoryOpen = true;
      game.mode = "inventory";
    }
    return;
  }
  if (key === "b" && !game.input.isDown("b")) {
    if (game.mode === "playing") {
      game.build.active = !game.build.active;
      game.notifications.push(game.build.active ? "Build mode on" : "Build mode off");
    }
    return;
  }
  if (key === "q" && game.mode === "playing" && game.build.active) {
    game.build.rotate();
    game.notifications.push("Rotated blueprint");
    return;
  }
  if ((key === "1" || key === "2" || key === "3" || key === "4") && game.mode === "playing") {
    const map = {
      "1": "campfire",
      "2": "shelter",
      "3": "workbench",
      "4": "hut",
    };
    const selected = map[key];
    if (selected) {
      game.selectBuild(selected);
    }
    return;
  }
  if (/^[1-9]$/.test(key) && game.mode === "playing") {
    game.ui.activeHotbarIndex = Number(key) - 1;
  }
  if (key === "p" && !game.input.isDown("p")) {
    event.preventDefault();
    if (game.mode !== "menu") game.togglePause();
    syncOptions();
    return;
  }
  if (key === "escape" && document.fullscreenElement) {
    document.exitFullscreen();
    return;
  }
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
    event.preventDefault();
  }
  game.input.press(key);
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  game.input.release(key);
});

canvas.addEventListener("mouseenter", () => {
  game.ui.pointerInCanvas = true;
});

canvas.addEventListener("mouseleave", () => {
  game.ui.pointerInCanvas = false;
});

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * game.view.width;
  const y = ((event.clientY - rect.top) / rect.height) * game.view.height;
  game.ui.mouseX = x;
  game.ui.mouseY = y;
  const world = game.screenToWorld(x, y);
  game.ui.mouseWorldX = world.x;
  game.ui.mouseWorldY = world.y;
});

canvas.addEventListener("mousedown", (event) => {
  const { x, y } = getPointerCoords(event);
  game.ui.mouseX = x;
  game.ui.mouseY = y;
  const world = game.screenToWorld(x, y);
  game.ui.mouseWorldX = world.x;
  game.ui.mouseWorldY = world.y;

  if (game.ui.inventoryOpen) {
    game.inventoryUI.handleClick(game, x, y, event.button, { shiftKey: event.shiftKey });
    return;
  }

  if (game.mode !== "playing") return;

  if (game.build.active && handleBuildCatalogClick(x, y)) {
    return;
  }

  if (handleHotbarClick(x, y)) {
    return;
  }

  if (game.build.active) {
    if (event.button === 2) {
      game.build.active = false;
      game.notifications.push("Build mode off");
      return;
    }
    if (event.button === 0) {
      game.attemptBuild();
      return;
    }
  }

  if (event.button === 2) {
    const target = game.creatures.findNearestAt(world.x, world.y, 0.9);
    if (target) {
      game.attemptAttackAt(target.x, target.y);
    } else if (game.interaction.kind === "enemy") {
      game.attemptAttackAt(world.x, world.y);
    } else if (!game.attemptInteract()) {
      game.attemptGather();
    }
    return;
  }

  if (event.button === 0) {
    if (game.world.tileType(Math.floor(world.x), Math.floor(world.y)) !== "water") {
      game.setMoveTarget(world.x, world.y);
    }
  }
});

canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

canvas.addEventListener("wheel", (event) => {
  if (game.mode !== "playing" || game.ui.inventoryOpen) return;
  const delta = Math.sign(event.deltaY);
  if (delta === 0) return;
  const next = (game.ui.activeHotbarIndex + delta + 9) % 9;
  game.ui.activeHotbarIndex = next;
  game.syncBuildSelection();
});

window.addEventListener("fullscreenchange", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

function gameLoop(timestamp) {
  const dt = Math.min(0.05, (timestamp - game.lastUpdate) / 1000);
  game.lastUpdate = timestamp;
  if (!game.externalTime) {
    game.update(dt);
    game.render();
  } else {
    game.render();
  }
  requestAnimationFrame(gameLoop);
}

window.advanceTime = (ms) => game.advanceTime(ms);
window.render_game_to_text = () => game.renderToText();

resizeCanvas();
requestAnimationFrame(gameLoop);
