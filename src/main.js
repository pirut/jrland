import { Game } from "./core/Game.js";
import { CONFIG } from "./config.js";
import { getHotbarLayout } from "./ui/hotbarLayout.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const menuOverlay = document.getElementById("menu");
const pauseOverlay = document.getElementById("pause");
const startBtn = document.getElementById("start-btn");
const resumeBtn = document.getElementById("resume-btn");
const optionInputs = Array.from(document.querySelectorAll("[data-ui]"));
const DEFAULT_SEED = 1337;

async function bootstrap() {
  const game = new Game({
    ctx,
    seed: DEFAULT_SEED,
    overlays: { menu: menuOverlay, pause: pauseOverlay },
  });

  let rightMouseDown = false;

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
      canvas.requestFullscreen?.();
      return;
    }
    document.exitFullscreen();
  }

  function getPointerCoords(event) {
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * game.view.width;
    const y = ((event.clientY - rect.top) / rect.height) * game.view.height;
    return { x, y };
  }

  function updatePointer(event) {
    const { x, y } = getPointerCoords(event);
    game.ui.mouseX = x;
    game.ui.mouseY = y;
    const world = game.screenToWorld(x, y);
    game.ui.mouseWorldX = world.x;
    game.ui.mouseWorldY = world.y;
    const dx = world.x - game.player.x;
    const dy = world.y - game.player.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 0.01) {
      game.player.facingX = dx / dist;
      game.player.facingY = dy / dist;
    }
    return world;
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

  function adjustBuildLevel(delta, source = "key") {
    if (!game.build.active || game.mode !== "playing") return;
    const before = game.build.level;
    if (delta > 0) {
      game.build.raiseLevel();
    } else if (delta < 0) {
      game.build.lowerLevel();
    }
    if (game.build.level !== before) {
      const floorLabel = game.build.level + 1;
      game.notifications.push(`Build floor ${floorLabel}`);
      game.emitAction("build_level", { level: game.build.level, source });
    }
  }

  syncOptions();

  startBtn?.addEventListener("click", () => game.startGame());
  startBtn?.addEventListener("pointerdown", () => game.startGame());
  resumeBtn?.addEventListener("click", () => game.togglePause());
  window.startGame = () => game.startGame();

  window.addEventListener("keydown", (event) => {
    const target = event.target;
    if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) {
      return;
    }

    const key = event.key.toLowerCase();

    if (game.ui.inventoryOpen) {
      if (event.key === "Escape" || key === "i") {
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

    if (key === "c" && !game.input.isDown("c") && game.mode === "playing") {
      game.ui.inventoryOpen = true;
      game.mode = "inventory";
      game.emitAction("toggle_inventory", { open: true, source: "craft" });
      return;
    }

    if (key === "b" && !game.input.isDown("b") && game.mode === "playing") {
      game.build.active = !game.build.active;
      game.notifications.push(game.build.active ? "Build mode on" : "Build mode off");
      game.emitAction("toggle_build", { on: game.build.active });
      return;
    }

    if (key === "q" && game.mode === "playing" && game.build.active) {
      game.build.rotate();
      game.notifications.push("Rotated blueprint");
      game.emitAction("rotate_build", { rotation: game.build.rotation ?? 0 });
      return;
    }

    if ((key === "z" || key === "pagedown" || key === "[") && game.mode === "playing") {
      adjustBuildLevel(-1, "key");
      return;
    }

    if ((key === "x" || key === "pageup" || key === "]") && game.mode === "playing") {
      adjustBuildLevel(1, "key");
      return;
    }

    if (/^[1-9]$/.test(key) && game.mode === "playing") {
      game.ui.activeHotbarIndex = Number(key) - 1;
      game.syncBuildSelection();
      return;
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
    rightMouseDown = false;
  });

  canvas.addEventListener("mousemove", (event) => {
    const world = updatePointer(event);
    if (game.mode === "playing") {
      game.emitAction("pointer_move", {
        x: Number(world.x.toFixed(2)),
        y: Number(world.y.toFixed(2)),
      });
    }
    if (
      rightMouseDown &&
      game.mode === "playing" &&
      !game.ui.inventoryOpen &&
      !game.build.active &&
      game.world.tileType(Math.floor(world.x), Math.floor(world.y)) !== "water"
    ) {
      game.setMoveTarget(world.x, world.y);
    }
  });

  canvas.addEventListener("mousedown", (event) => {
    const world = updatePointer(event);

    if (game.ui.inventoryOpen) {
      game.inventoryUI.handleClick(game, game.ui.mouseX, game.ui.mouseY, event.button, {
        shiftKey: event.shiftKey,
      });
      game.emitAction("ui_click", {
        button: event.button,
        x: Number(game.ui.mouseX.toFixed(1)),
        y: Number(game.ui.mouseY.toFixed(1)),
        shift: event.shiftKey,
      });
      return;
    }

    if (game.mode !== "playing") return;

    if (game.build.active && handleBuildCatalogClick(game.ui.mouseX, game.ui.mouseY)) {
      game.emitAction("build_catalog_click", {
        x: Number(game.ui.mouseX.toFixed(1)),
        y: Number(game.ui.mouseY.toFixed(1)),
      });
      return;
    }

    if (handleHotbarClick(game.ui.mouseX, game.ui.mouseY)) {
      game.emitAction("hotbar_click", {
        x: Number(game.ui.mouseX.toFixed(1)),
        y: Number(game.ui.mouseY.toFixed(1)),
      });
      return;
    }

    if (event.button === 2) {
      rightMouseDown = true;
      if (!game.build.active && game.world.tileType(Math.floor(world.x), Math.floor(world.y)) !== "water") {
        game.setMoveTarget(world.x, world.y);
      }
      game.emitAction("right_click", { x: Number(world.x.toFixed(2)), y: Number(world.y.toFixed(2)) });
      return;
    }

    if (event.button !== 0) return;

    if (game.build.active) {
      game.attemptBuild();
      game.emitAction("build_click", {
        x: Number(world.x.toFixed(2)),
        y: Number(world.y.toFixed(2)),
        level: game.build.level ?? 0,
      });
      return;
    }

    const target = game.creatures.findNearestAt(world.x, world.y, 0.95);
    if (target) {
      game.attemptAttackAt(target.x, target.y);
    } else if (game.interaction.kind === "enemy") {
      game.attemptAttackAt(world.x, world.y);
    } else if (!game.attemptInteract()) {
      game.attemptGather();
    }
    game.emitAction("left_click", { x: Number(world.x.toFixed(2)), y: Number(world.y.toFixed(2)) });
  });

  window.addEventListener("mouseup", (event) => {
    if (event.button === 2) {
      rightMouseDown = false;
    }
  });

  window.addEventListener("blur", () => {
    rightMouseDown = false;
  });

  canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  canvas.addEventListener("wheel", (event) => {
    if (game.mode !== "playing" || game.ui.inventoryOpen) return;
    const delta = Math.sign(event.deltaY);
    if (delta === 0) return;
    if (game.build.active && (event.altKey || event.ctrlKey || event.metaKey)) {
      adjustBuildLevel(delta > 0 ? -1 : 1, "wheel");
      event.preventDefault();
      return;
    }
    const next = (game.ui.activeHotbarIndex + delta + 9) % 9;
    game.ui.activeHotbarIndex = next;
    game.syncBuildSelection();
    game.emitAction("hotbar_scroll", { index: next, delta });
    event.preventDefault();
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
}

bootstrap().catch((error) => {
  console.error(error);
});
