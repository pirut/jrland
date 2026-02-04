export function getHotbarLayout(game) {
  const slotSize = 36;
  const gap = 6;
  const totalSlots = 9;
  const barWidth = totalSlots * slotSize + (totalSlots - 1) * gap;
  const startX = (game.view.width - barWidth) / 2;
  const startY = game.view.height - slotSize - 18;
  const slots = [];
  for (let i = 0; i < totalSlots; i += 1) {
    slots.push({
      x: startX + i * (slotSize + gap),
      y: startY,
      w: slotSize,
      h: slotSize,
    });
  }
  return { slotSize, gap, totalSlots, startX, startY, slots };
}
