import { Game } from "./core/Game.js";
import { CONFIG } from "./config.js";
import { getHotbarLayout } from "./ui/hotbarLayout.js";
import { SpacetimeNetAdapter } from "./net/SpacetimeNetAdapter.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const menuOverlay = document.getElementById("menu");
const pauseOverlay = document.getElementById("pause");
const startBtn = document.getElementById("start-btn");
const resumeBtn = document.getElementById("resume-btn");
const optionInputs = Array.from(document.querySelectorAll("[data-ui]"));
const DEFAULT_SEED = 1337;

function getNetConfigFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("net") ?? "local";
  const endpointParam = params.get("endpoint");
  return {
    mode,
    endpoint:
      endpointParam ??
      (mode === "spacetime" ? "https://maincloud.spacetimedb.com" : "ws://localhost:3000"),
    regionId: params.get("region") ?? "region-0",
    moduleName: params.get("module") ?? "jrland",
    token: params.get("token") ?? null,
  };
}

const netConfig = getNetConfigFromUrl();
const netAdapter =
  netConfig.mode === "spacetime"
    ? new SpacetimeNetAdapter({
        endpoint: netConfig.endpoint,
        regionId: netConfig.regionId,
        moduleName: netConfig.moduleName,
        token: netConfig.token,
      })
    : null;

const game = new Game({
  ctx,
  seed: DEFAULT_SEED,
  overlays: { menu: menuOverlay, pause: pauseOverlay },
  netAdapter,
});

if (netAdapter?.connect) {
  netAdapter.connect();
}

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
    game.emitAction("chat_open", {});
    return;
  }
  if (key === "i" && game.mode === "playing") {
    game.ui.inventoryOpen = !game.ui.inventoryOpen;
    if (!game.ui.inventoryOpen) {
      game.storage.close();
    }
    game.mode = game.ui.inventoryOpen ? "inventory" : "playing";
    game.emitAction("toggle_inventory", { open: game.ui.inventoryOpen });
    return;
  }
  if (key === "enter" && game.mode === "playing") {
    game.ui.inventoryOpen = true;
    game.storage.close();
    game.mode = "inventory";
    game.emitAction("toggle_inventory", { open: true });
    return;
  }
  if (key === "escape" && game.ui.inventoryOpen) {
    game.ui.inventoryOpen = false;
    game.storage.close();
    game.mode = "playing";
    game.emitAction("toggle_inventory", { open: false });
    return;
  }
  if (key === "f") {
    event.preventDefault();
    toggleFullscreen();
    game.emitAction("toggle_fullscreen", { on: Boolean(document.fullscreenElement) });
    return;
  }
  if (key === "`") {
    game.debug.enabled = !game.debug.enabled;
    game.notifications.push(game.debug.enabled ? "Debug HUD on" : "Debug HUD off");
    game.emitAction("toggle_debug", { on: game.debug.enabled });
    return;
  }
  if (key === "c" && !game.input.isDown("c")) {
    if (game.mode === "playing") {
      game.ui.inventoryOpen = true;
      game.mode = "inventory";
      game.emitAction("toggle_inventory", { open: true, source: "craft" });
    }
    return;
  }
  if (key === "b" && !game.input.isDown("b")) {
    if (game.mode === "playing") {
      game.build.active = !game.build.active;
      game.notifications.push(game.build.active ? "Build mode on" : "Build mode off");
      game.emitAction("toggle_build", { on: game.build.active });
    }
    return;
  }
  if (key === "q" && game.mode === "playing" && game.build.active) {
    game.build.rotate();
    game.notifications.push("Rotated blueprint");
    game.emitAction("rotate_build", { rotation: game.build.rotation ?? 0 });
    return;
  }
  if (/^[1-9]$/.test(key) && game.mode === "playing") {
    game.ui.activeHotbarIndex = Number(key) - 1;
    game.syncBuildSelection();
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
  game.emitAction("input_down", { key });
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  game.input.release(key);
  game.emitAction("input_up", { key });
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
  if (game.mode === "playing") {
    game.emitAction("pointer_move", {
      x: Number(world.x.toFixed(2)),
      y: Number(world.y.toFixed(2)),
    });
  }
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
    game.emitAction("ui_click", {
      button: event.button,
      x: Number(x.toFixed(1)),
      y: Number(y.toFixed(1)),
      shift: event.shiftKey,
    });
    return;
  }

  if (game.mode !== "playing") return;

  if (game.build.active && handleBuildCatalogClick(x, y)) {
    game.emitAction("build_catalog_click", { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) });
    return;
  }

  if (handleHotbarClick(x, y)) {
    game.emitAction("hotbar_click", { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) });
    return;
  }

  if (game.build.active) {
    if (event.button === 2) {
      game.build.active = false;
      game.notifications.push("Build mode off");
      game.emitAction("toggle_build", { on: false });
      return;
    }
    if (event.button === 0) {
      game.attemptBuild();
      game.emitAction("build_click", { x: Number(world.x.toFixed(2)), y: Number(world.y.toFixed(2)) });
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
    game.emitAction("right_click", { x: Number(world.x.toFixed(2)), y: Number(world.y.toFixed(2)) });
    return;
  }

  if (event.button === 0) {
    if (game.world.tileType(Math.floor(world.x), Math.floor(world.y)) !== "water") {
      game.setMoveTarget(world.x, world.y);
    }
    game.emitAction("left_click", { x: Number(world.x.toFixed(2)), y: Number(world.y.toFixed(2)) });
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
  game.emitAction("hotbar_scroll", { index: next, delta });
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
