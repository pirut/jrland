export const CONFIG = {
  baseAspect: 16 / 9,
  gatherRange: 1.1,
  gatherCooldown: 0.6,
  messageDuration: 1.6,
  messageMax: 3,
  baseTileSize: 32,
};

export const BUILDINGS = {
  campfire: {
    cost: { wood: 2, stone: 1 },
    radius: 0.35,
    footprint: { w: 1, h: 1 },
    baseRadius: 0.35,
    footprintRadius: 0.6,
    unlockLevel: 1,
    canopy: false,
  },
  shelter: {
    cost: { wood: 6, stone: 2 },
    size: 0.9,
    footprint: { w: 2, h: 2 },
    baseSize: { w: 0.9, h: 0.5 },
    roof: { w: 1.2, h: 0.85, offsetY: -0.18 },
    footprintRadius: 0.8,
    unlockLevel: 2,
    canopy: true,
  },
  workbench: {
    cost: { wood: 4, stone: 2 },
    footprint: { w: 2, h: 1 },
    baseSize: { w: 0.7, h: 0.35 },
    footprintRadius: 0.6,
    unlockLevel: 3,
    canopy: false,
  },
  hut: {
    cost: { planks: 6, stone: 4, hide: 2 },
    footprint: { w: 3, h: 2 },
    baseSize: { w: 1.1, h: 0.65 },
    roof: { w: 1.6, h: 1.1, offsetY: -0.25 },
    footprintRadius: 1.05,
    unlockLevel: 4,
    canopy: true,
  },
};

export const ITEMS = {
  wood: { name: "Wood", maxStack: 32 },
  stone: { name: "Stone", maxStack: 32 },
  berry: { name: "Berries", maxStack: 16, edible: { hunger: 18, stamina: 6 } },
  planks: { name: "Planks", maxStack: 32 },
  meat: { name: "Meat", maxStack: 8, edible: { hunger: 28, stamina: 10, health: 4 } },
  cooked_meat: { name: "Cooked Meat", maxStack: 8, edible: { hunger: 40, stamina: 14, health: 10 } },
  hide: { name: "Hide", maxStack: 12 },
  campfire: { name: "Campfire", maxStack: 16 },
  shelter: { name: "Shelter", maxStack: 8 },
  workbench: { name: "Workbench", maxStack: 8 },
  hut: { name: "Hut", maxStack: 4 },
  stone_axe: { name: "Stone Axe", maxStack: 1 },
  stone_pick: { name: "Stone Pick", maxStack: 1 },
  stone_spear: { name: "Stone Spear", maxStack: 1 },
  hide_armor: { name: "Hide Armor", maxStack: 1 },
  backpack: { name: "Backpack", maxStack: 1 },
};

export const CRAFTING_RECIPES = [
  {
    pattern: ["stone", "stone", "wood", "wood"],
    output: { id: "stone_axe", count: 1 },
    unlockLevel: 3,
    requiresStructure: "workbench",
  },
  {
    pattern: ["stone", "stone", "stone", "wood"],
    output: { id: "stone_pick", count: 1 },
    unlockLevel: 3,
    requiresStructure: "workbench",
  },
  {
    pattern: ["wood", "stone", "wood", "stone"],
    output: { id: "stone_spear", count: 1 },
    unlockLevel: 3,
    requiresStructure: "workbench",
  },
  {
    pattern: ["hide", "planks", "hide", "planks"],
    output: { id: "hide_armor", count: 1 },
    unlockLevel: 4,
    requiresStructure: "workbench",
  },
  {
    pattern: ["wood", "wood", "wood", "stone"],
    output: { id: "backpack", count: 1 },
    unlockLevel: 3,
    requiresStructure: "workbench",
  },
  {
    pattern: ["wood", "wood", "wood", "wood"],
    output: { id: "planks", count: 2 },
    unlockLevel: 2,
  },
];

export const PROGRESSION = {
  baseXpToLevel: 20,
  xpGrowth: 1.4,
  xp: {
    gather: 3,
    build: 6,
    craft: 5,
    forage: 2,
    combat: 6,
  },
};

export const CREATURES = {
  boar: {
    maxHealth: 28,
    speed: 1.6,
    aggroRange: 3.4,
    attackRange: 0.8,
    damage: 8,
    xp: 10,
    drops: [
      { id: "meat", min: 1, max: 2 },
      { id: "hide", min: 0, max: 1 },
    ],
  },
  wolf: {
    maxHealth: 22,
    speed: 2.2,
    aggroRange: 4.2,
    attackRange: 0.9,
    damage: 6,
    xp: 8,
    drops: [
      { id: "meat", min: 1, max: 1 },
      { id: "hide", min: 1, max: 2 },
    ],
  },
};

export const QUESTS = [
  {
    id: "gather-wood",
    type: "gather",
    item: "wood",
    target: 6,
    label: "Gather 6 wood",
    rewardXp: 8,
  },
  {
    id: "gather-stone",
    type: "gather",
    item: "stone",
    target: 4,
    label: "Gather 4 stone",
    rewardXp: 8,
  },
  {
    id: "forage-berries",
    type: "gather",
    item: "berry",
    target: 3,
    label: "Forage 3 berries",
    rewardXp: 6,
  },
  {
    id: "craft-planks",
    type: "craft",
    item: "planks",
    target: 2,
    label: "Craft planks",
    rewardXp: 10,
  },
  {
    id: "build-campfire",
    type: "build",
    item: "campfire",
    target: 1,
    label: "Build a campfire",
    rewardXp: 12,
  },
  {
    id: "build-shelter",
    type: "build",
    item: "shelter",
    target: 1,
    label: "Build a shelter",
    rewardXp: 14,
  },
  {
    id: "hunt-boar",
    type: "gather",
    item: "meat",
    target: 2,
    label: "Hunt boar (loot meat)",
    rewardXp: 16,
  },
];

export const PALETTE = {
  water: "#9cb7c5",
  sand: "#d9c9a5",
  grass: "#a6b98f",
  dirt: "#b4987a",
  rock: "#8c8f92",
};
