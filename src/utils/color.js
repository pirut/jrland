import { lerp } from "./math.js";

export const COLOR_WHITE = { r: 255, g: 255, b: 255 };
export const COLOR_BLACK = { r: 0, g: 0, b: 0 };

export function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return { r, g, b };
}

export function mixColor(a, b, t) {
  const mix = (av, bv) => Math.round(lerp(av, bv, t));
  return `rgb(${mix(a.r, b.r)}, ${mix(a.g, b.g)}, ${mix(a.b, b.b)})`;
}

export function shadeColor(rgb, amount) {
  const target = amount >= 0 ? COLOR_WHITE : COLOR_BLACK;
  return mixColor(rgb, target, Math.abs(amount));
}
