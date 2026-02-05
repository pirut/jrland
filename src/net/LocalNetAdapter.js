import { NetAdapter } from "./NetAdapter.js";

function createClientId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  const rand = Math.floor(Math.random() * 1_000_000);
  return `local-${Date.now()}-${rand}`;
}

export class LocalNetAdapter extends NetAdapter {
  constructor({ playerId } = {}) {
    super();
    this.mode = "local";
    this.playerId = playerId ?? createClientId();
    this.connected = true;
    this.serverTime = 0;
    this.regionId = "local";
    this.pingMs = 0;
    this.actions = [];
  }

  update(dt) {
    this.serverTime += dt;
  }

  recordAction(action) {
    if (!action) return;
    this.actions.push({
      ...action,
      clientTime: performance.now(),
    });
    if (this.actions.length > 200) {
      this.actions.shift();
    }
  }

  flushActions() {
    const out = this.actions.slice();
    this.actions.length = 0;
    return out;
  }

  getStatus() {
    return {
      mode: this.mode,
      playerId: this.playerId,
      connected: this.connected,
      serverTime: Number(this.serverTime.toFixed(2)),
      regionId: this.regionId,
      pingMs: this.pingMs,
      pendingActions: this.actions.length,
    };
  }
}
