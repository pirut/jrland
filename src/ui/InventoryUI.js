import { getInventoryLayout } from "./inventoryLayout.js";
import { ITEMS, CRAFTING_RECIPES } from "../config.js";

export class InventoryUI {
  constructor() {
    this.cursor = null;
  }

  getLayout(game) {
    return getInventoryLayout(game);
  }

  pickUp(slot) {
    if (!slot.id) return null;
    return { id: slot.id, count: slot.count };
  }

  clearSlot(slot) {
    slot.id = null;
    slot.count = 0;
  }

  placeIntoSlot(cursor, slot) {
    if (!cursor) return null;
    if (!slot.id) {
      slot.id = cursor.id;
      slot.count = cursor.count;
      return null;
    }
    if (slot.id === cursor.id) {
      const maxStack = ITEMS[cursor.id]?.maxStack ?? 1;
      const space = maxStack - slot.count;
      if (space <= 0) return cursor;
      const transfer = Math.min(space, cursor.count);
      slot.count += transfer;
      const remaining = cursor.count - transfer;
      return remaining > 0 ? { id: cursor.id, count: remaining } : null;
    }
    const swapped = { id: slot.id, count: slot.count };
    slot.id = cursor.id;
    slot.count = cursor.count;
    return swapped;
  }

  handleSlotClick(slot, cursor) {
    if (!cursor) {
      const picked = this.pickUp(slot);
      if (picked) {
        this.clearSlot(slot);
        return picked;
      }
      return null;
    }
    return this.placeIntoSlot(cursor, slot);
  }

  getRecipeResult(craftSlots, progression, structureContext) {
    const ids = craftSlots.map((slot) => slot.id || null);
    for (const recipe of CRAFTING_RECIPES) {
      const matches = recipe.pattern.every((item, idx) => item === ids[idx]);
      if (matches) {
        const requiredLevel = recipe.unlockLevel ?? 1;
        const levelLocked = progression ? progression.level < requiredLevel : false;
        const requiresStructure = recipe.requiresStructure ?? null;
        const structureLocked =
          requiresStructure && structureContext
            ? !structureContext[`near${requiresStructure[0].toUpperCase()}${requiresStructure.slice(1)}`]
            : false;
        const locked = levelLocked || structureLocked;
        return {
          output: recipe.output,
          locked,
          requiredLevel,
          requiresStructure,
          structureLocked,
        };
      }
    }
    return null;
  }

  consumeRecipe(craftSlots) {
    craftSlots.forEach((slot) => {
      if (!slot.id) return;
      slot.count -= 1;
      if (slot.count <= 0) {
        slot.id = null;
        slot.count = 0;
      }
    });
  }

  handleClick(game, x, y) {
    const layout = this.getLayout(game);
    const inside =
      x >= layout.panel.x &&
      x <= layout.panel.x + layout.panel.w &&
      y >= layout.panel.y &&
      y <= layout.panel.y + layout.panel.h;
    if (!inside) return;

    const result = this.getRecipeResult(game.craftingGrid, game.progression, game.structureContext);
    const output = result?.output ?? null;
    this.cursor = game.ui.cursorItem;
    if (
      x >= layout.outputSlot.x &&
      x <= layout.outputSlot.x + layout.outputSlot.w &&
      y >= layout.outputSlot.y &&
      y <= layout.outputSlot.y + layout.outputSlot.h
    ) {
      if (output) {
          if (result?.locked) {
            if (result.structureLocked) {
              game.notifications.push(`Requires ${result.requiresStructure}`);
            } else {
              game.notifications.push(`Requires level ${result.requiredLevel}`);
            }
            game.ui.cursorItem = this.cursor;
            return;
          }
          const cursor = this.cursor;
          const maxStack = ITEMS[output.id]?.maxStack ?? 1;
          if (!cursor || cursor.id === output.id) {
            const total = (cursor?.count ?? 0) + output.count;
            if (total <= maxStack) {
              this.cursor = { id: output.id, count: total };
              this.consumeRecipe(game.craftingGrid);
              game.onCraft?.(output);
            }
          }
        }
      game.ui.cursorItem = this.cursor;
      return;
    }

    for (let i = 0; i < game.inventory.slots.length; i += 1) {
      const rect = layout.slots[i];
      if (!rect) continue;
      if (x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h) {
        this.cursor = this.handleSlotClick(game.inventory.slots[i], this.cursor);
        game.ui.cursorItem = this.cursor;
        return;
      }
    }

    for (let i = 0; i < game.craftingGrid.length; i += 1) {
      const rect = layout.craftSlots[i];
      if (!rect) continue;
      if (x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h) {
        this.cursor = this.handleSlotClick(game.craftingGrid[i], this.cursor);
        game.ui.cursorItem = this.cursor;
        return;
      }
    }
    game.ui.cursorItem = this.cursor;
  }
}
