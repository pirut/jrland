const MATERIAL_IDS = new Set(["wood", "stone", "planks"]);
const LOOT_IDS = new Set(["berry", "meat", "cooked_meat", "hide"]);
const GEAR_IDS = new Set([
  "stone_axe",
  "stone_pick",
  "stone_spear",
  "reinforced_axe",
  "reinforced_pick",
  "reinforced_spear",
  "hide_armor",
  "backpack",
]);

export const INVENTORY_TAB_DEFS = [
  { id: "all", label: "All" },
  { id: "materials", label: "Materials" },
  { id: "loot", label: "Loot" },
  { id: "gear", label: "Gear" },
];

export function normalizeInventoryTab(tabId) {
  if (INVENTORY_TAB_DEFS.some((tab) => tab.id === tabId)) {
    return tabId;
  }
  return "all";
}

export function itemMatchesInventoryTab(tabId, itemId) {
  if (!itemId) return true;
  if (tabId === "all") return true;
  if (tabId === "materials") return MATERIAL_IDS.has(itemId);
  if (tabId === "loot") return LOOT_IDS.has(itemId);
  if (tabId === "gear") return GEAR_IDS.has(itemId);
  return true;
}

function getGridWidth(layout) {
  const first = layout.backpackRects?.[0];
  const last = layout.backpackRects?.[8];
  if (!first || !last) return 0;
  return last.x + last.w - first.x;
}

function getBackpackSlotMap(inventorySlots, tabId) {
  const baseIndices = Array.from({ length: 27 }, (_, i) => i + 9);
  if (tabId === "all") {
    return baseIndices.map((inventoryIndex) => ({ inventoryIndex, dimmed: false }));
  }

  const matching = [];
  const empty = [];
  const other = [];
  baseIndices.forEach((inventoryIndex) => {
    const slot = inventorySlots[inventoryIndex];
    if (!slot?.id) {
      empty.push(inventoryIndex);
      return;
    }
    if (itemMatchesInventoryTab(tabId, slot.id)) {
      matching.push(inventoryIndex);
      return;
    }
    other.push(inventoryIndex);
  });

  const dimmedIndices = new Set(other);
  return [...matching, ...empty, ...other].map((inventoryIndex) => ({
    inventoryIndex,
    dimmed: dimmedIndices.has(inventoryIndex),
  }));
}

export function getInventoryTabModel(game, layout) {
  const activeTab = normalizeInventoryTab(game.ui.inventoryTab);
  const tabGap = 8;
  const tabY = layout.tabsY;
  const tabX = layout.gridX;
  const gridWidth = getGridWidth(layout);
  const tabWidth = Math.floor((gridWidth - tabGap * (INVENTORY_TAB_DEFS.length - 1)) / INVENTORY_TAB_DEFS.length);
  const tabs = INVENTORY_TAB_DEFS.map((tab, index) => ({
    ...tab,
    active: tab.id === activeTab,
    bounds: {
      x: tabX + index * (tabWidth + tabGap),
      y: tabY,
      w: tabWidth,
      h: 24,
    },
  }));

  const backpackMap = getBackpackSlotMap(game.inventory.slots, activeTab);
  const backpackSlots = backpackMap.map((entry, visualIndex) => ({
    ...entry,
    rect: layout.backpackRects?.[visualIndex] ?? null,
    slot: game.inventory.slots[entry.inventoryIndex],
  }));

  return {
    activeTab,
    tabs,
    backpackSlots,
  };
}
