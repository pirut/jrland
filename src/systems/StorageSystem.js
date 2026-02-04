import { ITEMS } from "../config.js";

export class StorageSystem {
  constructor() {
    this.containers = new Map();
    this.activeId = null;
    this.slotCount = 12;
  }

  reset() {
    this.containers.clear();
    this.activeId = null;
  }

  open(id) {
    this.activeId = id;
    this.getContainer(id);
  }

  close() {
    this.activeId = null;
  }

  isOpen() {
    return Boolean(this.activeId);
  }

  getContainer(id) {
    if (!this.containers.has(id)) {
      const slots = Array.from({ length: this.slotCount }, () => ({ id: null, count: 0 }));
      this.containers.set(id, { id, slots });
    }
    return this.containers.get(id);
  }

  getActiveContainer() {
    if (!this.activeId) return null;
    return this.getContainer(this.activeId);
  }

  canAddToContainer(id, itemId, amount) {
    const container = this.getContainer(id);
    const maxStack = ITEMS[itemId]?.maxStack ?? 1;
    let remaining = amount;
    for (const slot of container.slots) {
      if (slot.id === itemId) {
        const space = maxStack - slot.count;
        remaining -= Math.max(0, space);
      }
      if (remaining <= 0) return true;
    }
    for (const slot of container.slots) {
      if (!slot.id) {
        remaining -= maxStack;
      }
      if (remaining <= 0) return true;
    }
    return remaining <= 0;
  }
}
