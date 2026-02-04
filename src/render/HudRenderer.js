import {
  StatusBars,
  ProgressBar,
  QuestPanel,
  Hotbar,
  BuildBanner,
  WorldEventPanel,
  BuildPlanner,
  BuildCatalog,
  InventoryReadout,
  Notifications,
  ChatOverlay,
  InventoryOverlay,
  DebugPanel,
} from "../ui/hudComponents.js";

export class HudRenderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.components = [
      new StatusBars(ctx),
      new ProgressBar(ctx),
      new QuestPanel(ctx),
      new BuildBanner(ctx),
      new BuildPlanner(ctx),
      new WorldEventPanel(ctx),
      new BuildCatalog(ctx),
      new InventoryReadout(ctx),
      new Hotbar(ctx),
      new Notifications(ctx),
      new ChatOverlay(ctx),
      new InventoryOverlay(ctx),
      new DebugPanel(ctx),
    ];
  }

  draw(game, debugLines) {
    this.components.forEach((component) => component.draw(game, debugLines));
  }
}
