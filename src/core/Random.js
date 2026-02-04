import { lerp } from "../utils/math.js";

export class Random {
  static hash2(x, y, seed) {
    let h = x * 374761393 + y * 668265263 + seed * 1442695040888963407;
    h = (h ^ (h >> 13)) * 1274126177;
    return (h ^ (h >> 16)) >>> 0;
  }

  static mulberry32(seed) {
    let t = seed >>> 0;
    return () => {
      t += 0x6d2b79f5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  static valueNoise(x, y, seed) {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const xf = x - x0;
    const yf = y - y0;
    const h00 = Random.hash2(x0, y0, seed) / 4294967295;
    const h10 = Random.hash2(x0 + 1, y0, seed) / 4294967295;
    const h01 = Random.hash2(x0, y0 + 1, seed) / 4294967295;
    const h11 = Random.hash2(x0 + 1, y0 + 1, seed) / 4294967295;
    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);
    const x1 = lerp(h00, h10, u);
    const x2 = lerp(h01, h11, u);
    return lerp(x1, x2, v);
  }

  static fractalNoise(x, y, seed) {
    let value = 0;
    let amp = 0.6;
    let freq = 0.08;
    for (let i = 0; i < 4; i += 1) {
      value += Random.valueNoise(x * freq, y * freq, seed + i * 1013) * amp;
      amp *= 0.5;
      freq *= 2;
    }
    return value;
  }
}
