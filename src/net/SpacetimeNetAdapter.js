import { NetAdapter } from "./NetAdapter.js";
import { DbConnection } from "../module_bindings/index.ts";

export class SpacetimeNetAdapter extends NetAdapter {
  constructor({ endpoint, regionId, moduleName, playerId, token } = {}) {
    super();
    this.mode = "spacetime";
    this.endpoint = endpoint ?? "ws://localhost:3000";
    this.regionId = regionId ?? "region-0";
    this.moduleName = moduleName ?? "jrland";
    this.playerId = playerId ?? null;
    this.token = token ?? null;
    this.connected = false;
    this.serverTime = 0;
    this.pingMs = null;
    this.pending = [];
    this.lastSnapshot = null;
    this.connection = null;
    this.lastError = null;
    this.subscription = null;
    this.worldSeedApplied = false;
    this.identityId = null;
  }

  connect() {
    if (this.connection) return;
    const builder = DbConnection.builder()
      .withUri(this.endpoint)
      .withModuleName(this.moduleName)
      .onConnect((_ctx, identity, token) => {
        this.connected = true;
        this.lastError = null;
        this.identityId = identity?.toHexString ? identity.toHexString() : identity ? String(identity) : null;
        const connectionId = this.connection?.connectionId?.toHexString?.();
        this.playerId = connectionId ?? this.identityId ?? this.playerId;
        if (token) this.token = token;
        this.setupSubscriptions();
      })
      .onDisconnect((_ctx, error) => {
        this.connected = false;
        if (error) this.lastError = error.message ?? String(error);
      })
      .onConnectError((_ctx, error) => {
        this.connected = false;
        this.lastError = error?.message ?? String(error ?? "");
      });
    if (this.token) {
      builder.withToken(this.token);
    }
    this.connection = builder.build();
  }

  disconnect() {
    if (this.connection?.disconnect) {
      this.connection.disconnect();
    } else if (this.connection?.close) {
      this.connection.close();
    }
    if (this.subscription?.unsubscribe) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
    this.connection = null;
    this.connected = false;
  }

  update(dt) {
    this.serverTime += dt;
    if (!this.connected || !this.connection) return;
    if (!this.pending.length) return;
    const queue = this.flushActions();
    queue.forEach((action) => {
      if (!action?.type) return;
      if (action.type === "input_sample") {
        this.connection.reducers?.inputSample?.(this.coerceInputPayload(action.payload));
        return;
      }
      if (action.type === "chat") {
        const message = action.payload?.text ?? action.payload?.message ?? "";
        if (message) {
          this.connection.reducers?.sendChat?.({ message });
        }
      }
    });
  }

  recordAction(action) {
    if (!action) return;
    this.pending.push({ ...action, sent: false });
    if (this.pending.length > 500) {
      this.pending.shift();
    }
  }

  flushActions() {
    const out = this.pending.slice();
    this.pending.length = 0;
    return out;
  }

  applySnapshot(snapshot) {
    if (!snapshot) return;
    this.lastSnapshot = snapshot;
    if (typeof snapshot.serverTime === "number") {
      this.serverTime = snapshot.serverTime;
    }
    if (typeof snapshot.pingMs === "number") {
      this.pingMs = snapshot.pingMs;
    }
    if (snapshot.regionId) {
      this.regionId = snapshot.regionId;
    }
    if (!this.game) return;
    if (Array.isArray(snapshot.players)) {
      this.game.setRemotePlayers(snapshot.players);
    }
  }

  setupSubscriptions() {
    if (!this.connection || this.subscription) return;
    this.subscription = this.connection
      .subscriptionBuilder()
      .onApplied(() => {
        this.syncWorld();
        this.syncRemotePlayers();
      })
      .onError((_ctx) => {
        this.lastError = "Subscription error";
      })
      .subscribe([
        "SELECT * FROM player",
        "SELECT * FROM chat",
        "SELECT * FROM world",
      ]);

    const playerTable = this.connection.db?.player;
    if (playerTable) {
      playerTable.onInsert(() => this.syncRemotePlayers());
      playerTable.onUpdate(() => this.syncRemotePlayers());
      playerTable.onDelete(() => this.syncRemotePlayers());
    }
    const chatTable = this.connection.db?.chat;
    if (chatTable && this.game?.chat) {
      chatTable.onInsert((_ctx, row) => {
        const author = row.sender === this.playerId ? "You" : row.sender;
        this.game.chat.addMessage(row.message, author, { emit: false });
      });
    }
    const worldTable = this.connection.db?.world;
    if (worldTable) {
      worldTable.onInsert(() => this.syncWorld());
      worldTable.onUpdate(() => this.syncWorld());
    }
  }

  syncRemotePlayers() {
    if (!this.connection || !this.game) return;
    const players = [];
    for (const row of this.connection.db.player.iter()) {
      if (row.id === this.playerId) continue;
      if (row.connected === false) continue;
      players.push({
        id: row.id,
        name: row.name ?? null,
        x: row.x,
        y: row.y,
        health: row.health,
      });
    }
    this.game.setRemotePlayers(players);
  }

  syncWorld() {
    if (!this.connection || !this.game) return;
    const worldRow = this.connection.db.world.iter().next().value;
    if (!worldRow) return;
    const seed = Number(worldRow.seed ?? 1337);
    if (!this.worldSeedApplied || this.game.seed !== seed) {
      this.worldSeedApplied = true;
      this.game.seed = seed;
      this.game.resetWorld(seed);
      this.game.notifications?.push?.("World synced");
    }
  }

  coerceInputPayload(payload) {
    const moveTarget = payload?.moveTarget ?? null;
    const pointer = payload?.pointer ?? null;
    const player = payload?.player ?? {};
    return {
      x: player.x ?? 0,
      y: player.y ?? 0,
      health: player.health ?? 100,
      hunger: player.hunger ?? 100,
      stamina: player.stamina ?? 100,
      keys: Array.isArray(payload?.keys) ? payload.keys.join(",") : "",
      hasMoveTarget: Boolean(moveTarget),
      moveTargetX: moveTarget?.x ?? 0,
      moveTargetY: moveTarget?.y ?? 0,
      hasPointer: Boolean(pointer),
      pointerX: pointer?.x ?? 0,
      pointerY: pointer?.y ?? 0,
      buildActive: Boolean(payload?.build?.active),
      buildSelected: payload?.build?.selected ?? "campfire",
      buildRotation: payload?.build?.rotation ?? 0,
      mode: payload?.mode ?? "playing",
      inventoryOpen: Boolean(payload?.inventoryOpen),
      region: this.regionId ?? "region-0",
    };
  }

  getStatus() {
    return {
      mode: this.mode,
      playerId: this.playerId,
      connected: this.connected,
      serverTime: Number(this.serverTime.toFixed(2)),
      regionId: this.regionId,
      pingMs: this.pingMs,
      pendingActions: this.pending.length,
      endpoint: this.endpoint,
      moduleName: this.moduleName,
      lastError: this.lastError,
      identityId: this.identityId,
    };
  }
}
