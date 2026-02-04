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

  handleClick(game, x, y, button = 0, mods = {}) {
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
          const craftCount = button === 2 ? 1 : output.count;
          const total = (cursor?.count ?? 0) + craftCount;
          if (total <= maxStack) {
            this.cursor = { id: output.id, count: total };
            this.consumeRecipe(game.craftingGrid);
            game.onCraft?.({ ...output, count: craftCount });
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
        if (mods.shiftKey && layout.hasStorage) {
          const moved = this.quickTransfer(game.inventory.slots[i], game.storage.getActiveContainer()?.slots ?? []);
          if (moved) {
            game.ui.cursorItem = this.cursor;
            return;
          }
        }
        this.cursor = this.handleSlotClickAdvanced(game.inventory.slots[i], this.cursor, button);
        game.ui.cursorItem = this.cursor;
        return;
      }
    }

    for (let i = 0; i < game.craftingGrid.length; i += 1) {
      const rect = layout.craftSlots[i];
      if (!rect) continue;
      if (x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h) {
        this.cursor = this.handleSlotClickAdvanced(game.craftingGrid[i], this.cursor, button);
        game.ui.cursorItem = this.cursor;
        return;
      }
    }

    if (layout.hasStorage) {
      const storage = game.storage.getActiveContainer();
      if (storage) {
        for (let i = 0; i < storage.slots.length; i += 1) {
          const rect = layout.storageSlots[i];
          if (!rect) continue;
          if (x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h) {
            if (mods.shiftKey) {
              const moved = this.quickTransfer(storage.slots[i], game.inventory.slots);
              if (moved) {
                game.ui.cursorItem = this.cursor;
                return;
              }
            }
            this.cursor = this.handleSlotClickAdvanced(storage.slots[i], this.cursor, button);
            game.ui.cursorItem = this.cursor;
            return;
          }
        }
      }
    }
    game.ui.cursorItem = this.cursor;
  }

  handleSlotClickAdvanced(slot, cursor, button = 0) {
    if (button === 2) {
      if (!cursor && slot.id) {
        return this.pickUpHalf(slot);
      }
      if (cursor) {
        return this.placeSingle(cursor, slot);
      }
      return cursor;
    }
    return this.handleSlotClick(slot, cursor);
  }

  pickUpHalf(slot) {
    if (!slot.id || slot.count <= 0) return null;
    const take = Math.ceil(slot.count / 2);
    slot.count -= take;
    if (slot.count <= 0) {
      const picked = { id: slot.id, count: take };
      slot.id = null;
      slot.count = 0;
      return picked;
    }
    return { id: slot.id, count: take };
  }

  placeSingle(cursor, slot) {
    if (!cursor) return null;
    if (!slot.id) {
      slot.id = cursor.id;
      slot.count = 1;
      const remaining = cursor.count - 1;
      return remaining > 0 ? { id: cursor.id, count: remaining } : null;
    }
    if (slot.id !== cursor.id) return cursor;
    const maxStack = ITEMS[cursor.id]?.maxStack ?? 1;
    if (slot.count >= maxStack) return cursor;
    slot.count += 1;
    const remaining = cursor.count - 1;
    return remaining > 0 ? { id: cursor.id, count: remaining } : null;
  }

  quickTransfer(sourceSlot, destSlots) {
    if (!sourceSlot.id || sourceSlot.count <= 0) return false;
    let remaining = sourceSlot.count;
    const maxStack = ITEMS[sourceSlot.id]?.maxStack ?? 1;
    destSlots.forEach((slot) => {
      if (remaining <= 0) return;
      if (slot.id === sourceSlot.id && slot.count < maxStack) {
        const space = maxStack - slot.count;
        const transfer = Math.min(space, remaining);
        slot.count += transfer;
        remaining -= transfer;
      }
    });
    destSlots.forEach((slot) => {
      if (remaining <= 0) return;
      if (!slot.id) {
        const transfer = Math.min(maxStack, remaining);
        slot.id = sourceSlot.id;
        slot.count = transfer;
        remaining -= transfer;
      }
    });
    const moved = remaining !== sourceSlot.count;
    if (moved) {
      sourceSlot.count = remaining;
      if (sourceSlot.count <= 0) {
        sourceSlot.id = null;
        sourceSlot.count = 0;
      }
    }
    return moved;
  }
}
