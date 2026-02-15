import { CONFIG, BUILDINGS } from "../config.js";
import { clamp } from "../utils/math.js";
import { drawItemIcon } from "./icons.js";
import { getInventoryLayout } from "./inventoryLayout.js";
import { getHotbarLayout } from "./hotbarLayout.js";
import { getInventoryTabModel } from "./inventoryTabs.js";

export class StatusBars {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.ui.showStatusBars) return;
    const baseX = 18;
    const baseY = game.view.height - 230;
    const barWidth = 120;
    const barHeight = 10;
    const rowHeight = 22;
    const bars = [
      { key: "health", label: "Health", value: game.player.health, max: game.player.maxHealth ?? 100, color: "#b5483b" },
      { key: "hunger", label: "Hunger", value: game.player.hunger, max: game.player.maxHunger ?? 100, color: "#d8a243" },
    ];
    this.ctx.save();
    bars.forEach((bar, row) => {
      const ratio = bar.max > 0 ? clamp(bar.value / bar.max, 0, 1) : 0;
      const y = baseY + row * rowHeight;
      this.drawStatusIcon(baseX, y + 2, bar.key, bar.color);
      const barX = baseX + 18;
      this.ctx.fillStyle = "rgba(255,255,255,0.7)";
      this.ctx.fillRect(barX, y + 4, barWidth, barHeight);
      this.ctx.fillStyle = bar.color;
      this.ctx.fillRect(barX, y + 4, barWidth * ratio, barHeight);
      this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
      this.ctx.strokeRect(barX, y + 4, barWidth, barHeight);
      this.ctx.fillStyle = "rgba(15,20,23,0.7)";
      this.ctx.font = "10px 'Manrope', sans-serif";
      this.ctx.fillText(bar.label, barX, y);
      this.ctx.fillText(`${Math.round(bar.value)}/${Math.round(bar.max)}`, barX + barWidth - 44, y + 2);
    });
    this.ctx.restore();
  }

  drawStatusIcon(x, y, key, color) {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(255,255,255,0.85)";
    this.ctx.beginPath();
    this.ctx.arc(x + 6, y + 6, 7, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.fillStyle = color;
    if (key === "health") {
      this.ctx.beginPath();
      this.ctx.arc(x + 4, y + 6, 3, 0, Math.PI * 2);
      this.ctx.arc(x + 8, y + 6, 3, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.fillRect(x + 4, y + 6, 4, 5);
    } else if (key === "hunger") {
      this.ctx.fillRect(x + 5, y + 4, 2, 8);
      this.ctx.fillRect(x + 3, y + 8, 6, 2);
    } else if (key === "stamina") {
      this.ctx.beginPath();
      this.ctx.moveTo(x + 5, y + 3);
      this.ctx.lineTo(x + 9, y + 6);
      this.ctx.lineTo(x + 6, y + 10);
      this.ctx.lineTo(x + 10, y + 10);
      this.ctx.lineTo(x + 4, y + 15);
      this.ctx.lineTo(x + 7, y + 11);
      this.ctx.lineTo(x + 3, y + 11);
      this.ctx.closePath();
      this.ctx.fill();
    }
    this.ctx.restore();
  }
}

export class StaminaBar {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.ui.showStatusBars) return;
    const ratio =
      game.player.maxStamina > 0 ? clamp(game.player.stamina / game.player.maxStamina, 0, 1) : 0;
    if (ratio > 0.98) return;
    const width = 220;
    const height = 10;
    const x = (game.view.width - width) / 2;
    const y = game.view.height - 110;
    this.ctx.save();
    this.ctx.fillStyle = "rgba(255,255,255,0.6)";
    this.ctx.fillRect(x, y, width, height);
    this.ctx.fillStyle = "rgba(64, 130, 140, 0.9)";
    this.ctx.fillRect(x, y, width * ratio, height);
    this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
    this.ctx.strokeRect(x, y, width, height);
    this.ctx.fillStyle = "rgba(15,20,23,0.7)";
    this.ctx.font = "10px 'Manrope', sans-serif";
    this.ctx.fillText("Stamina", x + 4, y - 2);
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
    if (game.ui.inventoryOpen) return;
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
    const floorText = `Floor ${game.build.level + 1}`;
    const rotationText = game.build.rotation ? ` rot ${game.build.rotation * 90}°` : "";
    const text = `Build: ${game.build.selected} ${sizeText} · ${floorText}${rotationText} (${costText})${reason}`;
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

export class BuildPlanner {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.build.active) return;
    const blueprint = BUILDINGS[game.build.selected];
    if (!blueprint) return;
    const panelWidth = 220;
    const panelHeight = 96;
    let x = game.view.width - panelWidth - 18;
    let y = game.view.height - panelHeight - 260;
    const catalog = game.ui.buildCatalogLayout?.panel;
    if (catalog) {
      y = catalog.y - panelHeight - 12;
    }
    if (y < 80) {
      y = 80;
    }
    const costText = Object.entries(blueprint.cost)
      .map(([key, value]) => `${key} ${value}`)
      .join(" · ");
    const sizeText = blueprint.footprint ? `${blueprint.footprint.w}x${blueprint.footprint.h}` : "1x1";
    const levelText = blueprint.unlockLevel ? `Lvl ${blueprint.unlockLevel}` : "Lvl 1";
    const floorText = `Floor ${game.build.level + 1}`;
    this.ctx.save();
    this.ctx.fillStyle = "rgba(255,255,255,0.78)";
    this.ctx.fillRect(x, y, panelWidth, panelHeight);
    this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
    this.ctx.strokeRect(x, y, panelWidth, panelHeight);
    drawItemIcon(this.ctx, game.build.selected, x + 12, y + 12, 2);
    this.ctx.fillStyle = "rgba(15,20,23,0.85)";
    this.ctx.font = "12px 'Manrope', sans-serif";
    this.ctx.fillText(`Selected: ${game.build.selected}`, x + 44, y + 20);
    this.ctx.font = "11px 'Manrope', sans-serif";
    this.ctx.fillStyle = "rgba(15,20,23,0.65)";
    this.ctx.fillText(`${sizeText} · ${levelText} · ${floorText}`, x + 44, y + 36);
    this.ctx.fillText(costText, x + 12, y + 58);
    this.ctx.fillStyle = "rgba(15,20,23,0.5)";
    this.ctx.fillText("LMB place · RMB move", x + 12, y + 78);
    this.ctx.fillText("Z/X or Alt+Wheel: floor", x + 114, y + 78);
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
    const lineHeight = 18;
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
    const header = "Build Catalog (click select, Q rotate, Z/X floor)";
    const width =
      Math.max(
        this.ctx.measureText(header).width,
        ...lines.map((line) => this.ctx.measureText(line.text).width + (line.header ? 0 : 18))
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
      drawItemIcon(this.ctx, line.id, x + padding, lineY - 12, 2);
      this.ctx.fillStyle = line.locked ? "rgba(15,20,23,0.35)" : "rgba(15,20,23,0.8)";
      this.ctx.fillText(line.text, x + padding + 18, lineY);
      if (hover) {
        const def = BUILDINGS[line.id];
        if (def) {
          const sizeText = def.footprint ? `${def.footprint.w}x${def.footprint.h}` : "1x1";
          const cost = Object.entries(def.cost)
            .map(([key, value]) => `${key} ${value}`)
            .join(" · ");
          const level = def.unlockLevel ?? 1;
          const lines = [
            line.id.replace(/_/g, " "),
            `Size ${sizeText} · L${level}`,
            `Cost ${cost}`,
          ];
          this.drawCatalogTooltip(lines, game.ui.mouseX, game.ui.mouseY, game.view.width, game.view.height);
        }
      }
    });
    this.ctx.restore();
  }

  drawCatalogTooltip(lines, x, y, viewW, viewH) {
    this.ctx.save();
    this.ctx.font = "11px 'Manrope', sans-serif";
    const padding = 8;
    const lineHeight = 14;
    const width = Math.max(...lines.map((line) => this.ctx.measureText(line).width)) + padding * 2;
    const height = lines.length * lineHeight + padding * 2 - 2;
    let drawX = x + 14;
    let drawY = y + 14;
    if (drawX + width > viewW - 8) drawX = x - width - 14;
    if (drawY + height > viewH - 8) drawY = y - height - 14;
    this.ctx.fillStyle = "rgba(20, 26, 30, 0.85)";
    this.ctx.fillRect(drawX, drawY, width, height);
    this.ctx.strokeStyle = "rgba(255,255,255,0.15)";
    this.ctx.strokeRect(drawX, drawY, width, height);
    this.ctx.fillStyle = "rgba(255,255,255,0.9)";
    lines.forEach((line, idx) => {
      this.ctx.fillText(line, drawX + padding, drawY + padding + idx * lineHeight + 2);
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
    if (game.ui.inventoryOpen) return;
    const resources = [
      { id: "wood", label: "Wood" },
      { id: "stone", label: "Stone" },
      { id: "planks", label: "Planks" },
      { id: "berry", label: "Berries" },
      { id: "meat", label: "Meat" },
      { id: "cooked_meat", label: "Cooked" },
      { id: "hide", label: "Hide" },
    ];
    const x = 18;
    const y = game.view.height - 160;
    const cellW = 56;
    const padding = 10;
    const width = resources.length * cellW + padding * 2;
    const height = 48;
    this.ctx.save();
    this.ctx.fillStyle = "rgba(255,255,255,0.78)";
    this.ctx.fillRect(x, y, width, height);
    this.ctx.strokeStyle = "rgba(0,0,0,0.18)";
    this.ctx.strokeRect(x, y, width, height);
    this.ctx.font = "10px 'Manrope', sans-serif";
    resources.forEach((item, index) => {
      const cellX = x + padding + index * cellW;
      drawItemIcon(this.ctx, item.id, cellX, y + 10, 2);
      this.ctx.fillStyle = "rgba(15,20,23,0.7)";
      this.ctx.fillText(String(game.inventory.getCount(item.id)), cellX + 20, y + 24);
      this.ctx.fillStyle = "rgba(15,20,23,0.45)";
      this.ctx.fillText(item.label, cellX, y + 38);
    });
    const capacity = `${game.inventory.count()}/${game.inventory.capacity()}`;
    const equipX = x;
    const equipY = y + height + 6;
    const equipW = width;
    const equipH = 26;
    this.ctx.fillStyle = "rgba(255,255,255,0.7)";
    this.ctx.fillRect(equipX, equipY, equipW, equipH);
    this.ctx.strokeStyle = "rgba(0,0,0,0.16)";
    this.ctx.strokeRect(equipX, equipY, equipW, equipH);
    this.ctx.fillStyle = "rgba(15,20,23,0.7)";
    this.ctx.font = "11px 'Manrope', sans-serif";
    this.ctx.fillText(`Carry ${capacity}`, equipX + 10, equipY + 17);
    const gear = [
      { id: game.gear.axe !== "none" ? game.gear.axe : null, label: "Axe" },
      { id: game.gear.pick !== "none" ? game.gear.pick : null, label: "Pick" },
      { id: game.gear.weapon !== "none" ? game.gear.weapon : null, label: "Weapon" },
      { id: game.gear.armor !== "none" ? game.gear.armor : null, label: "Armor" },
    ];
    gear.forEach((slot, idx) => {
      const gx = equipX + 120 + idx * 68;
      if (slot.id) {
        drawItemIcon(this.ctx, slot.id, gx, equipY + 5, 2);
      } else {
        this.ctx.fillStyle = "rgba(15,20,23,0.15)";
        this.ctx.fillRect(gx + 2, equipY + 6, 12, 12);
      }
      this.ctx.fillStyle = "rgba(15,20,23,0.6)";
      this.ctx.fillText(slot.label, gx + 18, equipY + 16);
    });
    this.ctx.restore();
  }
}

export class Notifications {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (game.ui.inventoryOpen) return;
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
    if (game.ui.inventoryOpen) return;
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
    const tabModel = getInventoryTabModel(game, layout);
    game.ui.inventoryTabLayout = tabModel.tabs;
    const x = layout.panel.x;
    const y = layout.panel.y;
    const panelWidth = layout.panel.w;
    const panelHeight = layout.panel.h;
    this.ctx.save();
    this.ctx.fillStyle = "rgba(10, 16, 20, 0.42)";
    this.ctx.fillRect(0, 0, game.view.width, game.view.height);

    this.ctx.fillStyle = "rgba(245, 248, 244, 0.97)";
    this.ctx.fillRect(x, y, panelWidth, panelHeight);
    this.ctx.strokeStyle = "rgba(34, 48, 40, 0.28)";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, panelWidth, panelHeight);

    this.ctx.fillStyle = "rgba(228, 236, 228, 0.92)";
    this.ctx.fillRect(x + 1, y + 1, panelWidth - 2, layout.headerHeight - 10);
    this.ctx.fillStyle = "rgba(18, 28, 22, 0.9)";
    this.ctx.font = "700 18px 'Manrope', sans-serif";
    this.ctx.fillText("Inventory", x + 16, layout.headerY + 18);
    this.ctx.font = "12px 'Manrope', sans-serif";
    this.ctx.fillStyle = "rgba(26, 36, 30, 0.7)";
    this.ctx.fillText("Clean tabs, clear stacks, and fast crafting", x + 130, layout.headerY + 17);
    this.drawInventoryTabs(tabModel.tabs);

    const firstBackpack = layout.backpackRects[0];
    const topRightBackpack = layout.backpackRects[8];
    const bottomBackpack = layout.backpackRects[layout.backpackRects.length - 1];
    const gridW = topRightBackpack.x + topRightBackpack.w - firstBackpack.x;
    const gridH = bottomBackpack.y + bottomBackpack.h - firstBackpack.y;
    this.drawSectionCard(layout.gridX - 12, layout.gridY - 14, gridW + 24, gridH + 28, "Backpack");
    this.drawSectionCard(layout.gridX - 12, layout.hotbarY - 14, gridW + 24, layout.slotSize + 28, "Hotbar");

    const craftW = 2 * (layout.slotSize + layout.gap) - layout.gap;
    const craftH = 2 * (layout.slotSize + layout.gap) - layout.gap;
    this.drawSectionCard(layout.craftX - 10, layout.craftY - 14, craftW + 20, craftH + 28, "Craft Grid");
    this.drawSectionCard(
      layout.outputSlot.x - 10,
      layout.outputSlot.y - 34,
      layout.outputSlot.w + 20,
      layout.outputSlot.h + 54,
      "Output"
    );

    if (layout.hasStorage) {
      const storageW = 4 * (layout.slotSize + layout.gap) - layout.gap;
      const storageH = 3 * (layout.slotSize + layout.gap) - layout.gap;
      this.drawSectionCard(layout.storageX - 10, layout.storageY - 14, storageW + 20, storageH + 28, "Storage");
    }

    const statsX = layout.statsX - 10;
    const statsY = layout.statsY - 14;
    const statsW = layout.hasStorage ? layout.storageX - statsX - 18 : x + panelWidth - statsX - 14;
    const statsH = y + panelHeight - statsY - 14;
    this.drawSectionCard(statsX, statsY, statsW, statsH, "At a Glance");

    this.ctx.font = "12px 'Manrope', sans-serif";
    tabModel.backpackSlots.forEach((entry) => {
      if (!entry.rect) return;
      this.drawSlot(entry.rect, entry.slot, false, entry.dimmed);
    });

    layout.hotbarRects.forEach((rect, index) => {
      if (!rect) return;
      this.drawSlot(rect, game.inventory.slots[index], game.ui.activeHotbarIndex === index, false);
    });

    game.craftingGrid.forEach((slot, index) => {
      const rect = layout.craftSlots[index];
      if (!rect) return;
      this.drawSlot(rect, slot, false);
    });

    const result = game.inventoryUI.getRecipeResult(
      game.craftingGrid,
      game.progression,
      game.structureContext
    );
    const output = result?.output ?? null;
    this.drawSlot(layout.outputSlot, output ? { ...output } : { id: null, count: 0 }, false);
    if (output) {
      if (result?.locked) {
        this.ctx.fillStyle = "rgba(28, 38, 32, 0.72)";
        this.ctx.fillRect(layout.outputSlot.x, layout.outputSlot.y, layout.outputSlot.w, layout.outputSlot.h);
        this.ctx.fillStyle = "rgba(255,255,255,0.95)";
        this.ctx.font = "11px 'Manrope', sans-serif";
        const label = result.structureLocked ? "Workbench" : `Lvl ${result.requiredLevel}`;
        this.ctx.fillText(label, layout.outputSlot.x + 4, layout.outputSlot.y + 23);
      }
    }

    this.drawInventoryStats(game, layout, statsX, statsY, statsW, statsH);

    this.ctx.font = "11px 'Manrope', sans-serif";
    this.ctx.fillStyle = "rgba(18, 32, 24, 0.72)";
    this.ctx.fillText(
      "Shift+Click transfer · Right-click split · Shift+Click output craft-all",
      layout.gridX - 4,
      layout.footerY + 44
    );

    if (layout.hasStorage) {
      const storage = game.storage.getActiveContainer();
      if (storage) {
        storage.slots.forEach((slot, index) => {
          const rect = layout.storageSlots[index];
          if (!rect) return;
          this.drawSlot(rect, slot, false);
        });
      }
    }

    const hover = this.getHoverSlot(game, layout, output, tabModel);
    if (hover) {
      this.drawTooltip(hover, game.ui.mouseX, game.ui.mouseY);
    }

    this.drawSplitPicker(game, layout);

    if (game.ui.cursorItem) {
      drawItemIcon(this.ctx, game.ui.cursorItem.id, game.ui.mouseX - 8, game.ui.mouseY - 8, 2);
      if (game.ui.cursorItem.count > 1) {
        this.ctx.fillStyle = "rgba(15,20,23,0.85)";
        this.ctx.font = "12px 'Manrope', sans-serif";
        this.ctx.fillText(String(game.ui.cursorItem.count), game.ui.mouseX + 4, game.ui.mouseY + 14);
      }
    }
    this.ctx.restore();
  }

  drawSectionCard(x, y, w, h, label) {
    this.ctx.fillStyle = "rgba(233, 238, 232, 0.85)";
    this.ctx.fillRect(x, y, w, h);
    this.ctx.strokeStyle = "rgba(46, 62, 52, 0.24)";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(x, y, w, h);
    this.ctx.fillStyle = "rgba(26, 38, 30, 0.8)";
    this.ctx.font = "600 12px 'Manrope', sans-serif";
    this.ctx.fillText(label, x + 8, y + 14);
  }

  drawInventoryTabs(tabs) {
    tabs.forEach((tab) => {
      const { bounds } = tab;
      this.ctx.fillStyle = tab.active ? "rgba(47, 111, 79, 0.2)" : "rgba(255,255,255,0.72)";
      this.ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
      this.ctx.strokeStyle = tab.active ? "rgba(47, 111, 79, 0.72)" : "rgba(36, 52, 42, 0.22)";
      this.ctx.lineWidth = tab.active ? 2 : 1;
      this.ctx.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
      this.ctx.fillStyle = "rgba(18, 28, 22, 0.86)";
      this.ctx.font = tab.active ? "700 12px 'Manrope', sans-serif" : "600 12px 'Manrope', sans-serif";
      this.ctx.fillText(tab.label, bounds.x + 10, bounds.y + 16);
    });
  }

  drawSlot(rect, slot, active = false, dimmed = false) {
    const alpha = dimmed ? 0.64 : 0.9;
    this.ctx.fillStyle = active ? "rgba(230, 245, 234, 0.95)" : `rgba(255, 255, 255, ${alpha})`;
    this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    this.ctx.strokeStyle = active
      ? "rgba(48, 112, 72, 0.75)"
      : dimmed
        ? "rgba(26, 36, 30, 0.16)"
        : "rgba(0, 0, 0, 0.24)";
    this.ctx.lineWidth = active ? 2 : 1;
    this.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    if (!slot?.id) return;
    this.ctx.save();
    if (dimmed) this.ctx.globalAlpha = 0.62;
    drawItemIcon(this.ctx, slot.id, rect.x + 8, rect.y + 8, 2);
    this.ctx.restore();
    if (slot.count > 1) {
      this.ctx.fillStyle = "rgba(18, 28, 22, 0.8)";
      this.ctx.font = "700 12px 'Manrope', sans-serif";
      this.ctx.fillText(String(slot.count), rect.x + rect.w - 14, rect.y + rect.h - 8);
    }
  }

  drawInventoryStats(game, layout, x, y, w) {
    const pad = 10;
    const chipGap = 6;
    const chipH = 18;
    const textColor = "rgba(24, 36, 28, 0.78)";
    const chipW = Math.floor((w - pad * 2 - chipGap) / 2);
    const summaryItems = [
      { id: "wood", label: "Wood" },
      { id: "stone", label: "Stone" },
      { id: "planks", label: "Planks" },
      { id: "berry", label: "Berries" },
      { id: "meat", label: "Meat" },
      { id: "cooked_meat", label: "Cooked" },
      { id: "hide", label: "Hide" },
    ];
    const drawChip = (chipX, chipY, id, label) => {
      this.ctx.fillStyle = "rgba(255,255,255,0.9)";
      this.ctx.fillRect(chipX, chipY, chipW, chipH);
      this.ctx.strokeStyle = "rgba(34, 52, 42, 0.18)";
      this.ctx.strokeRect(chipX, chipY, chipW, chipH);
      drawItemIcon(this.ctx, id, chipX + 4, chipY + 3, 2);
      this.ctx.fillStyle = textColor;
      this.ctx.font = "11px 'Manrope', sans-serif";
      this.ctx.fillText(label, chipX + 22, chipY + 12);
      this.ctx.font = "700 11px 'Manrope', sans-serif";
      this.ctx.fillText(String(game.inventory.getCount(id)), chipX + chipW - 12, chipY + 12);
    };

    this.ctx.fillStyle = "rgba(18, 32, 24, 0.9)";
    this.ctx.font = "700 12px 'Manrope', sans-serif";
    this.ctx.fillText("Totals", x + pad, y + 24);
    summaryItems.forEach((item, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      drawChip(x + pad + col * (chipW + chipGap), y + 30 + row * (chipH + 4), item.id, item.label);
    });

    const shortGearLabel = (value) => {
      if (value === "reinforced_axe") return "R Axe";
      if (value === "stone_axe") return "S Axe";
      if (value === "reinforced_pick") return "R Pick";
      if (value === "stone_pick") return "S Pick";
      if (value === "reinforced_spear") return "R Spear";
      if (value === "stone_spear") return "S Spear";
      if (value === "hide_armor") return "Hide Armor";
      return "None";
    };
    const equipY = y + 30 + Math.ceil(summaryItems.length / 2) * (chipH + 4) + 2;
    this.ctx.fillStyle = "rgba(18, 32, 24, 0.9)";
    this.ctx.font = "700 12px 'Manrope', sans-serif";
    this.ctx.fillText("Equipped", x + pad, equipY);
    this.ctx.fillStyle = "rgba(24, 36, 28, 0.74)";
    this.ctx.font = "10px 'Manrope', sans-serif";
    this.ctx.fillText(
      `Axe ${shortGearLabel(game.gear.axe)} · Pick ${shortGearLabel(game.gear.pick)}`,
      x + pad,
      equipY + 13
    );
    this.ctx.fillText(
      `Weapon ${shortGearLabel(game.gear.weapon)} · Armor ${shortGearLabel(game.gear.armor)}`,
      x + pad,
      equipY + 25
    );
    this.ctx.fillText(
      `Carry ${game.inventory.count()}/${game.inventory.capacity()} · Backpack ${game.gear.backpack ? "Yes" : "No"}`,
      x + pad,
      equipY + 37
    );
  }

  getHoverSlot(game, layout, output, tabModel) {
    const { mouseX, mouseY } = game.ui;
    const hit = (rect) =>
      rect && mouseX >= rect.x && mouseX <= rect.x + rect.w && mouseY >= rect.y && mouseY <= rect.y + rect.h;

    for (let i = 0; i < tabModel.backpackSlots.length; i += 1) {
      const entry = tabModel.backpackSlots[i];
      if (!entry.rect || !hit(entry.rect)) continue;
      const slot = entry.slot;
      if (!slot?.id) return null;
      return { id: slot.id, count: slot.count };
    }

    for (let i = 0; i < 9; i += 1) {
      const rect = layout.hotbarRects[i];
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

  drawSplitPicker(game, layout) {
    const picker = game.ui.splitPicker;
    if (!picker?.active) {
      game.ui.splitPickerLayout = null;
      return;
    }
    const panelW = 180;
    const panelH = 90;
    let drawX = game.ui.mouseX + 16;
    let drawY = game.ui.mouseY + 16;
    drawX = clamp(drawX, layout.panel.x + 8, layout.panel.x + layout.panel.w - panelW - 8);
    drawY = clamp(drawY, layout.panel.y + 8, layout.panel.y + layout.panel.h - panelH - 8);
    const minus = { x: drawX + 10, y: drawY + 40, w: 20, h: 20 };
    const plus = { x: drawX + panelW - 30, y: drawY + 40, w: 20, h: 20 };
    const max = { x: drawX + panelW - 62, y: drawY + 40, w: 26, h: 20 };
    const confirm = { x: drawX + 10, y: drawY + 64, w: 70, h: 20 };
    const cancel = { x: drawX + panelW - 80, y: drawY + 64, w: 70, h: 20 };
    game.ui.splitPickerLayout = {
      panel: { x: drawX, y: drawY, w: panelW, h: panelH },
      minus,
      plus,
      max,
      confirm,
      cancel,
    };

    this.ctx.save();
    this.ctx.fillStyle = "rgba(20, 26, 30, 0.85)";
    this.ctx.fillRect(drawX, drawY, panelW, panelH);
    this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
    this.ctx.strokeRect(drawX, drawY, panelW, panelH);
    this.ctx.fillStyle = "rgba(255,255,255,0.9)";
    this.ctx.font = "11px 'Manrope', sans-serif";
    this.ctx.fillText("Split Stack", drawX + 10, drawY + 16);
    this.ctx.fillStyle = "rgba(255,255,255,0.7)";
    this.ctx.fillText(`Amount: ${picker.amount}/${picker.max}`, drawX + 10, drawY + 32);

    this.ctx.fillStyle = "rgba(255,255,255,0.15)";
    this.ctx.fillRect(minus.x, minus.y, minus.w, minus.h);
    this.ctx.fillRect(plus.x, plus.y, plus.w, plus.h);
    this.ctx.fillRect(max.x, max.y, max.w, max.h);
    this.ctx.fillStyle = "rgba(255,255,255,0.85)";
    this.ctx.fillText("-", minus.x + 6, minus.y + 14);
    this.ctx.fillText("+", plus.x + 6, plus.y + 14);
    this.ctx.fillText("Max", max.x + 4, max.y + 14);

    this.ctx.fillStyle = "rgba(47,111,79,0.65)";
    this.ctx.fillRect(confirm.x, confirm.y, confirm.w, confirm.h);
    this.ctx.fillStyle = "rgba(255,255,255,0.9)";
    this.ctx.fillText("Confirm", confirm.x + 8, confirm.y + 14);
    this.ctx.fillStyle = "rgba(120, 70, 64, 0.65)";
    this.ctx.fillRect(cancel.x, cancel.y, cancel.w, cancel.h);
    this.ctx.fillStyle = "rgba(255,255,255,0.9)";
    this.ctx.fillText("Cancel", cancel.x + 12, cancel.y + 14);
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

export class NetStatus {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(game) {
    if (!game.ui.showNetStatus) return;
    const status = game.net?.getStatus?.() ?? { connected: false, mode: "local", regionId: "local" };
    const label = status.connected ? "Online" : "Offline";
    const ping =
      typeof status.pingMs === "number" && Number.isFinite(status.pingMs)
        ? `${Math.round(status.pingMs)}ms`
        : "--";
    const region = status.regionId ?? "local";
    const mode = status.mode ?? "local";
    const text = `Net ${label} · ${ping} · ${region} · ${mode}`;
    const debugLines =
      game.ui.showDebug && game.debug.enabled && game.renderer?.getDebugLines
        ? game.renderer.getDebugLines(game)
        : [];
    const padding = 8;
    const lineHeight = 14;
    const debugHeight =
      debugLines.length > 0 ? debugLines.length * lineHeight + padding * 2 - 4 : 0;
    this.ctx.save();
    this.ctx.font = "11px 'Manrope', sans-serif";
    const width = this.ctx.measureText(text).width + padding * 2;
    const x = game.view.width - width - 18;
    const y = 18 + (debugHeight > 0 ? debugHeight + 8 : 0);
    const height = 18;
    this.ctx.fillStyle = status.connected ? "rgba(255,255,255,0.72)" : "rgba(255, 214, 214, 0.8)";
    this.ctx.fillRect(x, y, width, height);
    this.ctx.strokeStyle = "rgba(0,0,0,0.18)";
    this.ctx.strokeRect(x, y, width, height);
    this.ctx.fillStyle = "rgba(15,20,23,0.75)";
    this.ctx.fillText(text, x + padding, y + 13);
    this.ctx.restore();
  }
}
