import { jrland } from "./generated/world-proto.js";

export const PB = jrland.world.v1;

export function encodeClientEnvelope(payload) {
  const message = PB.ClientEnvelope.create(payload);
  return PB.ClientEnvelope.encode(message).finish();
}

export function decodeServerEnvelope(buffer) {
  const decoded = PB.ServerEnvelope.decode(new Uint8Array(buffer));
  return PB.ServerEnvelope.toObject(decoded, {
    longs: Number,
    enums: Number,
    defaults: true,
    oneofs: true,
  });
}
