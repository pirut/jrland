import { CONFIG } from "../config.js";

export class NotificationCenter {
  constructor() {
    this.items = [];
  }

  push(text, duration = CONFIG.messageDuration) {
    if (!text) return;
    this.items.push({ text, time: duration });
    if (this.items.length > CONFIG.messageMax) this.items.shift();
  }

  update(dt) {
    this.items = this.items
      .map((note) => ({ ...note, time: note.time - dt }))
      .filter((note) => note.time > 0);
  }
}
