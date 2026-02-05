import { CONFIG, BUILDINGS, PALETTE } from "../config.js";
import { Random } from "../core/Random.js";
import { clamp, roundedRect, formatClock } from "../utils/math.js";
import { hexToRgb, shadeColor } from "../utils/color.js";

const paletteRgb = Object.fromEntries(
  Object.entries(PALETTE).map(([key, value]) => [key, hexToRgb(value)])
);

export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  getViewBounds(game, tileSize) {
    const halfW = game.view.width / tileSize / 2;
    const halfH = game.view.height / tileSize / 2;
    return {
      minX: game.camera.x - halfW - 1,
      maxX: game.camera.x + halfW + 1,
      minY: game.camera.y - halfH - 1,
      maxY: game.camera.y + halfH + 1,
    };
  }

  getTileColor(type, biome) {
    const base = paletteRgb[type];
    if (!base) return PALETTE[type];
    if (biome === "prairie") {
      if (type === "grass") return shadeColor(base, 0.12);
      if (type === "dirt") return shadeColor(base, 0.08);
    }
    if (biome === "highland") {
      if (type === "grass") return shadeColor(base, -0.08);
      if (type === "dirt") return shadeColor(base, -0.12);
      if (type === "rock") return shadeColor(base, 0.08);
    }
    if (biome === "coastal") {
      if (type === "sand") return shadeColor(base, 0.05);
      if (type === "grass") return shadeColor(base, 0.06);
    }
    return PALETTE[type];
  }

  drawWorld(game, tileSize) {
    const bounds = this.getViewBounds(game, tileSize);
    const minTileX = Math.floor(bounds.minX);
    const maxTileX = Math.floor(bounds.maxX);
    const minTileY = Math.floor(bounds.minY);
    const maxTileY = Math.floor(bounds.maxY);
    for (let ty = minTileY; ty <= maxTileY; ty += 1) {
      for (let tx = minTileX; tx <= maxTileX; tx += 1) {
        const type = game.world.tileType(tx, ty);
        const biome = game.world.getBiome(tx, ty, type);
        this.ctx.fillStyle = this.getTileColor(type, biome);
        this.ctx.fillRect(
          (tx - bounds.minX) * tileSize,
          (ty - bounds.minY) * tileSize,
          tileSize + 0.5,
          tileSize + 0.5
        );
        const wear = game.world.getPathWear(tx, ty);
        const threshold = CONFIG.paths?.wearThreshold ?? 8;
        const maxWear = CONFIG.paths?.maxWear ?? 20;
        if (wear > threshold && (type === "grass" || type === "dirt" || type === "sand")) {
          const ratio = clamp((wear - threshold) / Math.max(1, maxWear - threshold), 0, 1);
          const baseAlpha = type === "sand" ? 0.08 : 0.14;
          const alpha = baseAlpha + ratio * 0.25;
          const color = type === "sand" ? "rgba(160, 150, 132," : "rgba(122, 112, 98,";
          this.ctx.fillStyle = `${color}${alpha})`;
          this.ctx.fillRect(
            (tx - bounds.minX) * tileSize,
            (ty - bounds.minY) * tileSize,
            tileSize + 0.5,
            tileSize + 0.5
          );
        }
        if (type === "water") {
          const shimmer =
            0.04 +
            0.08 *
              (0.5 + 0.5 * Math.sin(game.weather.fxTime * 1.5 + tx * 0.4 + ty * 0.35));
          this.ctx.fillStyle = `rgba(255, 255, 255, ${shimmer})`;
          this.ctx.fillRect(
            (tx - bounds.minX) * tileSize,
            (ty - bounds.minY) * tileSize,
            tileSize + 0.5,
            tileSize + 0.5
          );
        }
      }
    }

    const chunks = game.world.getChunksInView(bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
    for (const chunk of chunks) {
      for (const entity of chunk.entities) {
        if (chunk.removed.has(entity.id)) continue;
        if (
          entity.x < bounds.minX ||
          entity.x > bounds.maxX ||
          entity.y < bounds.minY ||
          entity.y > bounds.maxY
        ) {
          continue;
        }
        const px = (entity.x - bounds.minX) * tileSize;
        const py = (entity.y - bounds.minY) * tileSize;
        const biome = game.world.getBiome(Math.floor(entity.x), Math.floor(entity.y));
        if (entity.type === "tree") {
          const canopy =
            biome === "prairie"
              ? "#3f5d45"
              : biome === "highland"
                ? "#2b4331"
                : "#2f4f39";
          this.ctx.fillStyle = canopy;
          this.ctx.beginPath();
          this.ctx.arc(px, py - tileSize * 0.15, tileSize * 0.3, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.fillStyle = "#7b5a3b";
          this.ctx.fillRect(px - tileSize * 0.08, py - tileSize * 0.02, tileSize * 0.16, tileSize * 0.26);
        } else if (entity.type === "berrybush") {
          this.ctx.fillStyle = "#3f5d45";
          this.ctx.beginPath();
          this.ctx.arc(px, py, tileSize * 0.22, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.fillStyle = "#c14456";
          this.ctx.beginPath();
          this.ctx.arc(px - tileSize * 0.08, py - tileSize * 0.05, tileSize * 0.06, 0, Math.PI * 2);
          this.ctx.arc(px + tileSize * 0.06, py + tileSize * 0.02, tileSize * 0.05, 0, Math.PI * 2);
          this.ctx.fill();
        } else if (entity.type === "boulder") {
          this.ctx.fillStyle = biome === "highland" ? "#747a80" : "#6f7376";
          this.ctx.beginPath();
          this.ctx.ellipse(px, py, tileSize * 0.28, tileSize * 0.22, 0.3, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }

    return bounds;
  }

  drawStructureShadow(x, y, width, height) {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(0,0,0,0.18)";
    this.ctx.fillRect(x + 3, y + height - 6, width - 6, 10);
    this.ctx.restore();
  }

  drawStructuresBase(game, tileSize, bounds) {
    const structures = game.world.getStructuresInView(bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
    structures.forEach((structure) => {
      const originX = structure.originX ?? structure.x - 0.5;
      const originY = structure.originY ?? structure.y - 0.5;
      const w = structure.w ?? 1;
      const h = structure.h ?? 1;
      if (
        originX + w < bounds.minX ||
        originX > bounds.maxX ||
        originY + h < bounds.minY ||
        originY > bounds.maxY
      ) {
        return;
      }
      const px = (originX - bounds.minX) * tileSize;
      const py = (originY - bounds.minY) * tileSize;
      const width = w * tileSize;
      const height = h * tileSize;
      const centerX = (structure.x - bounds.minX) * tileSize;
      const centerY = (structure.y - bounds.minY) * tileSize;
      this.drawStructureShadow(px, py, width, height);
      if (structure.type === "campfire") {
        const flicker = 0.5 + 0.5 * Math.sin(game.weather.fxTime * 6 + structure.x * 0.4);
        this.ctx.fillStyle = `rgba(255, 193, 112, ${0.2 + flicker * 0.2})`;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, tileSize * 0.75, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = "rgba(255, 185, 92, 0.9)";
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, tileSize * 0.18, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = "rgba(140, 86, 45, 0.8)";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, tileSize * 0.3, 0, Math.PI * 2);
        this.ctx.stroke();
      } else if (structure.type === "shelter") {
        const base = BUILDINGS.shelter?.baseSize ?? { w: 0.9, h: 0.5 };
        this.ctx.fillStyle = "rgba(121, 106, 88, 0.92)";
        this.ctx.fillRect(
          centerX - (base.w * tileSize) / 2,
          centerY - (base.h * tileSize) / 2,
          base.w * tileSize,
          base.h * tileSize
        );
        this.ctx.fillStyle = "rgba(88, 73, 60, 0.85)";
        this.ctx.fillRect(
          centerX - (base.w * tileSize) / 3,
          centerY - (base.h * tileSize) / 2,
          (base.w * tileSize) / 1.5,
          (base.h * tileSize) / 3
        );
      } else if (structure.type === "workbench") {
        const base = BUILDINGS.workbench?.baseSize ?? { w: 0.7, h: 0.35 };
        this.ctx.fillStyle = "rgba(122, 96, 68, 0.9)";
        this.ctx.fillRect(
          centerX - (base.w * tileSize) / 2,
          centerY - (base.h * tileSize) / 2,
          base.w * tileSize,
          base.h * tileSize
        );
        this.ctx.fillStyle = "rgba(85, 67, 48, 0.9)";
        this.ctx.fillRect(
          centerX - (base.w * tileSize) / 2,
          centerY - (base.h * tileSize) / 2,
          base.w * tileSize,
          (base.h * tileSize) / 3
        );
      } else if (structure.type === "hut") {
        const base = BUILDINGS.hut?.baseSize ?? { w: 1.1, h: 0.65 };
        this.ctx.fillStyle = "rgba(110, 92, 75, 0.92)";
        this.ctx.fillRect(
          centerX - (base.w * tileSize) / 2,
          centerY - (base.h * tileSize) / 2,
          base.w * tileSize,
          base.h * tileSize
        );
        this.ctx.fillStyle = "rgba(84, 68, 52, 0.92)";
        this.ctx.fillRect(
          centerX - (base.w * tileSize) / 4,
          centerY - (base.h * tileSize) / 4,
          (base.w * tileSize) / 2,
          (base.h * tileSize) / 2
        );
      } else if (structure.type === "lean_to") {
        const base = BUILDINGS.lean_to?.baseSize ?? { w: 0.9, h: 0.4 };
        this.ctx.fillStyle = "rgba(116, 96, 76, 0.9)";
        this.ctx.fillRect(
          centerX - (base.w * tileSize) / 2,
          centerY - (base.h * tileSize) / 2,
          base.w * tileSize,
          base.h * tileSize
        );
        this.ctx.fillStyle = "rgba(86, 70, 54, 0.9)";
        this.ctx.fillRect(
          centerX - (base.w * tileSize) / 2,
          centerY - (base.h * tileSize) / 2,
          base.w * tileSize,
          (base.h * tileSize) / 3
        );
      } else if (structure.type === "storage_crate") {
        this.ctx.fillStyle = "rgba(132, 103, 74, 0.9)";
        this.ctx.fillRect(px + tileSize * 0.15, py + tileSize * 0.25, width - tileSize * 0.3, height - tileSize * 0.3);
        this.ctx.fillStyle = "rgba(96, 74, 52, 0.9)";
        this.ctx.fillRect(px + tileSize * 0.15, py + tileSize * 0.25, width - tileSize * 0.3, tileSize * 0.12);
      } else if (structure.type === "wood_wall") {
        this.ctx.fillStyle = "rgba(104, 78, 54, 0.95)";
        this.ctx.fillRect(px + tileSize * 0.1, py + tileSize * 0.1, width - tileSize * 0.2, height - tileSize * 0.2);
        this.ctx.fillStyle = "rgba(86, 64, 44, 0.9)";
        this.ctx.fillRect(px + tileSize * 0.1, py + tileSize * 0.1, width - tileSize * 0.2, tileSize * 0.12);
      } else if (structure.type === "wood_gate") {
        if (structure.open) {
          this.ctx.fillStyle = "rgba(112, 86, 60, 0.9)";
          this.ctx.fillRect(px + tileSize * 0.12, py + tileSize * 0.12, tileSize * 0.18, height - tileSize * 0.24);
          this.ctx.fillRect(px + width - tileSize * 0.3, py + tileSize * 0.12, tileSize * 0.18, height - tileSize * 0.24);
          this.ctx.strokeStyle = "rgba(68, 52, 38, 0.9)";
          this.ctx.strokeRect(px + tileSize * 0.1, py + tileSize * 0.12, width - tileSize * 0.2, height - tileSize * 0.24);
        } else {
          this.ctx.fillStyle = "rgba(112, 86, 60, 0.95)";
          this.ctx.fillRect(px + tileSize * 0.1, py + tileSize * 0.1, width - tileSize * 0.2, height - tileSize * 0.2);
          this.ctx.strokeStyle = "rgba(68, 52, 38, 0.9)";
          this.ctx.strokeRect(px + tileSize * 0.2, py + tileSize * 0.2, width - tileSize * 0.4, height - tileSize * 0.4);
        }
      }
    });
  }

  drawStructuresCanopy(game, tileSize, bounds) {
    const structures = game.world.getStructuresInView(bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
    structures.forEach((structure) => {
      const blueprint = BUILDINGS[structure.type];
      if (!blueprint?.canopy && !blueprint?.roof) return;
      const originX = structure.originX ?? structure.x - 0.5;
      const originY = structure.originY ?? structure.y - 0.5;
      const w = structure.w ?? 1;
      const h = structure.h ?? 1;
      if (
        originX + w < bounds.minX ||
        originX > bounds.maxX ||
        originY + h < bounds.minY ||
        originY > bounds.maxY
      ) {
        return;
      }
      const roof = blueprint.roof ?? { w, h, offsetY: 0 };
      const roofCenterX = structure.x;
      const roofCenterY = structure.y + (roof.offsetY ?? 0);
      const under =
        Math.abs(game.player.x - roofCenterX) <= (roof.w ?? w) / 2 &&
        Math.abs(game.player.y - roofCenterY) <= (roof.h ?? h) / 2;
      const alpha = under ? 0.3 : 0.9;
      const px = (roofCenterX - bounds.minX) * tileSize;
      const py = (roofCenterY - bounds.minY) * tileSize;
      const roofW = (roof.w ?? w) * tileSize;
      const roofH = (roof.h ?? h) * tileSize;
      this.ctx.save();
      this.ctx.fillStyle = `rgba(28, 24, 22, ${0.12 + alpha * 0.2})`;
      this.ctx.fillRect(px - roofW / 2 + tileSize * 0.1, py - roofH / 2 + tileSize * 0.1, roofW, roofH);
      this.ctx.fillStyle = `rgba(96, 82, 68, ${alpha})`;
      this.ctx.fillRect(px - roofW / 2, py - roofH / 2, roofW, roofH);
      this.ctx.strokeStyle = `rgba(60, 48, 36, ${Math.min(1, alpha + 0.1)})`;
      this.ctx.strokeRect(px - roofW / 2, py - roofH / 2, roofW, roofH);
      this.ctx.restore();
    });
  }

  drawTrails(game, tileSize, bounds) {
    const trails = game.creatures?.getTrailsInView?.(bounds) ?? [];
    if (!trails.length) return;
    this.ctx.save();
    trails.forEach((trail) => {
      const px = (trail.x - bounds.minX) * tileSize;
      const py = (trail.y - bounds.minY) * tileSize;
      const fade = 1 - trail.age / trail.ttl;
      const alpha = 0.15 + fade * 0.45 * trail.strength;
      const size = trail.type === "scent" ? tileSize * 0.12 : tileSize * 0.16;
      const color =
        trail.type === "scent"
          ? `rgba(90, 126, 120, ${alpha * 0.75})`
          : `rgba(68, 60, 50, ${alpha})`;
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.ellipse(px, py, size, size * 0.7, 0, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.restore();
  }

  drawDens(game, tileSize, bounds) {
    const dens = game.world.getDensInView?.(bounds.minX, bounds.minY, bounds.maxX, bounds.maxY) ?? [];
    if (!dens.length) return;
    this.ctx.save();
    dens.forEach((den) => {
      const px = (den.x - bounds.minX) * tileSize;
      const py = (den.y - bounds.minY) * tileSize;
      const radius = tileSize * 0.3;
      this.ctx.fillStyle = "rgba(48, 44, 40, 0.9)";
      this.ctx.beginPath();
      this.ctx.ellipse(px, py + tileSize * 0.08, radius, radius * 0.6, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = "rgba(24, 20, 18, 0.8)";
      this.ctx.stroke();
    });
    this.ctx.restore();
  }

  drawCarcasses(game, tileSize, bounds) {
    const carcasses = game.creatures?.getCarcassesInView?.(bounds) ?? [];
    if (!carcasses.length) return;
    this.ctx.save();
    carcasses.forEach((carcass) => {
      const px = (carcass.x - bounds.minX) * tileSize;
      const py = (carcass.y - bounds.minY) * tileSize;
      const ratio = carcass.nutrition / carcass.maxNutrition;
      const alpha = 0.25 + ratio * 0.45;
      this.ctx.fillStyle = `rgba(92, 70, 58, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.ellipse(px, py + tileSize * 0.08, tileSize * 0.28, tileSize * 0.18, 0.2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.fillStyle = `rgba(64, 52, 44, ${alpha})`;
      this.ctx.fillRect(px - tileSize * 0.12, py - tileSize * 0.02, tileSize * 0.24, tileSize * 0.08);
    });
    this.ctx.restore();
  }

  drawCreatures(game, tileSize, bounds) {
    const creatures = game.creatures?.getActiveCreatures?.() ?? [];
    creatures.forEach((creature) => {
      if (
        creature.x < bounds.minX ||
        creature.x > bounds.maxX ||
        creature.y < bounds.minY ||
        creature.y > bounds.maxY
      ) {
        return;
      }
      const px = (creature.x - bounds.minX) * tileSize;
      const py = (creature.y - bounds.minY) * tileSize;
      const baseColor =
        creature.type === "wolf" ? "rgba(70, 76, 78, 0.9)" : "rgba(48, 54, 52, 0.9)";
      const bodyColor = creature.hitFlash > 0 ? "rgba(195, 94, 94, 0.9)" : baseColor;
      this.ctx.save();
      this.ctx.fillStyle = "rgba(0,0,0,0.2)";
      this.ctx.beginPath();
      this.ctx.ellipse(px, py + tileSize * 0.18, tileSize * 0.35, tileSize * 0.2, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.fillStyle = bodyColor;
      this.ctx.beginPath();
      this.ctx.ellipse(px, py, tileSize * 0.28, tileSize * 0.2, 0.2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.fillStyle = creature.type === "wolf" ? "rgba(120, 125, 126, 0.9)" : "rgba(85, 90, 88, 0.9)";
      this.ctx.beginPath();
      this.ctx.arc(px - tileSize * 0.18, py - tileSize * 0.02, tileSize * 0.08, 0, Math.PI * 2);
      this.ctx.arc(px + tileSize * 0.18, py - tileSize * 0.02, tileSize * 0.08, 0, Math.PI * 2);
      this.ctx.fill();

      const moodColors = {
        eat: "rgba(108, 168, 112, 0.9)",
        drink: "rgba(96, 148, 168, 0.9)",
        rest: "rgba(140, 140, 140, 0.8)",
        graze: "rgba(118, 174, 118, 0.8)",
        track: "rgba(96, 130, 126, 0.85)",
        hunt: "rgba(176, 90, 70, 0.9)",
        chase: "rgba(184, 86, 72, 0.9)",
        defend: "rgba(168, 84, 64, 0.9)",
        flee: "rgba(186, 138, 72, 0.9)",
      };
      const mood = moodColors[creature.state];
      if (mood) {
        this.ctx.fillStyle = mood;
        this.ctx.beginPath();
        this.ctx.arc(px, py - tileSize * 0.32, tileSize * 0.08, 0, Math.PI * 2);
        this.ctx.fill();
      }

      if (creature.health < creature.maxHealth) {
        const ratio = creature.health / creature.maxHealth;
        const barWidth = tileSize * 0.6;
        this.ctx.fillStyle = "rgba(255,255,255,0.6)";
        this.ctx.fillRect(px - barWidth / 2, py - tileSize * 0.45, barWidth, 4);
        this.ctx.fillStyle = "rgba(185, 72, 60, 0.8)";
        this.ctx.fillRect(px - barWidth / 2, py - tileSize * 0.45, barWidth * ratio, 4);
      }
      this.ctx.restore();
    });
  }

  drawBuildPreview(game, tileSize, bounds) {
    if (!game.build.active || !game.build.preview) return;
    const preview = game.build.preview;
    const px = (preview.originX - bounds.minX) * tileSize;
    const py = (preview.originY - bounds.minY) * tileSize;
    const width = preview.w * tileSize;
    const height = preview.h * tileSize;
    const color = preview.valid ? "rgba(84, 150, 108, 0.6)" : "rgba(180, 80, 64, 0.6)";
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = preview.valid ? "rgba(84, 150, 108, 0.18)" : "rgba(180, 80, 64, 0.18)";
    this.ctx.lineWidth = 2;
    if (game.build.selected === "campfire") {
      const centerX = px + width / 2;
      const centerY = py + height / 2;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, tileSize * 0.35, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    } else {
      this.ctx.fillRect(px, py, width, height);
      this.ctx.strokeRect(px, py, width, height);
    }
    this.ctx.strokeStyle = preview.valid ? "rgba(84,150,108,0.35)" : "rgba(180,80,64,0.35)";
    this.ctx.lineWidth = 1;
    for (let y = 0; y < preview.h; y += 1) {
      for (let x = 0; x < preview.w; x += 1) {
        this.ctx.strokeRect(px + x * tileSize, py + y * tileSize, tileSize, tileSize);
      }
    }
    this.ctx.restore();
  }

  drawInteractionHighlight(game, tileSize, bounds) {
    if (game.build.active) return;
    const target = game.interaction.target;
    if (!target || !game.interaction.inRange) return;
    const px = (target.x - bounds.minX) * tileSize;
    const py = (target.y - bounds.minY) * tileSize;
    const pulse = 0.6 + 0.4 * Math.sin(game.weather.fxTime * 5);
    this.ctx.save();
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 + pulse * 0.4})`;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(px, py, tileSize * 0.45, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.fillStyle = `rgba(15, 20, 23, ${0.6 + pulse * 0.3})`;
    this.ctx.font = "12px 'Manrope', sans-serif";
    const keyLabel = game.interaction.kind === "enemy" ? "Space" : "E";
    this.ctx.fillText(keyLabel, px - (game.interaction.kind === "enemy" ? 16 : 3), py - tileSize * 0.55);
    if (game.interaction.kind === "structure") {
      const label =
        target.type === "campfire"
          ? "Rest"
          : target.type === "shelter"
            ? "Rest"
            : target.type === "workbench"
              ? "Craft"
              : target.type === "hut"
                ? "Sleep"
                : "Use";
      this.ctx.fillText(label, px - 14, py + tileSize * 0.65);
    }
    if (game.interaction.kind === "enemy") {
      this.ctx.fillText("Attack", px - 16, py + tileSize * 0.65);
    }
    this.ctx.restore();
  }

  drawMoveTarget(game, tileSize, bounds) {
    const target = game.player.moveTarget;
    if (!target) return;
    if (
      target.x < bounds.minX ||
      target.x > bounds.maxX ||
      target.y < bounds.minY ||
      target.y > bounds.maxY
    ) {
      return;
    }
    const px = (target.x - bounds.minX) * tileSize;
    const py = (target.y - bounds.minY) * tileSize;
    this.ctx.save();
    this.ctx.strokeStyle = "rgba(47,111,79,0.6)";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(px, py, tileSize * 0.35, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawRemotePlayers(game, tileSize, bounds) {
    if (!game.remotePlayers || game.remotePlayers.size === 0) return;
    this.ctx.save();
    this.ctx.strokeStyle = "rgba(120, 200, 220, 0.8)";
    this.ctx.fillStyle = "rgba(70, 120, 140, 0.85)";
    this.ctx.lineWidth = 2;
    game.remotePlayers.forEach((player) => {
      if (
        player.x < bounds.minX ||
        player.x > bounds.maxX ||
        player.y < bounds.minY ||
        player.y > bounds.maxY
      ) {
        return;
      }
      const px = (player.x - bounds.minX) * tileSize;
      const py = (player.y - bounds.minY) * tileSize;
      const radius = tileSize * 0.3;
      this.ctx.beginPath();
      this.ctx.arc(px, py, radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(px, py, radius * 0.6, 0, Math.PI * 2);
      this.ctx.stroke();
    });
    this.ctx.restore();
  }

  drawPlayer(game, tileSize, bounds) {
    const px = (game.player.x - bounds.minX) * tileSize;
    const py = (game.player.y - bounds.minY) * tileSize;
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
    this.ctx.beginPath();
    this.ctx.ellipse(px, py + tileSize * 0.18, tileSize * 0.35, tileSize * 0.2, 0, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.fillStyle = "#1f2a30";
    this.ctx.beginPath();
    this.ctx.arc(px, py, tileSize * game.player.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = "rgba(255,255,255,0.5)";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(px, py, tileSize * game.player.radius * 0.6, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  drawWeatherOverlay(game) {
    if (game.weather.type === "overcast") {
      this.ctx.fillStyle = "rgba(90, 99, 104, 0.18)";
      this.ctx.fillRect(0, 0, game.view.width, game.view.height);
      return;
    }
    if (game.weather.type === "fog") {
      this.ctx.fillStyle = "rgba(210, 214, 210, 0.18)";
      this.ctx.fillRect(0, 0, game.view.width, game.view.height);
      this.ctx.fillStyle = "rgba(180, 190, 190, 0.12)";
      this.ctx.fillRect(0, 0, game.view.width, game.view.height * 0.6);
      return;
    }
    if (game.weather.type === "storm") {
      this.ctx.fillStyle = "rgba(60, 70, 74, 0.28)";
      this.ctx.fillRect(0, 0, game.view.width, game.view.height);
      const flash = 0.5 + 0.5 * Math.sin(game.weather.fxTime * 5);
      if (flash > 0.92) {
        this.ctx.fillStyle = "rgba(240, 240, 255, 0.35)";
        this.ctx.fillRect(0, 0, game.view.width, game.view.height);
      }
    }
    if (game.weather.type !== "rain" && game.weather.type !== "storm") return;
    this.ctx.fillStyle = "rgba(70, 82, 86, 0.22)";
    this.ctx.fillRect(0, 0, game.view.width, game.view.height);
    this.ctx.strokeStyle = "rgba(190, 210, 220, 0.4)";
    this.ctx.lineWidth = 1;
    const dropCount = 70;
    const tick = Math.floor(game.weather.fxTime * 12);
    for (let i = 0; i < dropCount; i += 1) {
      const hx = Random.hash2(i, tick, game.seed) / 4294967295;
      const hy = Random.hash2(i, tick + 91, game.seed) / 4294967295;
      const x = hx * game.view.width;
      const y = hy * game.view.height;
      const length = 10 + hx * 12;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x - 3, y + length);
      this.ctx.stroke();
    }
  }

  drawTimeOfDayOverlay(game) {
    const phase = game.timeOfDay * Math.PI * 2;
    const sun = Math.sin(phase);
    const daylight = clamp((sun + 0.15) / 1.15, 0, 1);
    const darkness = 1 - daylight;
    const twilight = clamp(1 - Math.abs(sun), 0, 1);
    this.ctx.fillStyle = `rgba(19, 29, 33, ${0.12 + darkness * 0.35})`;
    this.ctx.fillRect(0, 0, game.view.width, game.view.height);
    this.ctx.fillStyle = `rgba(234, 173, 96, ${twilight * 0.18})`;
    this.ctx.fillRect(0, 0, game.view.width, game.view.height);
    if (game.isNightTime()) {
      this.ctx.fillStyle = `rgba(14, 22, 32, ${0.08 + darkness * 0.2})`;
      this.ctx.fillRect(0, 0, game.view.width, game.view.height);
    }
    if (game.worldEvents?.activeEvent) {
      this.ctx.fillStyle = "rgba(96, 46, 42, 0.12)";
      this.ctx.fillRect(0, 0, game.view.width, game.view.height);
    }
  }

  render(game) {
    this.ctx.clearRect(0, 0, game.view.width, game.view.height);
    const scale = Math.min(game.view.width / 960, game.view.height / 540);
    const tileSize = CONFIG.baseTileSize * clamp(scale, 0.8, 1.2);
    const bounds = this.drawWorld(game, tileSize);
    this.drawStructuresBase(game, tileSize, bounds);
    this.drawTrails(game, tileSize, bounds);
    this.drawDens(game, tileSize, bounds);
    this.drawCarcasses(game, tileSize, bounds);
    this.drawCreatures(game, tileSize, bounds);
    this.drawRemotePlayers(game, tileSize, bounds);
    this.drawBuildPreview(game, tileSize, bounds);
    this.drawMoveTarget(game, tileSize, bounds);
    this.drawInteractionHighlight(game, tileSize, bounds);
    this.drawPlayer(game, tileSize, bounds);
    this.drawStructuresCanopy(game, tileSize, bounds);
    this.drawTimeOfDayOverlay(game);
    this.drawWeatherOverlay(game);
    return { bounds, tileSize };
  }

  getDebugLines(game) {
    const biome = game.world.getBiome(Math.floor(game.player.x), Math.floor(game.player.y));
    const band = game.world.biomeBand(Math.floor(game.player.x), Math.floor(game.player.y));
    const nearby = [
      game.structureContext.nearCampfire ? "Campfire" : null,
      game.structureContext.nearShelter ? "Shelter" : null,
      game.structureContext.nearWorkbench ? "Workbench" : null,
    ]
      .filter(Boolean)
      .join(" & ");
    const phase = game.isNightTime() ? "Night" : "Day";
    const eventLabel = game.worldEvents?.activeEvent?.label ?? "None";
    const season = game.season?.name ?? "unknown";
    const drought = game.season?.drought ? "Yes" : "No";
    return [
      `Time ${formatClock(game.timeOfDay)}`,
      `Phase ${phase}`,
      `Biome ${biome}`,
      `Band ${band}`,
      `Weather ${game.weather.type}`,
      `Season ${season}`,
      `Drought ${drought}`,
      `Level ${game.progression.level}`,
      `Event ${eventLabel}`,
      `Near ${nearby || "None"}`,
      `Under ${game.structureContext.underCanopy ? "Canopy" : "Open"}`,
    ];
  }
}
