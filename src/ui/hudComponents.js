import { CONFIG, BUILDINGS } from "../config.js";
import { clamp } from "../utils/math.js";
import { drawItemIcon } from "./icons.js";
import { getInventoryLayout } from "./inventoryLayout.js";
import { getHotbarLayout } from "./hotbarLayout.js";

export class StatusBars {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.ui.showStatusBars) return;
    const baseX = 18;
    const baseY = 18;
    const segmentSize = 10;
    const gap = 3;
    const bars = [
      { value: game.player.health, max: game.player.maxHealth ?? 100, color: "#b5483b" },
      { value: game.player.hunger, max: game.player.maxHunger ?? 100, color: "#d8a243" },
      { value: game.player.stamina, max: game.player.maxStamina ?? 100, color: "#3b8a8f" },
    ];
    this.ctx.save();
    bars.forEach((bar, row) => {
      const ratio = bar.max > 0 ? bar.value / bar.max : 0;
      const filled = Math.round(Math.max(0, Math.min(1, ratio)) * 10);
      for (let i = 0; i < 10; i += 1) {
        const x = baseX + i * (segmentSize + gap);
        const y = baseY + row * (segmentSize + gap + 4);
        this.ctx.fillStyle = i < filled ? bar.color : "rgba(0,0,0,0.15)";
        this.ctx.fillRect(x, y, segmentSize, segmentSize);
      }
    });
    this.ctx.restore();
  }
}

export class ProgressBar {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.ui.showProgress) return;
    const width = 120;
    const height = 10;
    const x = 18;
    const y = 64;
    const ratio = game.progression.progressRatio();
    this.ctx.save();
    this.ctx.fillStyle = "rgba(255,255,255,0.6)";
    this.ctx.fillRect(x, y, width, height);
    this.ctx.fillStyle = "rgba(47,111,79,0.85)";
    this.ctx.fillRect(x, y, width * ratio, height);
    this.ctx.strokeStyle = "rgba(0,0,0,0.25)";
    this.ctx.strokeRect(x, y, width, height);
    this.ctx.fillStyle = "rgba(15,20,23,0.8)";
    this.ctx.font = "10px 'Manrope', sans-serif";
    this.ctx.fillText(`Lvl ${game.progression.level}`, x + 4, y + 9);
    this.ctx.restore();
  }
}

export class QuestPanel {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.ui.showProgress) return;
    const quests = game.quests.getActive(3);
    if (!quests.length) return;
    const x = 18;
    const y = 82;
    const padding = 8;
    const lineHeight = 14;
    this.ctx.save();
    this.ctx.font = "11px 'Manrope', sans-serif";
    const width =
      Math.max(
        ...quests.map((quest) => this.ctx.measureText(`${quest.label} ${quest.progress}/${quest.target}`).width)
      ) + padding * 2;
    const height = quests.length * lineHeight + padding * 2 - 2;
    this.ctx.fillStyle = "rgba(255,255,255,0.65)";
    this.ctx.fillRect(x, y, width, height);
    this.ctx.strokeStyle = "rgba(0,0,0,0.18)";
    this.ctx.strokeRect(x, y, width, height);
    this.ctx.fillStyle = "rgba(15,20,23,0.75)";
    quests.forEach((quest, index) => {
      const text = `${quest.label} ${quest.progress}/${quest.target}`;
      this.ctx.fillText(text, x + padding, y + padding + index * lineHeight + 4);
    });
    this.ctx.restore();
  }
}

export class Hotbar {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.ui.showHotbar) return;
    const layout = getHotbarLayout(game);
    const { slotSize, totalSlots, startX, startY } = layout;
    this.ctx.save();
    for (let i = 0; i < totalSlots; i += 1) {
      const x = startX + i * (layout.slotSize + layout.gap);
      const active = game.ui.activeHotbarIndex === i;
      this.ctx.fillStyle = "rgba(255,255,255,0.7)";
      this.ctx.fillRect(x, startY, slotSize, slotSize);
      this.ctx.strokeStyle = active ? "rgba(47,111,79,0.9)" : "rgba(0,0,0,0.2)";
      this.ctx.lineWidth = active ? 2 : 1;
      this.ctx.strokeRect(x, startY, slotSize, slotSize);
      this.ctx.fillStyle = "rgba(15,20,23,0.75)";
      this.ctx.font = "10px 'Manrope', sans-serif";
      this.ctx.fillText(String(i + 1), x + 4, startY + 12);
      const slot = game.inventory.slots[i];
      if (slot && slot.id) {
        drawItemIcon(this.ctx, slot.id, x + 12, startY + 14, 2);
        if (slot.count > 1) {
          this.ctx.fillStyle = "rgba(15,20,23,0.75)";
          this.ctx.font = "10px 'Manrope', sans-serif";
          this.ctx.fillText(String(slot.count), x + 20, startY + 32);
        }
        if (BUILDINGS[slot.id] && game.progression.level < BUILDINGS[slot.id].unlockLevel) {
          this.ctx.fillStyle = "rgba(15,20,23,0.7)";
          this.ctx.fillRect(x + slotSize - 12, startY + 4, 8, 8);
          this.ctx.fillStyle = "rgba(255,255,255,0.9)";
          this.ctx.fillRect(x + slotSize - 10, startY + 6, 4, 4);
        }
      }
    }
    this.ctx.restore();
  }
}

export class BuildBanner {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.ui.showBuildBanner) return;
    if (!game.build.active) return;
    const blueprint = BUILDINGS[game.build.selected];
    if (!blueprint) return;
    const costText = Object.entries(blueprint.cost)
      .map(([key, value]) => `${key} ${value}`)
      .join(" · ");
    const preview = game.build.preview;
    const reason = preview && !preview.valid && preview.reason ? ` — ${preview.reason}` : "";
    const sizeText = blueprint.footprint ? `${blueprint.footprint.w}x${blueprint.footprint.h}` : "1x1";
    const rotationText = game.build.rotation ? ` rot ${game.build.rotation * 90}°` : "";
    const text = `Build: ${game.build.selected} ${sizeText}${rotationText} (${costText})${reason}`;
    this.ctx.save();
    this.ctx.font = "12px 'Manrope', sans-serif";
    const width = this.ctx.measureText(text).width + 20;
    const x = (game.view.width - width) / 2;
    const y = 24;
    this.ctx.fillStyle = "rgba(255,255,255,0.75)";
    this.ctx.fillRect(x, y - 14, width, 20);
    this.ctx.fillStyle = "rgba(15,20,23,0.8)";
    this.ctx.fillText(text, x + 10, y);
    this.ctx.restore();
  }
}

export class WorldEventPanel {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.ui.showHud) return;
    const event = game.worldEvents?.activeEvent;
    if (!event) return;
    const timer = Math.max(0, Math.ceil(game.worldEvents.timer));
    const detail = event.detail ? ` — ${event.detail}` : "";
    const text = `${event.label}${detail} (${timer}s)`;
    this.ctx.save();
    this.ctx.font = "12px 'Manrope', sans-serif";
    const width = this.ctx.measureText(text).width + 20;
    const x = (game.view.width - width) / 2;
    const y = 58;
    this.ctx.fillStyle = "rgba(30, 36, 40, 0.7)";
    this.ctx.fillRect(x, y - 14, width, 20);
    this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
    this.ctx.strokeRect(x, y - 14, width, 20);
    this.ctx.fillStyle = "rgba(255,255,255,0.85)";
    this.ctx.fillText(text, x + 10, y);
    this.ctx.restore();
  }
}

export class BuildCatalog {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.ui.showBuildCatalog || !game.build.active) {
      game.ui.buildCatalogLayout = null;
      return;
    }
    const categoryOrder = ["utility", "housing", "defense"];
    const entries = [];
    categoryOrder.forEach((category) => {
      const group = Object.entries(BUILDINGS).filter(([, def]) => def.category === category);
      if (group.length) {
        entries.push([`__${category}`, { header: true, label: category }]);
        entries.push(...group);
      }
    });
    if (!entries.length) return;
    const padding = 10;
    const lineHeight = 14;
    const x = game.view.width - 210;
    const y = game.view.height - 220;
    this.ctx.save();
    this.ctx.font = "11px 'Manrope', sans-serif";
    let buildIndex = 1;
    const lines = entries.map(([id, def]) => {
      if (def.header) {
        return {
          id,
          text: def.label.toUpperCase(),
          locked: false,
          selected: false,
          header: true,
        };
      }
      const level = def.unlockLevel ?? 1;
      const locked = game.progression.level < level;
      const cost = Object.entries(def.cost)
        .map(([key, value]) => `${key} ${value}`)
        .join(" ");
      const line = {
        id,
        text: `${buildIndex}. ${id} (${cost})${locked ? ` L${level}` : ""}`,
        locked,
        selected: game.build.selected === id,
        header: false,
      };
      buildIndex += 1;
      return line;
    });
    const header = "Build Catalog (click to select, Q rotate)";
    const width =
      Math.max(
        this.ctx.measureText(header).width,
        ...lines.map((line) => this.ctx.measureText(line.text).width)
      ) + padding * 2;
    const height = (lines.length + 1) * lineHeight + padding * 2;
    this.ctx.fillStyle = "rgba(255,255,255,0.7)";
    this.ctx.fillRect(x, y, width, height);
    this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
    this.ctx.strokeRect(x, y, width, height);
    this.ctx.fillStyle = "rgba(15,20,23,0.75)";
    this.ctx.fillText(header, x + padding, y + padding);
    game.ui.buildCatalogLayout = {
      panel: { x, y, w: width, h: height },
      lines: [],
    };
    lines.forEach((line, index) => {
      const lineY = y + padding + (index + 1) * lineHeight;
      game.ui.buildCatalogLayout.lines.push({
        id: line.id,
        header: line.header,
        locked: line.locked,
        bounds: {
          x: x + 4,
          y: lineY - 10,
          w: width - 8,
          h: lineHeight,
        },
      });
      if (line.header) {
        this.ctx.fillStyle = "rgba(15,20,23,0.55)";
        this.ctx.fillText(line.text, x + padding, lineY);
        return;
      }
      const hover =
        game.ui.pointerInCanvas &&
        game.ui.mouseX >= x + 4 &&
        game.ui.mouseX <= x + width - 4 &&
        game.ui.mouseY >= lineY - 10 &&
        game.ui.mouseY <= lineY - 10 + lineHeight;
      if (hover) {
        this.ctx.fillStyle = "rgba(47,111,79,0.15)";
        this.ctx.fillRect(x + 4, lineY - 10, width - 8, lineHeight);
      }
      if (line.selected) {
        this.ctx.fillStyle = "rgba(47,111,79,0.2)";
        this.ctx.fillRect(x + 4, lineY - 10, width - 8, lineHeight);
      }
      this.ctx.fillStyle = line.locked ? "rgba(15,20,23,0.35)" : "rgba(15,20,23,0.8)";
      this.ctx.fillText(line.text, x + padding, lineY);
    });
    this.ctx.restore();
  }
}

export class InventoryReadout {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.ui.showInventoryReadout) return;
    const capacity = `${game.inventory.count()}/${game.inventory.capacity()}`;
    const axe =
      game.gear.axe === "reinforced_axe"
        ? "Axe+"
        : game.gear.axe === "stone_axe"
          ? "Axe"
          : "None";
    const pick =
      game.gear.pick === "reinforced_pick"
        ? "Pick+"
        : game.gear.pick === "stone_pick"
          ? "Pick"
          : "None";
    const weapon =
      game.gear.weapon === "reinforced_spear"
        ? "Spear+"
        : game.gear.weapon === "stone_spear"
          ? "Spear"
          : "None";
    const armor = game.gear.armor === "hide_armor" ? "Hide" : "None";
    const storageBonus = game.structureContext.storageBonus
      ? `  |  Storage +${game.structureContext.storageBonus}`
      : "";
    const text = `Wood ${game.inventory.getCount("wood")}  |  Stone ${game.inventory.getCount("stone")}  |  Planks ${game.inventory.getCount("planks")}  |  Berries ${game.inventory.getCount("berry")}  |  Meat ${game.inventory.getCount("meat")}  |  Cooked ${game.inventory.getCount("cooked_meat")}  |  Hide ${game.inventory.getCount("hide")}  |  Carry ${capacity}${storageBonus}  |  Axe ${axe}  |  Pick ${pick}  |  Weapon ${weapon}  |  Armor ${armor}`;
    this.ctx.save();
    this.ctx.font = "12px 'Manrope', sans-serif";
    const width = this.ctx.measureText(text).width + 16;
    const x = 18;
    const y = game.view.height - 60;
    this.ctx.fillStyle = "rgba(255,255,255,0.7)";
    this.ctx.fillRect(x - 8, y - 12, width, 18);
    this.ctx.fillStyle = "rgba(15,20,23,0.75)";
    this.ctx.fillText(text, x, y);
    this.ctx.restore();
  }
}

export class Notifications {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.notifications.items.length) return;
    this.ctx.save();
    this.ctx.font = "12px 'Manrope', sans-serif";
    const baseY = game.view.height - 100;
    const entries = game.notifications.items.slice(-CONFIG.messageMax).slice().reverse();
    entries.forEach((note, index) => {
      const alpha = clamp(note.time / CONFIG.messageDuration, 0, 1);
      const text = note.text;
      const width = this.ctx.measureText(text).width + 16;
      const x = (game.view.width - width) / 2;
      const y = baseY - index * 18;
      this.ctx.fillStyle = `rgba(255,255,255,${0.3 + alpha * 0.5})`;
      this.ctx.fillRect(x, y - 12, width, 16);
      this.ctx.fillStyle = `rgba(15,20,23,${0.5 + alpha * 0.4})`;
      this.ctx.fillText(text, x + 8, y);
    });
    this.ctx.restore();
  }
}

export class ChatOverlay {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.ui.showChat) return;
    const messages = game.chat.messages.slice(-4);
    const baseX = 18;
    const baseY = game.view.height - 140;
    this.ctx.save();
    this.ctx.font = "12px 'Manrope', sans-serif";
    messages.forEach((msg, index) => {
      const text = `${msg.author}: ${msg.text}`;
      const width = this.ctx.measureText(text).width + 16;
      const y = baseY - index * 18;
      this.ctx.fillStyle = "rgba(255,255,255,0.6)";
      this.ctx.fillRect(baseX, y - 12, width, 16);
      this.ctx.fillStyle = "rgba(15,20,23,0.75)";
      this.ctx.fillText(text, baseX + 8, y);
    });
    if (game.chat.open) {
      const inputText = `> ${game.chat.input}_`;
      const width = this.ctx.measureText(inputText).width + 16;
      const y = baseY + 18;
      this.ctx.fillStyle = "rgba(255,255,255,0.75)";
      this.ctx.fillRect(baseX, y - 12, width, 16);
      this.ctx.fillStyle = "rgba(15,20,23,0.85)";
      this.ctx.fillText(inputText, baseX + 8, y);
    }
    this.ctx.restore();
  }
}

export class InventoryOverlay {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.ui.inventoryOpen) return;
    const layout = getInventoryLayout(game);
    const x = layout.panel.x;
    const y = layout.panel.y;
    const panelWidth = layout.panel.w;
    const panelHeight = layout.panel.h;
    this.ctx.save();
    this.ctx.fillStyle = "rgba(255,255,255,0.85)";
    this.ctx.fillRect(x, y, panelWidth, panelHeight);
    this.ctx.strokeStyle = "rgba(0,0,0,0.15)";
    this.ctx.strokeRect(x, y, panelWidth, panelHeight);
    this.ctx.fillStyle = "rgba(15,20,23,0.8)";
    this.ctx.font = "14px 'Manrope', sans-serif";
    this.ctx.fillText("Inventory", x + 16, y + 24);
    this.ctx.fillText("Crafting", layout.craftX, layout.craftY - 10);
    this.ctx.font = "12px 'Manrope', sans-serif";
    this.ctx.fillText("Output", layout.outputSlot.x, layout.outputSlot.y - 6);
    if (layout.hasStorage) {
      this.ctx.font = "12px 'Manrope', sans-serif";
      this.ctx.fillText("Storage", layout.storageX, layout.storageY - 10);
    }

    game.inventory.slots.forEach((slot, index) => {
      const rect = layout.slots[index];
      if (!rect) return;
      this.ctx.fillStyle = "rgba(255,255,255,0.8)";
      this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
      this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
      this.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
      if (slot.id) {
        drawItemIcon(this.ctx, slot.id, rect.x + 6, rect.y + 6, 2);
        if (slot.count > 1) {
          this.ctx.fillStyle = "rgba(15,20,23,0.75)";
          this.ctx.fillText(String(slot.count), rect.x + 18, rect.y + 28);
        }
      }
    });

    game.craftingGrid.forEach((slot, index) => {
      const rect = layout.craftSlots[index];
      if (!rect) return;
      this.ctx.fillStyle = "rgba(255,255,255,0.8)";
      this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
      this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
      this.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
      if (slot.id) {
        drawItemIcon(this.ctx, slot.id, rect.x + 6, rect.y + 6, 2);
        if (slot.count > 1) {
          this.ctx.fillStyle = "rgba(15,20,23,0.75)";
          this.ctx.fillText(String(slot.count), rect.x + 18, rect.y + 28);
        }
      }
    });

    const result = game.inventoryUI.getRecipeResult(
      game.craftingGrid,
      game.progression,
      game.structureContext
    );
    const output = result?.output ?? null;
    this.ctx.fillStyle = "rgba(255,255,255,0.8)";
    this.ctx.fillRect(layout.outputSlot.x, layout.outputSlot.y, layout.outputSlot.w, layout.outputSlot.h);
    this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
    this.ctx.strokeRect(layout.outputSlot.x, layout.outputSlot.y, layout.outputSlot.w, layout.outputSlot.h);
    if (output) {
      drawItemIcon(this.ctx, output.id, layout.outputSlot.x + 6, layout.outputSlot.y + 6, 2);
      if (output.count > 1) {
        this.ctx.fillStyle = "rgba(15,20,23,0.75)";
        this.ctx.fillText(String(output.count), layout.outputSlot.x + 18, layout.outputSlot.y + 28);
      }
      if (result?.locked) {
        this.ctx.fillStyle = "rgba(15,20,23,0.65)";
        this.ctx.fillRect(layout.outputSlot.x, layout.outputSlot.y, layout.outputSlot.w, layout.outputSlot.h);
        this.ctx.fillStyle = "rgba(255,255,255,0.9)";
        this.ctx.font = "10px 'Manrope', sans-serif";
        const label = result.structureLocked ? "Workbench" : `Lvl ${result.requiredLevel}`;
        this.ctx.fillText(label, layout.outputSlot.x + 4, layout.outputSlot.y + 20);
      }
    }
    this.ctx.font = "12px 'Manrope', sans-serif";
    this.ctx.fillStyle = "rgba(15,20,23,0.7)";
    const statsX = x + 16;
    const statsY = y + panelHeight - 62;
    const statsLine2Y = y + panelHeight - 44;
    const statsLine3Y = y + panelHeight - 26;
    this.ctx.fillText(`Wood: ${game.inventory.getCount("wood")}`, statsX, statsY);
    this.ctx.fillText(`Stone: ${game.inventory.getCount("stone")}`, statsX + 120, statsY);
    this.ctx.fillText(`Berries: ${game.inventory.getCount("berry")}`, statsX + 240, statsY);
    this.ctx.fillText(`Planks: ${game.inventory.getCount("planks")}`, statsX + 360, statsY);
    this.ctx.fillText(`Meat: ${game.inventory.getCount("meat")}`, statsX, statsLine2Y);
    this.ctx.fillText(`Hide: ${game.inventory.getCount("hide")}`, statsX + 120, statsLine2Y);
    this.ctx.fillText(`Cooked: ${game.inventory.getCount("cooked_meat")}`, statsX + 240, statsLine2Y);
    const axeLabel =
      game.gear.axe === "reinforced_axe"
        ? "Reinforced Axe"
        : game.gear.axe === "stone_axe"
          ? "Stone Axe"
          : "None";
    const pickLabel =
      game.gear.pick === "reinforced_pick"
        ? "Reinforced Pick"
        : game.gear.pick === "stone_pick"
          ? "Stone Pick"
          : "None";
    const weaponLabel =
      game.gear.weapon === "reinforced_spear"
        ? "Reinforced Spear"
        : game.gear.weapon === "stone_spear"
          ? "Stone Spear"
          : "None";
    const armorLabel = game.gear.armor === "hide_armor" ? "Hide Armor" : "None";
    this.ctx.fillText(`Axe: ${axeLabel}`, statsX, statsLine3Y);
    this.ctx.fillText(`Pick: ${pickLabel}`, statsX + 160, statsLine3Y);
    this.ctx.fillText(`Weapon: ${weaponLabel}`, statsX + 320, statsLine3Y);
    this.ctx.fillText(`Armor: ${armorLabel}`, statsX + 520, statsLine3Y);

    if (layout.hasStorage) {
      const storage = game.storage.getActiveContainer();
      if (storage) {
        storage.slots.forEach((slot, index) => {
          const rect = layout.storageSlots[index];
          if (!rect) return;
          this.ctx.fillStyle = "rgba(255,255,255,0.8)";
          this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
          this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
          this.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
          if (slot.id) {
            drawItemIcon(this.ctx, slot.id, rect.x + 6, rect.y + 6, 2);
            if (slot.count > 1) {
              this.ctx.fillStyle = "rgba(15,20,23,0.75)";
              this.ctx.fillText(String(slot.count), rect.x + 18, rect.y + 28);
            }
          }
        });
      }
    }

    const hover = this.getHoverSlot(game, layout, output);
    if (hover) {
      this.drawTooltip(hover, game.ui.mouseX, game.ui.mouseY);
    }

    if (game.ui.cursorItem) {
      drawItemIcon(this.ctx, game.ui.cursorItem.id, game.ui.mouseX - 8, game.ui.mouseY - 8, 2);
      if (game.ui.cursorItem.count > 1) {
        this.ctx.fillStyle = "rgba(15,20,23,0.75)";
        this.ctx.fillText(String(game.ui.cursorItem.count), game.ui.mouseX + 4, game.ui.mouseY + 12);
      }
    }
    this.ctx.restore();
  }

  getHoverSlot(game, layout, output) {
    const { mouseX, mouseY } = game.ui;
    const hit = (rect) =>
      rect && mouseX >= rect.x && mouseX <= rect.x + rect.w && mouseY >= rect.y && mouseY <= rect.y + rect.h;

    for (let i = 0; i < game.inventory.slots.length; i += 1) {
      const rect = layout.slots[i];
      if (!rect || !hit(rect)) continue;
      const slot = game.inventory.slots[i];
      if (!slot?.id) return null;
      return { id: slot.id, count: slot.count };
    }

    for (let i = 0; i < game.craftingGrid.length; i += 1) {
      const rect = layout.craftSlots[i];
      if (!rect || !hit(rect)) continue;
      const slot = game.craftingGrid[i];
      if (!slot?.id) return null;
      return { id: slot.id, count: slot.count };
    }

    if (hit(layout.outputSlot) && output?.id) {
      return { id: output.id, count: output.count };
    }

    if (layout.hasStorage) {
      const storage = game.storage.getActiveContainer();
      if (storage) {
        for (let i = 0; i < storage.slots.length; i += 1) {
          const rect = layout.storageSlots[i];
          if (!rect || !hit(rect)) continue;
          const slot = storage.slots[i];
          if (!slot?.id) return null;
          return { id: slot.id, count: slot.count };
        }
      }
    }
    return null;
  }

  drawTooltip(item, x, y) {
    if (!item?.id) return;
    const text = `${item.id.replace(/_/g, " ")}${item.count > 1 ? ` x${item.count}` : ""}`;
    this.ctx.save();
    this.ctx.font = "11px 'Manrope', sans-serif";
    const width = this.ctx.measureText(text).width + 12;
    const height = 18;
    const drawX = x + 14;
    const drawY = y + 14;
    this.ctx.fillStyle = "rgba(20, 26, 30, 0.8)";
    this.ctx.fillRect(drawX, drawY, width, height);
    this.ctx.strokeStyle = "rgba(255,255,255,0.15)";
    this.ctx.strokeRect(drawX, drawY, width, height);
    this.ctx.fillStyle = "rgba(255,255,255,0.85)";
    this.ctx.fillText(text, drawX + 6, drawY + 12);
    this.ctx.restore();
  }
}

export class DebugPanel {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game, debugLines) {
    if (!game.ui.showDebug || !game.debug.enabled) return;
    if (!debugLines.length) return;
    this.ctx.save();
    this.ctx.font = "11px 'Manrope', sans-serif";
    const padding = 10;
    const lineHeight = 14;
    const width = Math.max(...debugLines.map((line) => this.ctx.measureText(line).width)) + padding * 2;
    const height = debugLines.length * lineHeight + padding * 2 - 4;
    const x = game.view.width - width - 18;
    const y = 18;
    this.ctx.fillStyle = "rgba(255,255,255,0.7)";
    this.ctx.fillRect(x, y, width, height);
    this.ctx.fillStyle = "rgba(15,20,23,0.75)";
    debugLines.forEach((line, index) => {
      this.ctx.fillText(line, x + padding, y + padding + index * lineHeight);
    });
    this.ctx.restore();
  }
}
