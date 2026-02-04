export const ICONS = {
  campfire: [
    "........",
    "...yy...",
    "..yyyy..",
    "...oo...",
    "..o..o..",
    "..bbbb..",
    ".b....b.",
    "........",
  ],
  shelter: [
    "....g...",
    "...ggg..",
    "..ggggg.",
    ".ggggggg",
    "..sssss.",
    "..s...s.",
    "..s...s.",
    "........",
  ],
  workbench: [
    "........",
    "..bbbb..",
    "..b..b..",
    "..bbbb..",
    "...ss...",
    "...ss...",
    "........",
    "........",
  ],
  hut: [
    "..gggg..",
    ".gggggg.",
    "gggggggg",
    "..bbbb..",
    "..b..b..",
    "..bbbb..",
    "........",
    "........",
  ],
  wood: [
    "........",
    ".bbbb...",
    ".b..b...",
    ".bbbb...",
    ".b..b...",
    ".bbbb...",
    "........",
    "........",
  ],
  stone: [
    "........",
    ".gggg...",
    "g....g..",
    "g....g..",
    ".gggg...",
    "..gg....",
    "........",
    "........",
  ],
  stone_axe: [
    "....gg..",
    "...ggg..",
    "..g.gg..",
    "...s....",
    "...s....",
    "...s....",
    "........",
    "........",
  ],
  stone_pick: [
    "gggggg..",
    "...g....",
    "...g....",
    "..s.....",
    "..s.....",
    "..s.....",
    "........",
    "........",
  ],
  backpack: [
    "..bbbb..",
    ".b....b.",
    ".b....b.",
    ".bbbbbb.",
    ".b....b.",
    ".b....b.",
    "........",
    "........",
  ],
  berry: [
    "........",
    "..rrr...",
    ".rrrrr..",
    "..rrr...",
    "...g....",
    "..g.....",
    "........",
    "........",
  ],
  planks: [
    "........",
    ".bbbbbb.",
    ".bbbbbb.",
    ".bbbbbb.",
    "........",
    "........",
    "........",
    "........",
  ],
};

export const ICON_PALETTES = {
  campfire: {
    y: "#f9c74f",
    o: "#f9844a",
    b: "#7b5a3b",
  },
  shelter: {
    g: "#7b5a3b",
    s: "#b4987a",
  },
  workbench: {
    b: "#8a6a4b",
    s: "#5c4633",
  },
  hut: {
    g: "#7b5a3b",
    b: "#b4987a",
  },
  wood: {
    b: "#7b5a3b",
  },
  stone: {
    g: "#8c8f92",
  },
  stone_axe: {
    g: "#8c8f92",
    s: "#7b5a3b",
  },
  stone_pick: {
    g: "#8c8f92",
    s: "#7b5a3b",
  },
  backpack: {
    b: "#b4987a",
  },
  berry: {
    r: "#c14456",
    g: "#3f5d45",
  },
  planks: {
    b: "#a9815a",
  },
};

export function drawPixelIcon(ctx, icon, palette, x, y, scale = 2) {
  icon.forEach((row, rowIndex) => {
    row.split("").forEach((pixel, colIndex) => {
      if (pixel === ".") return;
      const color = palette[pixel];
      if (!color) return;
      ctx.fillStyle = color;
      ctx.fillRect(x + colIndex * scale, y + rowIndex * scale, scale, scale);
    });
  });
}

export function drawItemIcon(ctx, itemId, x, y, scale = 2) {
  const icon = ICONS[itemId];
  const palette = ICON_PALETTES[itemId];
  if (!icon || !palette) return;
  drawPixelIcon(ctx, icon, palette, x, y, scale);
}
