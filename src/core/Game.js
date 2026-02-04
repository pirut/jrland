import { CONFIG, BUILDINGS, ITEMS, PROGRESSION } from "../config.js";
import { World } from "../world/World.js";
import { Player } from "../entities/Player.js";
import { Inventory } from "../systems/Inventory.js";
import { BuildSystem } from "../systems/BuildSystem.js";
import { WeatherSystem } from "../systems/WeatherSystem.js";
import { NotificationCenter } from "../systems/NotificationCenter.js";
import { ChatSystem } from "../systems/ChatSystem.js";
import { Progression } from "../systems/Progression.js";
import { QuestSystem } from "../systems/QuestSystem.js";
import { CreatureSystem } from "../systems/CreatureSystem.js";
import { WorldEventSystem } from "../systems/WorldEventSystem.js";
import { StorageSystem } from "../systems/StorageSystem.js";
import { Renderer } from "../render/Renderer.js";
import { HudRenderer } from "../render/HudRenderer.js";
import { InputController } from "../core/InputController.js";
import { clamp, lerp } from "../utils/math.js";
import { UIState } from "../ui/UIState.js";
import { InventoryUI } from "../ui/InventoryUI.js";

export class Game {
  constructor({
    ctx,
    seed,
    overlays,
    seedControls,
  }) {
    this.mode = "menu";
    this.seed = seed;
    this.view = { width: 0, height: 0 };
    this.camera = { x: 0, y: 0 };
    this.world = new World(seed);
    this.player = new Player();
    this.inventory = new Inventory();
    this.build = new BuildSystem();
    this.craftingGrid = Array.from({ length: 4 }, () => ({ id: null, count: 0 }));
    this.weather = new WeatherSystem(seed);
    this.notifications = new NotificationCenter();
    this.chat = new ChatSystem();
    this.progression = new Progression();
    this.quests = new QuestSystem();
    this.creatures = new CreatureSystem(this.world);
    this.worldEvents = new WorldEventSystem();
    this.storage = new StorageSystem();
    this.input = new InputController();
    this.renderer = new Renderer(ctx);
    this.hudRenderer = new HudRenderer(ctx);
    this.seedControls = seedControls;
    this.ui = new UIState();
    this.inventoryUI = new InventoryUI();
    this.gear = { axe: "none", pick: "none", weapon: "none", armor: "none", backpack: false };
    this.structureContext = {
      nearCampfire: false,
      nearShelter: false,
      nearWorkbench: false,
      nearStorage: false,
      underCanopy: false,
      stormDrain: 1,
      storageBonus: 0,
    };
    this.interaction = { target: null, inRange: false, dist: null };
    this.timeOfDay = 0.25;
    this.externalTime = false;
    this.isNight = this.isNightTime();
    this.isNight = false;
    this.debug = { enabled: true };
    this.lastUpdate = performance.now();
    this.overlays = overlays;
    this.seedControls = seedControls;
    this.resetWorld(seed);
  }

  setViewSize(width, height) {
    this.view.width = width;
    this.view.height = height;
  }

  resetWorld(seed) {
    this.seed = seed;
    this.world.reset(seed);
    this.weather.reset(seed);
    this.timeOfDay = 0.25;
    this.externalTime = false;
    this.lastUpdate = performance.now();
    this.inventory.reset();
    this.progression.reset();
    this.quests.reset();
    this.gear = { axe: "none", pick: "none", weapon: "none", armor: "none", backpack: false };
    this.build.reset();
    this.creatures.reset();
    this.worldEvents.reset();
    this.storage.reset();
    this.notifications.items = [];
    this.chat.messages = [];
    this.chat.input = "";
    this.chat.open = false;
    this.ui.inventoryOpen = false;
    this.ui.cursorItem = null;
    this.ui.activeHotbarIndex = 0;
    this.craftingGrid = Array.from({ length: 4 }, () => ({ id: null, count: 0 }));
    this.seedStarterItems();
    this.applyProgression();
    this.interaction = { target: null, inRange: false, dist: null };
    this.structureContext = {
      nearCampfire: false,
      nearShelter: false,
      nearWorkbench: false,
      nearStorage: false,
      underCanopy: false,
      stormDrain: 1,
      storageBonus: 0,
    };
    const spawn = this.world.findSpawn();
    this.player.reset(spawn);
    this.camera.x = spawn.x;
    this.camera.y = spawn.y;
    if (this.seedControls?.onSeedChanged) {
      this.seedControls.onSeedChanged(seed);
    }
  }

  seedStarterItems() {
    this.inventory.slots[0] = { id: "campfire", count: 1 };
  }

  hasItem(id) {
    return this.inventory.slots.some((slot) => slot.id === id);
  }

  grantBlueprint(id) {
    if (this.hasItem(id)) return;
    const slot = this.inventory.slots.find((entry) => !entry.id);
    if (slot) {
      slot.id = id;
      slot.count = 1;
    }
  }

  ensureBlueprints() {
    Object.entries(BUILDINGS).forEach(([id]) => {
      if (this.isBuildUnlocked(id)) {
        this.grantBlueprint(id);
      }
    });
  }

  isBuildUnlocked(id) {
    const def = BUILDINGS[id];
    if (!def) return false;
    const required = def.unlockLevel ?? 1;
    return this.progression.level >= required;
  }

  applyProgression() {
    if (this.player?.applyProgression) {
      this.player.applyProgression(this.progression.level);
    }
    this.ensureBlueprints();
  }

  updateCapacityBonus() {
    const backpackBonus = this.gear.backpack ? 10 : 0;
    const storageBonus = this.structureContext.storageBonus ?? 0;
    this.inventory.capacityBonus = backpackBonus + storageBonus;
  }

  isNightTime() {
    return this.timeOfDay < 0.18 || this.timeOfDay > 0.82;
  }

  screenToWorld(screenX, screenY) {
    const scale = Math.min(this.view.width / 960, this.view.height / 540);
    const tileSize = CONFIG.baseTileSize * clamp(scale, 0.8, 1.2);
    const bounds = this.renderer.getViewBounds(this, tileSize);
    return {
      x: bounds.minX + screenX / tileSize,
      y: bounds.minY + screenY / tileSize,
      tileSize,
      bounds,
    };
  }

  awardXp(amount) {
    if (!Number.isFinite(amount) || amount <= 0) return;
    const leveled = this.progression.addXp(amount);
    if (leveled) {
      this.notifications.push(`Level ${this.progression.level} reached`);
      this.applyProgression();
    }
  }

  resolveQuestCompletions() {
    this.quests.quests.forEach((quest) => {
      if (quest.completed && !quest.notified) {
        quest.notified = true;
        this.notifications.push(`Quest complete: ${quest.label}`);
        this.awardXp(quest.rewardXp);
      }
    });
  }

  selectBuild(id) {
    if (!this.isBuildUnlocked(id)) {
      const required = BUILDINGS[id]?.unlockLevel ?? 1;
      this.notifications.push(`Requires level ${required}`);
      return;
    }
    this.build.selected = id;
    const slotIndex = this.inventory.slots.findIndex((slot) => slot.id === id);
    if (slotIndex >= 0) this.ui.activeHotbarIndex = slotIndex;
    this.notifications.push(`Selected ${id}`);
  }

  setMoveTarget(worldX, worldY) {
    this.player.moveTarget = { x: worldX, y: worldY };
  }

  useActiveItem() {
    const slot = this.inventory.slots[this.ui.activeHotbarIndex];
    if (!slot || !slot.id) return;
    const item = ITEMS[slot.id];
    if (item?.edible) {
      this.player.consume(item.edible);
      slot.count -= 1;
      if (slot.count <= 0) {
        slot.id = null;
        slot.count = 0;
      }
      this.notifications.push(`Ate ${item.name}`);
    }
  }

  refreshEquipmentFromInventory() {
    const hasStoneAxe = this.inventory.slots.some((slot) => slot.id === "stone_axe");
    const hasReinforcedAxe = this.inventory.slots.some((slot) => slot.id === "reinforced_axe");
    const hasStonePick = this.inventory.slots.some((slot) => slot.id === "stone_pick");
    const hasReinforcedPick = this.inventory.slots.some((slot) => slot.id === "reinforced_pick");
    const hasStoneSpear = this.inventory.slots.some((slot) => slot.id === "stone_spear");
    const hasReinforcedSpear = this.inventory.slots.some((slot) => slot.id === "reinforced_spear");
    const hasArmor = this.inventory.slots.some((slot) => slot.id === "hide_armor");
    const hasBackpack = this.inventory.slots.some((slot) => slot.id === "backpack");
    this.gear.axe = hasReinforcedAxe ? "reinforced_axe" : hasStoneAxe ? "stone_axe" : "none";
    this.gear.pick = hasReinforcedPick ? "reinforced_pick" : hasStonePick ? "stone_pick" : "none";
    this.gear.weapon = hasReinforcedSpear ? "reinforced_spear" : hasStoneSpear ? "stone_spear" : "none";
    this.gear.armor = hasArmor ? "hide_armor" : "none";
    this.gear.backpack = hasBackpack;
    this.updateCapacityBonus();
  }

  applyDamage(amount) {
    let finalDamage = amount;
    if (this.gear.armor === "hide_armor") {
      finalDamage = amount * 0.75;
    }
    this.player.health = clamp(this.player.health - finalDamage, 0, this.player.maxHealth);
  }

  attemptAttack() {
    if (this.player.attackCooldown > 0) return;
    const hit = this.creatures.attack(this, this.gear.weapon);
    if (hit) {
      this.player.attackCooldown = 0.45;
    }
  }

  attemptAttackAt(worldX, worldY) {
    if (this.player.attackCooldown > 0) return;
    const dx = worldX - this.player.x;
    const dy = worldY - this.player.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 0.05) {
      this.player.facingX = dx / dist;
      this.player.facingY = dy / dist;
    }
    const target = this.creatures.findNearestAt(worldX, worldY, 0.8);
    const hit = this.creatures.attack(this, this.gear.weapon, target);
    if (hit) {
      this.player.attackCooldown = 0.45;
    }
  }

  syncBuildSelection() {
    const slot = this.inventory.slots[this.ui.activeHotbarIndex];
    if (slot && BUILDINGS[slot.id] && this.isBuildUnlocked(slot.id)) {
      this.build.selected = slot.id;
    }
  }

  onCraft(output) {
    const crafts = output.crafts ?? 1;
    const totalCount = output.count ?? 1;
    this.awardXp(PROGRESSION.xp.craft * crafts);
    const label = totalCount > 1 ? `Crafted ${output.id} x${totalCount}` : `Crafted ${output.id}`;
    this.notifications.push(label);
    this.quests.onCraft(output.id, totalCount);
    this.resolveQuestCompletions();
  }

  toggleOverlay(name, show) {
    const element = this.overlays[name];
    if (!element) return;
    element.classList.toggle("visible", show);
    element.setAttribute("aria-hidden", show ? "false" : "true");
  }

  startGame() {
    const seedValue = this.seedControls.sanitizeSeed();
    this.resetWorld(seedValue);
    this.mode = "playing";
    this.toggleOverlay("menu", false);
    this.toggleOverlay("pause", false);
  }

  togglePause() {
    if (this.mode === "playing") {
      this.mode = "paused";
      this.toggleOverlay("pause", true);
    } else if (this.mode === "paused") {
      this.mode = "playing";
      this.toggleOverlay("pause", false);
    }
  }

  updateInteraction() {
    const enemy = this.creatures.findNearestInRange(this.player, 1.2);
    if (enemy) {
      this.interaction.target = enemy;
      this.interaction.inRange = true;
      this.interaction.dist = Math.hypot(enemy.x - this.player.x, enemy.y - this.player.y);
      this.interaction.kind = "enemy";
      return;
    }
    const found = this.world.findNearestResource(this.player.x, this.player.y, CONFIG.gatherRange);
    if (found) {
      this.interaction.target = found.entity;
      this.interaction.inRange = true;
      this.interaction.dist = found.dist;
      this.interaction.kind = "resource";
      return;
    }
    const structure = this.world.findNearestStructure(this.player.x, this.player.y, 1.6);
    if (structure) {
      this.interaction.target = structure.structure;
      this.interaction.inRange = true;
      this.interaction.dist = structure.dist;
      this.interaction.kind = "structure";
      return;
    }
    this.interaction.target = null;
    this.interaction.inRange = false;
    this.interaction.dist = null;
    this.interaction.kind = null;
  }

  updateStructureContext() {
    const radius = 2.2;
    const structures = this.world.getStructuresInView(
      this.player.x - radius,
      this.player.y - radius,
      this.player.x + radius,
      this.player.y + radius
    );
    let nearCampfire = false;
    let nearShelter = false;
    let nearWorkbench = false;
    let nearStorage = 0;
    let underCanopy = false;
    structures.forEach((structure) => {
      const dist = Math.hypot(structure.x - this.player.x, structure.y - this.player.y);
      if (structure.type === "campfire" && dist < 1.6) nearCampfire = true;
      if (structure.type === "shelter" && dist < 1.9) nearShelter = true;
      if (structure.type === "lean_to" && dist < 1.8) nearShelter = true;
      if (structure.type === "workbench" && dist < 1.6) nearWorkbench = true;
      if (structure.type === "storage_crate" && dist < 1.7) nearStorage += 1;
      const def = BUILDINGS[structure.type];
      if (def?.canopy || def?.roof) {
        const roof = def?.roof ?? { w: structure.w ?? 1, h: structure.h ?? 1, offsetY: 0 };
        const roofCenterX = structure.x;
        const roofCenterY = structure.y + (roof.offsetY ?? 0);
        if (
          Math.abs(this.player.x - roofCenterX) <= (roof.w ?? structure.w ?? 1) / 2 &&
          Math.abs(this.player.y - roofCenterY) <= (roof.h ?? structure.h ?? 1) / 2
        ) {
          underCanopy = true;
        }
      }
    });
    this.structureContext.nearCampfire = nearCampfire;
    this.structureContext.nearShelter = nearShelter;
    this.structureContext.nearWorkbench = nearWorkbench;
    this.structureContext.nearStorage = nearStorage > 0;
    this.structureContext.underCanopy = underCanopy;
    this.structureContext.stormDrain = this.weather.type === "storm" ? 1.35 : 1;
    this.structureContext.storageBonus = Math.min(18, nearStorage * 6);
    this.updateCapacityBonus();
  }

  attemptGather() {
    if (this.player.gatherCooldown > 0) {
      this.notifications.push("Gather cooling down");
      return;
    }
    const found = this.world.findNearestResource(this.player.x, this.player.y, CONFIG.gatherRange);
    if (!found) {
      this.notifications.push("No resource in range");
      return;
    }
    let baseYield = 1;
    if (found.entity.type === "tree") {
      if (this.gear.axe === "reinforced_axe") baseYield = 3;
      if (this.gear.axe === "stone_axe") baseYield = Math.max(baseYield, 2);
    }
    if (found.entity.type === "boulder") {
      if (this.gear.pick === "reinforced_pick") baseYield = 3;
      if (this.gear.pick === "stone_pick") baseYield = Math.max(baseYield, 2);
    }
    const itemId =
      found.entity.type === "tree"
        ? "wood"
        : found.entity.type === "boulder"
          ? "stone"
          : "berry";
    const yieldAmount = itemId === "berry" ? 1 : baseYield;
    const maxStack = ITEMS[itemId]?.maxStack ?? 32;
    if (!this.inventory.canAdd(itemId, yieldAmount, maxStack)) {
      this.notifications.push("Inventory full");
      return;
    }
    found.chunk.removed.add(found.entity.id);
    if (found.entity.type === "tree") {
      this.inventory.addItem("wood", yieldAmount, maxStack);
      this.notifications.push(`Gathered wood +${yieldAmount}`);
      this.awardXp(PROGRESSION.xp.gather);
      this.quests.onGather("wood", yieldAmount);
    } else if (found.entity.type === "boulder") {
      this.inventory.addItem("stone", yieldAmount, maxStack);
      this.notifications.push(`Gathered stone +${yieldAmount}`);
      this.awardXp(PROGRESSION.xp.gather);
      this.quests.onGather("stone", yieldAmount);
    } else if (found.entity.type === "berrybush") {
      this.inventory.addItem("berry", yieldAmount, maxStack);
      this.notifications.push(`Foraged berries +${yieldAmount}`);
      this.awardXp(PROGRESSION.xp.forage);
      this.quests.onGather("berry", yieldAmount);
    }
    this.resolveQuestCompletions();
    this.player.gatherCooldown = CONFIG.gatherCooldown;
  }

  attemptInteract() {
    const found = this.world.findNearestStructure(this.player.x, this.player.y, 1.6);
    if (!found) return false;
    const { structure } = found;
    if (structure.type === "campfire") {
      if (this.inventory.getCount("meat") > 0) {
        const maxStack = ITEMS.cooked_meat?.maxStack ?? 8;
        if (this.inventory.canAdd("cooked_meat", 1, maxStack)) {
          this.inventory.removeItem("meat", 1);
          this.inventory.addItem("cooked_meat", 1, maxStack);
          this.notifications.push("Cooked meat");
          this.awardXp(PROGRESSION.xp.cook);
          this.quests.onCook("cooked_meat", 1);
          this.resolveQuestCompletions();
        } else {
          this.notifications.push("Inventory full");
        }
      } else {
        this.player.consume({ health: 12, stamina: 18, hunger: 6 });
        this.notifications.push("Warmed up at the campfire");
      }
      return true;
    }
    if (structure.type === "shelter") {
      this.player.consume({ stamina: 30, hunger: 4 });
      this.notifications.push("Rested in the shelter");
      return true;
    }
    if (structure.type === "lean_to") {
      this.player.consume({ stamina: 18, hunger: 2 });
      this.notifications.push("Rested under the lean-to");
      return true;
    }
    if (structure.type === "workbench") {
      this.storage.close();
      this.ui.inventoryOpen = true;
      this.mode = "inventory";
      this.notifications.push("Workbench ready");
      return true;
    }
    if (structure.type === "storage_crate") {
      this.storage.open(structure.id);
      this.ui.inventoryOpen = true;
      this.mode = "inventory";
      this.notifications.push("Storage opened");
      return true;
    }
    if (structure.type === "wood_gate") {
      structure.open = !structure.open;
      this.notifications.push(structure.open ? "Gate opened" : "Gate closed");
      return true;
    }
    if (structure.type === "hut") {
      this.player.consume({ health: 20, stamina: 40, hunger: 8 });
      this.timeOfDay = 0.25;
      this.notifications.push("Slept until morning");
      return true;
    }
    return false;
  }

  attemptBuild() {
    if (!this.build.active) {
      if (!this.attemptInteract()) {
        this.attemptGather();
      }
      return;
    }
    const preview = this.build.preview;
    if (!preview || !preview.valid) {
      this.notifications.push(preview?.reason || "Can't build here");
      return;
    }
    const blueprint = BUILDINGS[this.build.selected];
    if (!blueprint) {
      this.notifications.push("No blueprint selected");
      return;
    }
    if (!this.isBuildUnlocked(this.build.selected)) {
      this.notifications.push(`Requires level ${blueprint.unlockLevel}`);
      return;
    }
    if (!this.inventory.canAfford(blueprint.cost)) {
      this.notifications.push("Need more resources");
      return;
    }
    this.inventory.spend(blueprint.cost);
    this.world.addStructure(
      this.build.selected,
      preview.originX,
      preview.originY,
      preview.w,
      preview.h,
      preview.rotation ?? 0
    );
    this.notifications.push(`Built ${this.build.selected}`);
    this.awardXp(PROGRESSION.xp.build);
    this.quests.onBuild(this.build.selected);
    this.resolveQuestCompletions();
  }

  update(dt) {
    if (this.mode !== "playing") return;
    this.player.updateCooldown(dt);
    this.refreshEquipmentFromInventory();
    this.syncBuildSelection();
    this.updateStructureContext();
    this.player.updateMovement(dt, this.input, this.world, this.structureContext, this.weather.type);
    this.updateStructureContext();
    this.player.updateNeeds(dt, this.structureContext);
    this.updateInteraction();
    const blueprint = BUILDINGS[this.build.selected];
    const unlocked = this.isBuildUnlocked(this.build.selected);
    const requiredLevel = blueprint?.unlockLevel ?? 1;
    const pointer = this.ui.pointerInCanvas
      ? { x: this.ui.mouseWorldX, y: this.ui.mouseWorldY }
      : null;
    this.build.updatePreview(this.player, this.world, blueprint, unlocked, requiredLevel, pointer);
    this.weather.update(dt);
    this.notifications.update(dt);
    const wasNight = this.isNight;
    this.timeOfDay = (this.timeOfDay + dt / 240) % 1;
    this.isNight = this.isNightTime();
    if (wasNight !== this.isNight) {
      this.notifications.push(this.isNight ? "Night falls" : "Daybreak");
    }
    this.worldEvents.update(this, dt);
    if (this.input.wasPressed("e")) this.attemptBuild();
    if (this.input.wasPressed(" ") || this.input.wasPressed("space")) this.attemptAttack();
    if (this.input.wasPressed("r")) this.useActiveItem();
    this.input.clearPressed();
    const smooth = 1 - Math.pow(0.001, dt * 4.5);
    this.camera.x = lerp(this.camera.x, this.player.x, smooth);
    this.camera.y = lerp(this.camera.y, this.player.y, smooth);
    const scale = Math.min(this.view.width / 960, this.view.height / 540);
    const tileSize = CONFIG.baseTileSize * clamp(scale, 0.8, 1.2);
    const bounds = this.renderer.getViewBounds(this, tileSize);
    this.creatures.update(this, dt, bounds);
  }

  render() {
    this.refreshEquipmentFromInventory();
    const renderMeta = this.renderer.render(this);
    const debugLines = this.renderer.getDebugLines(this);
    if (this.ui.showHud) {
      this.hudRenderer.draw(this, debugLines);
    }
    return renderMeta;
  }

  advanceTime(ms) {
    this.externalTime = true;
    const steps = Math.max(1, Math.round(ms / (1000 / 60)));
    const dt = 1 / 60;
    for (let i = 0; i < steps; i += 1) {
      this.update(dt);
    }
    this.render();
  }

  renderToText() {
    const scale = Math.min(this.view.width / 960, this.view.height / 540);
    const tileSize = CONFIG.baseTileSize * clamp(scale, 0.8, 1.2);
    const bounds = this.renderer.getViewBounds(this, tileSize);
    const chunks = this.world.getChunksInView(bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
    const resources = [];
    for (const chunk of chunks) {
      for (const entity of chunk.entities) {
        if (chunk.removed.has(entity.id)) continue;
        if (
          entity.x < bounds.minX ||
          entity.x > bounds.maxX ||
          entity.y < bounds.minY ||
          entity.y > bounds.maxY
        ) {
          continue;
        }
        resources.push({
          type: entity.type,
          x: Number(entity.x.toFixed(2)),
          y: Number(entity.y.toFixed(2)),
        });
      }
    }
    const structures = this.world.getStructuresInView(bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
    const creatures = this.creatures?.getActiveCreatures?.() ?? [];
    const biome = this.world.getBiome(Math.floor(this.player.x), Math.floor(this.player.y));
    const biomeBandName = this.world.biomeBand(Math.floor(this.player.x), Math.floor(this.player.y));
    const payload = {
      mode: this.mode,
      seed: this.seed,
      coord: "Origin (0,0) near initial spawn. +x east, +y south. Units = tiles.",
      timeOfDay: Number(this.timeOfDay.toFixed(3)),
      isNight: this.isNight,
      biome,
      biomeBand: biomeBandName,
      weather: {
        type: this.weather.type,
        timeLeft: Number(this.weather.timer.toFixed(1)),
      },
      worldEvent: this.worldEvents?.activeEvent
        ? {
            id: this.worldEvents.activeEvent.id,
            label: this.worldEvents.activeEvent.label,
            detail: this.worldEvents.activeEvent.detail ?? "",
            timeLeft: Number(this.worldEvents.timer.toFixed(1)),
          }
        : null,
      player: {
        x: Number(this.player.x.toFixed(2)),
        y: Number(this.player.y.toFixed(2)),
        vx: Number(this.player.vx.toFixed(2)),
        vy: Number(this.player.vy.toFixed(2)),
        moveTarget: this.player.moveTarget
          ? {
              x: Number(this.player.moveTarget.x.toFixed(2)),
              y: Number(this.player.moveTarget.y.toFixed(2)),
            }
          : null,
        hunger: Number(this.player.hunger.toFixed(1)),
        health: Number(this.player.health.toFixed(1)),
        stamina: Number(this.player.stamina.toFixed(1)),
        maxHunger: Number(this.player.maxHunger.toFixed(1)),
        maxHealth: Number(this.player.maxHealth.toFixed(1)),
        maxStamina: Number(this.player.maxStamina.toFixed(1)),
        gatherCooldown: Number(this.player.gatherCooldown.toFixed(2)),
      },
      inventory: {
        wood: this.inventory.getCount("wood"),
        stone: this.inventory.getCount("stone"),
        berries: this.inventory.getCount("berry"),
        planks: this.inventory.getCount("planks"),
        meat: this.inventory.getCount("meat"),
        cookedMeat: this.inventory.getCount("cooked_meat"),
        hide: this.inventory.getCount("hide"),
        capacity: this.inventory.capacity(),
        used: this.inventory.count(),
      },
      storage: this.storage.isOpen()
        ? {
            activeId: this.storage.activeId,
            slots: this.storage.getActiveContainer()?.slots.map((slot) => ({ ...slot })) ?? [],
          }
        : null,
      progression: {
        level: this.progression.level,
        xp: this.progression.xp,
        xpToNext: this.progression.xpToNext,
      },
      gear: { ...this.gear },
      structureContext: { ...this.structureContext },
      view: {
        camera: {
          x: Number(this.camera.x.toFixed(2)),
          y: Number(this.camera.y.toFixed(2)),
        },
        bounds: {
          minX: Number(bounds.minX.toFixed(2)),
          maxX: Number(bounds.maxX.toFixed(2)),
          minY: Number(bounds.minY.toFixed(2)),
          maxY: Number(bounds.maxY.toFixed(2)),
        },
      },
      resources: resources.slice(0, 60),
      creatures: creatures.slice(0, 20).map((creature) => ({
        type: creature.type,
        x: Number(creature.x.toFixed(2)),
        y: Number(creature.y.toFixed(2)),
        health: Number(creature.health.toFixed(1)),
        state: creature.state,
        hunger: Number(creature.needs?.hunger?.toFixed?.(1) ?? 0),
        thirst: Number(creature.needs?.thirst?.toFixed?.(1) ?? 0),
        energy: Number(creature.needs?.energy?.toFixed?.(1) ?? 0),
      })),
      structures: structures.slice(0, 40).map((structure) => ({
        type: structure.type,
        x: Number(structure.x.toFixed(2)),
        y: Number(structure.y.toFixed(2)),
        originX: Number((structure.originX ?? structure.x - 0.5).toFixed(2)),
        originY: Number((structure.originY ?? structure.y - 0.5).toFixed(2)),
        w: structure.w ?? 1,
        h: structure.h ?? 1,
        rotation: structure.rotation ?? 0,
        open: Boolean(structure.open),
      })),
      interaction: this.interaction.target
        ? {
            type: this.interaction.target.type,
            x: Number(this.interaction.target.x.toFixed(2)),
            y: Number(this.interaction.target.y.toFixed(2)),
            inRange: this.interaction.inRange,
            dist: Number((this.interaction.dist ?? 0).toFixed(2)),
            kind: this.interaction.kind,
          }
        : null,
      build: {
        active: this.build.active,
        selected: this.build.selected,
        preview: this.build.preview
          ? {
              x: Number(this.build.preview.x.toFixed(2)),
              y: Number(this.build.preview.y.toFixed(2)),
              originX: Number(this.build.preview.originX.toFixed(2)),
              originY: Number(this.build.preview.originY.toFixed(2)),
              w: this.build.preview.w,
              h: this.build.preview.h,
              rotation: this.build.preview.rotation ?? 0,
              valid: this.build.preview.valid,
              reason: this.build.preview.reason,
            }
          : null,
      },
      notifications: this.notifications.items.map((note) => note.text),
      quests: this.quests.getActive(3).map((quest) => ({
        id: quest.id,
        label: quest.label,
        progress: quest.progress,
        target: quest.target,
      })),
      debug: this.debug.enabled,
      ui: { ...this.ui },
      chat: {
        open: this.chat.open,
        input: this.chat.input,
        messages: this.chat.messages.slice(-5),
      },
      craftingGrid: this.craftingGrid.map((slot) => ({ ...slot })),
      slots: this.inventory.slots.map((slot) => ({ ...slot })),
    };
    return JSON.stringify(payload);
  }
}
