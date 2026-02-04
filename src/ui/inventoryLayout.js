export function getInventoryLayout(game) {
  const slotSize = 32;
  const gap = 6;
  const gridCols = 9;
  const gridRows = 3;
  const craftCols = 2;
  const craftRows = 2;
  const panelPadding = 20;
  const craftAreaWidth = craftCols * slotSize + (craftCols - 1) * gap + 110;
  const storageCols = 4;
  const storageRows = 3;
  const storageAreaWidth = storageCols * slotSize + (storageCols - 1) * gap + 32;
  const hasStorage = Boolean(game.storage?.isOpen?.());
  const gridWidth = gridCols * slotSize + (gridCols - 1) * gap;
  const panelWidth =
    panelPadding * 2 + gridWidth + craftAreaWidth + (hasStorage ? storageAreaWidth : 0);
  const panelHeight = panelPadding * 2 + gridRows * slotSize + (gridRows - 1) * gap + slotSize + gap * 2 + 64;
  const panelX = (game.view.width - panelWidth) / 2;
  const panelY = (game.view.height - panelHeight) / 2;

  const gridX = panelX + panelPadding;
  const gridY = panelY + panelPadding + 20;
  const hotbarY = gridY + gridRows * (slotSize + gap) + gap * 2;

  const craftX = gridX + gridWidth + 24;
  const craftY = gridY + 10;
  const outputX = craftX + craftCols * (slotSize + gap) + 30;
  const outputY = craftY + slotSize + gap;
  const storageX = craftX + craftAreaWidth + 16;
  const storageY = craftY;

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
    storageX,
    storageY,
    hasStorage,
  };
}
