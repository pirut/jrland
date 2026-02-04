export class Inventory {
  constructor() {
    this.reset();
  }

  reset() {
    this.slots = Array.from({ length: 36 }, () => ({ id: null, count: 0 }));
    this.baseCapacity = 36;
    this.capacityBonus = 0;
  }

  count() {
    return this.slots.reduce((sum, slot) => sum + (slot.id ? slot.count : 0), 0);
  }

  capacity() {
    return this.baseCapacity + this.capacityBonus;
  }

  getCount(id) {
    return this.slots.reduce((sum, slot) => sum + (slot.id === id ? slot.count : 0), 0);
  }

  canAdd(id, amount, maxStack = 32) {
    if (this.count() + amount > this.capacity()) return false;
    let remaining = amount;
    for (const slot of this.slots) {
      if (slot.id === id) {
        const space = maxStack - slot.count;
        remaining -= Math.max(0, space);
      }
      if (remaining <= 0) return true;
    }
    for (const slot of this.slots) {
      if (!slot.id) {
        remaining -= maxStack;
      }
      if (remaining <= 0) return true;
    }
    return remaining <= 0;
  }

  addItem(id, amount, maxStack = 32) {
    let remaining = amount;
    for (const slot of this.slots) {
      if (slot.id === id && slot.count < maxStack) {
        const space = maxStack - slot.count;
        const transfer = Math.min(space, remaining);
        slot.count += transfer;
        remaining -= transfer;
      }
      if (remaining <= 0) return true;
    }
    for (const slot of this.slots) {
      if (!slot.id) {
        const transfer = Math.min(maxStack, remaining);
        slot.id = id;
        slot.count = transfer;
        remaining -= transfer;
      }
      if (remaining <= 0) return true;
    }
    return remaining <= 0;
  }

  canAfford(cost) {
    return Object.entries(cost).every(([key, value]) => this.getCount(key) >= value);
  }

  spend(cost) {
    Object.entries(cost).forEach(([key, value]) => {
      this.removeItem(key, value);
    });
  }

  removeItem(id, amount) {
    let remaining = amount;
    for (const slot of this.slots) {
      if (slot.id !== id) continue;
      const transfer = Math.min(slot.count, remaining);
      slot.count -= transfer;
      remaining -= transfer;
      if (slot.count <= 0) {
        slot.id = null;
        slot.count = 0;
      }
      if (remaining <= 0) break;
    }
  }
}
