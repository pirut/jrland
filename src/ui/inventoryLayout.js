export function getInventoryLayout(game) {
  const slotSize = 36;
  const gap = 8;
  const gridCols = 9;
  const gridRows = 3;
  const craftCols = 2;
  const craftRows = 2;
  const panelPadding = 22;
  const craftAreaWidth = craftCols * slotSize + (craftCols - 1) * gap + 118;
  const statsAreaWidth = 236;
  const storageCols = 4;
  const storageRows = 3;
  const storageAreaWidth = storageCols * slotSize + (storageCols - 1) * gap + 28;
  const hasStorage = Boolean(game.storage?.isOpen?.());
  const gridWidth = gridCols * slotSize + (gridCols - 1) * gap;
  const sideAreaWidth = Math.max(craftAreaWidth, statsAreaWidth);
  const panelWidth =
    panelPadding * 2 +
    gridWidth +
    26 +
    sideAreaWidth +
    (hasStorage ? storageAreaWidth + 16 : 0);
  const footerHeight = 96;
  const panelHeight =
    panelPadding * 2 +
    28 +
    gridRows * slotSize +
    (gridRows - 1) * gap +
    gap * 2 +
    slotSize +
    footerHeight;
  const panelX = (game.view.width - panelWidth) / 2;
  const panelY = (game.view.height - panelHeight) / 2;

  const gridX = panelX + panelPadding;
  const gridY = panelY + panelPadding + 28;
  const hotbarY = gridY + gridRows * (slotSize + gap) + gap * 2;
  const footerY = hotbarY + slotSize + 12;

  const craftX = gridX + gridWidth + 26;
  const craftY = gridY + 8;
  const outputX = craftX + craftCols * (slotSize + gap) + 24;
  const outputY = craftY + slotSize + gap;
  const statsX = craftX;
  const statsY = craftY + craftRows * (slotSize + gap) + 26;
  const storageX = craftX + sideAreaWidth + 16;
  const storageY = gridY + 8;

  const slots = [];
  for (let row = 0; row < gridRows; row += 1) {
    for (let col = 0; col < gridCols; col += 1) {
      const index = 9 + row * gridCols + col;
      slots[index] = {
        x: gridX + col * (slotSize + gap),
        y: gridY + row * (slotSize + gap),
        w: slotSize,
        h: slotSize,
      };
    }
  }
  for (let col = 0; col < gridCols; col += 1) {
    slots[col] = {
      x: gridX + col * (slotSize + gap),
      y: hotbarY,
      w: slotSize,
      h: slotSize,
    };
  }

  const craftSlots = [];
  for (let row = 0; row < craftRows; row += 1) {
    for (let col = 0; col < craftCols; col += 1) {
      craftSlots[row * craftCols + col] = {
        x: craftX + col * (slotSize + gap),
        y: craftY + row * (slotSize + gap),
        w: slotSize,
        h: slotSize,
      };
    }
  }

  const storageSlots = [];
  if (hasStorage) {
    for (let row = 0; row < storageRows; row += 1) {
      for (let col = 0; col < storageCols; col += 1) {
        storageSlots[row * storageCols + col] = {
          x: storageX + col * (slotSize + gap),
          y: storageY + row * (slotSize + gap),
          w: slotSize,
          h: slotSize,
        };
      }
    }
  }

  return {
    panel: { x: panelX, y: panelY, w: panelWidth, h: panelHeight },
    slots,
    craftSlots,
    outputSlot: { x: outputX, y: outputY, w: slotSize, h: slotSize },
    storageSlots,
    slotSize,
    gap,
    gridX,
    gridY,
    hotbarY,
    craftX,
    craftY,
    statsX,
    statsY,
    storageX,
    storageY,
    footerY,
    hasStorage,
  };
}
