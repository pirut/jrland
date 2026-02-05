export class NetAdapter {
  constructor() {
    this.mode = "local";
    this.playerId = null;
    this.connected = false;
    this.serverTime = 0;
    this.regionId = "local";
    this.pingMs = null;
  }

  bind(game) {
    this.game = game;
  }

  update(_dt) {}

  recordAction(_action) {}

  getStatus() {
    return {
      mode: this.mode,
      playerId: this.playerId,
      connected: this.connected,
      serverTime: Number(this.serverTime.toFixed(2)),
      regionId: this.regionId,
      pingMs: this.pingMs,
      pendingActions: 0,
    };
  }
}
