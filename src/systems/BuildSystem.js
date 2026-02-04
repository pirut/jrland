export class BuildSystem {
  constructor() {
    this.active = false;
    this.selected = "campfire";
    this.rotation = 0;
    this.preview = null;
  }

  reset() {
    this.active = false;
    this.selected = "campfire";
    this.rotation = 0;
    this.preview = null;
  }

  rotate() {
    this.rotation = (this.rotation + 1) % 4;
  }

  updatePreview(player, world, blueprint, unlocked, requiredLevel, pointer) {
    if (!this.active || !blueprint) {
      this.preview = null;
      return;
    }
    const footprint = blueprint.footprint ?? { w: 1, h: 1 };
    const rotated = this.rotation % 2 === 1;
    const footprintW = rotated ? footprint.h : footprint.w;
    const footprintH = rotated ? footprint.w : footprint.h;
    let targetX;
    let targetY;
    if (pointer) {
      targetX = Math.floor(pointer.x);
      targetY = Math.floor(pointer.y);
    } else {
      let dirX = player.facingX;
      let dirY = player.facingY;
      if (Math.abs(dirX) + Math.abs(dirY) < 0.01) {
        dirX = 0;
        dirY = 1;
      }
      targetX = Math.floor(player.x + dirX * 1.4);
      targetY = Math.floor(player.y + dirY * 1.4);
    }
    const originX = targetX - Math.floor(footprintW / 2);
    const originY = targetY - Math.floor(footprintH / 2);
    const centerX = originX + footprintW / 2;
    const centerY = originY + footprintH / 2;
    let valid = true;
    let reason = "";
    if (!unlocked) {
      this.preview = {
        x: centerX,
        y: centerY,
        originX,
        originY,
        w: footprint.w,
        h: footprint.h,
        valid: false,
        reason: `Requires level ${requiredLevel}`,
      };
      return;
    }
    for (let y = 0; y < footprintH; y += 1) {
      for (let x = 0; x < footprintW; x += 1) {
        const tileX = originX + x;
        const tileY = originY + y;
        if (world.tileType(tileX, tileY) === "water") {
          valid = false;
          reason = "Can't build on water";
        } else if (world.resourceAtTile(tileX, tileY)) {
          valid = false;
          reason = "Clear resource first";
        }
      }
    }
    if (valid && world.hasStructureOverlap(originX, originY, footprintW, footprintH)) {
      valid = false;
      reason = "Space occupied";
    }
    const spacing = blueprint.spacing ?? blueprint.footprintRadius ?? 0.7;
    if (valid && spacing > 0 && world.isStructureNearRadius(centerX, centerY, spacing)) {
      valid = false;
      reason = "Too close to another structure";
    }
    this.preview = {
      x: centerX,
      y: centerY,
      originX,
      originY,
      w: footprintW,
      h: footprintH,
      valid,
      reason,
      rotation: this.rotation,
    };
  }
}
