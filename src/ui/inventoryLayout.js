export function getInventoryLayout(game) {
  const slotSize = 38;
  const gap = 8;
  const gridCols = 9;
  const gridRows = 3;
  const craftCols = 2;
  const craftRows = 2;
  const panelPadding = 20;
  const headerHeight = 76;
  const craftAreaWidth = craftCols * slotSize + (craftCols - 1) * gap + 94;
  const statsAreaWidth = 250;
  const storageCols = 4;
  const storageRows = 3;
  const storageAreaWidth = storageCols * slotSize + (storageCols - 1) * gap + 28;
  const hasStorage = Boolean(game.storage?.isOpen?.());
  const gridWidth = gridCols * slotSize + (gridCols - 1) * gap;
  const gridHeight = gridRows * slotSize + (gridRows - 1) * gap;
  const craftWidth = craftCols * slotSize + (craftCols - 1) * gap;
  const craftHeight = craftRows * slotSize + (craftRows - 1) * gap;
  const sideAreaWidth = Math.max(craftAreaWidth, statsAreaWidth);
  const rightColumnGap = 26;
  const panelWidth =
    panelPadding * 2 +
    gridWidth +
    rightColumnGap +
    sideAreaWidth +
    (hasStorage ? storageAreaWidth + 16 : 0);
  const footerHeight = 78;
  const panelHeight =
    panelPadding * 2 +
    headerHeight +
    gridHeight +
    gap * 2 +
    slotSize +
    footerHeight;
  const panelX = (game.view.width - panelWidth) / 2;
  const panelY = (game.view.height - panelHeight) / 2;

  const headerY = panelY + panelPadding;
  const tabsY = headerY + 34;
  const gridX = panelX + panelPadding;
  const gridY = panelY + panelPadding + headerHeight;
  const hotbarY = gridY + gridHeight + gap * 2;
  const footerY = hotbarY + slotSize + 12;

  const craftX = gridX + gridWidth + rightColumnGap;
  const craftY = gridY + 10;
  const outputX = craftX + craftWidth + 24;
  const outputY = craftY + Math.floor(slotSize / 2);
  const statsX = craftX;
  const statsY = craftY + craftHeight + 26;
  const storageX = craftX + sideAreaWidth + 16;
  const storageY = gridY + 10;

  const slots = [];
  const backpackRects = [];
  for (let row = 0; row < gridRows; row += 1) {
    for (let col = 0; col < gridCols; col += 1) {
      const index = 9 + row * gridCols + col;
      const rect = {
        x: gridX + col * (slotSize + gap),
        y: gridY + row * (slotSize + gap),
        w: slotSize,
        h: slotSize,
      };
      slots[index] = rect;
      backpackRects.push(rect);
    }
  }
  const hotbarRects = [];
  for (let col = 0; col < gridCols; col += 1) {
    const rect = {
      x: gridX + col * (slotSize + gap),
      y: hotbarY,
      w: slotSize,
      h: slotSize,
    };
    slots[col] = rect;
    hotbarRects.push(rect);
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
    backpackRects,
    hotbarRects,
    slotSize,
    gap,
    headerY,
    headerHeight,
    tabsY,
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
