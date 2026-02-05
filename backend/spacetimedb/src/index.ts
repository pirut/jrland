import { schema, table, t, SenderError } from 'spacetimedb/server';

const playerTable = table(
  { name: 'player', public: true },
  {
    id: t.string().primaryKey(),
    identity: t.string().index(),
    name: t.string(),
    x: t.f32(),
    y: t.f32(),
    health: t.f32(),
    hunger: t.f32(),
    stamina: t.f32(),
    region: t.string().index(),
    connected: t.bool(),
    lastSeen: t.f64(),
  }
);

const inputTable = table(
  { name: 'player_input', public: true },
  {
    id: t.string().primaryKey(),
    keys: t.string(),
    hasMoveTarget: t.bool(),
    moveTargetX: t.f32(),
    moveTargetY: t.f32(),
    hasPointer: t.bool(),
    pointerX: t.f32(),
    pointerY: t.f32(),
    buildActive: t.bool(),
    buildSelected: t.string(),
    buildRotation: t.i32(),
    mode: t.string(),
    inventoryOpen: t.bool(),
    updatedAt: t.f64(),
  }
);

const chatTable = table(
  { name: 'chat', public: true },
  {
    id: t.u64().autoInc(),
    sender: t.string().index(),
    message: t.string(),
    time: t.f64(),
  }
);

const worldTable = table(
  { name: 'world', public: true },
  {
    id: t.string().primaryKey(),
    seed: t.u32(),
    timeOfDay: t.f32(),
    lastTick: t.f64(),
  }
);

export const spacetimedb = schema(playerTable, inputTable, chatTable, worldTable);

const REQUIRE_AUTH = false;

function nowMillis(ctx: { timestamp: { toMillis(): bigint } }) {
  return Number(ctx.timestamp.toMillis());
}

function ensureAuth(ctx: any) {
  if (!REQUIRE_AUTH) return null;
  if (!ctx.senderAuth?.jwt) {
    throw new SenderError('Authentication required');
  }
  return ctx.senderAuth.jwt;
}

function upsertPlayer(ctx: any, data: any) {
  const existing = ctx.db.player.id.find(data.id);
  if (existing) {
    ctx.db.player.id.update({ ...existing, ...data });
  } else {
    ctx.db.player.insert(data);
  }
}

function upsertInput(ctx: any, data: any) {
  if (!data?.id) return;
  const inputTable = ctx.db.player_input ?? ctx.db.playerInput;
  if (!inputTable) return;
  const existing = inputTable.id.find(data.id);
  if (existing) {
    inputTable.id.update({ ...existing, ...data });
  } else {
    inputTable.insert(data);
  }
}

spacetimedb.init((ctx) => {
  const existing = ctx.db.world.id.find('world');
  if (!existing) {
    ctx.db.world.insert({
      id: 'world',
      seed: 1337,
      timeOfDay: 0.25,
      lastTick: nowMillis(ctx),
    });
  }
});

spacetimedb.clientConnected((ctx) => {
  ensureAuth(ctx);
  const id = ctx.connectionId?.toHexString?.() ?? ctx.identity.toHexString();
  const identity = ctx.identity.toHexString();
  const now = nowMillis(ctx);
  upsertPlayer(ctx, {
    id,
    identity,
    name: 'Player',
    x: 0,
    y: 0,
    health: 100,
    hunger: 100,
    stamina: 100,
    region: 'region-0',
    connected: true,
    lastSeen: now,
  });
});

spacetimedb.clientDisconnected((ctx) => {
  if (REQUIRE_AUTH && !ctx.senderAuth?.jwt) {
    return;
  }
  const id = ctx.connectionId?.toHexString?.() ?? ctx.identity.toHexString();
  const existing = ctx.db.player.id.find(id);
  if (existing) {
    ctx.db.player.id.update({ ...existing, connected: false, lastSeen: nowMillis(ctx) });
  }
});

spacetimedb.reducer(
  'input_sample',
  {
    x: t.f32(),
    y: t.f32(),
    health: t.f32(),
    hunger: t.f32(),
    stamina: t.f32(),
    keys: t.string(),
    hasMoveTarget: t.bool(),
    moveTargetX: t.f32(),
    moveTargetY: t.f32(),
    hasPointer: t.bool(),
    pointerX: t.f32(),
    pointerY: t.f32(),
    buildActive: t.bool(),
    buildSelected: t.string(),
    buildRotation: t.i32(),
    mode: t.string(),
    inventoryOpen: t.bool(),
    region: t.string(),
  },
  (ctx, payload) => {
    ensureAuth(ctx);
    const id = ctx.connectionId?.toHexString?.() ?? ctx.identity.toHexString();
    const identity = ctx.identity.toHexString();
    const now = nowMillis(ctx);
    upsertPlayer(ctx, {
      id,
      identity,
      name: 'Player',
      x: payload.x,
      y: payload.y,
      health: payload.health,
      hunger: payload.hunger,
      stamina: payload.stamina,
      region: payload.region,
      connected: true,
      lastSeen: now,
    });
    upsertInput(ctx, {
      id,
      keys: payload.keys,
      hasMoveTarget: payload.hasMoveTarget,
      moveTargetX: payload.moveTargetX,
      moveTargetY: payload.moveTargetY,
      hasPointer: payload.hasPointer,
      pointerX: payload.pointerX,
      pointerY: payload.pointerY,
      buildActive: payload.buildActive,
      buildSelected: payload.buildSelected,
      buildRotation: payload.buildRotation,
      mode: payload.mode,
      inventoryOpen: payload.inventoryOpen,
      updatedAt: now,
    });
  }
);

spacetimedb.reducer(
  'send_chat',
  {
    message: t.string(),
  },
  (ctx, { message }) => {
    ensureAuth(ctx);
    const id = ctx.identity.toHexString();
    ctx.db.chat.insert({
      sender: id,
      message,
      time: nowMillis(ctx),
    });
  }
);

spacetimedb.reducer(
  'set_seed',
  {
    seed: t.u32(),
  },
  (ctx, { seed }) => {
    ensureAuth(ctx);
    const existing = ctx.db.world.id.find('world');
    const now = nowMillis(ctx);
    if (existing) {
      ctx.db.world.id.update({ ...existing, seed, lastTick: now });
    } else {
      ctx.db.world.insert({ id: 'world', seed, timeOfDay: 0.25, lastTick: now });
    }
  }
);
