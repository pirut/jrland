export class ChatSystem {
  constructor({ onMessage } = {}) {
    this.messages = [];
    this.open = false;
    this.input = "";
    this.onMessage = onMessage ?? null;
  }

  toggle(open) {
    this.open = open;
    if (!open) {
      this.input = "";
    }
  }

  openChat() {
    this.toggle(true);
  }

  closeChat() {
    this.toggle(false);
  }

  addMessage(text, author = "You", { emit = true } = {}) {
    if (!text) return;
    const message = { text, author, time: Date.now() };
    this.messages.push(message);
    if (this.messages.length > 50) this.messages.shift();
    if (emit && this.onMessage) {
      this.onMessage(message);
    }
  }

  handleKey(event) {
    if (!this.open) return false;
    if (event.key === "Escape") {
      this.closeChat();
      return true;
    }
    if (event.key === "Enter") {
      const trimmed = this.input.trim();
      if (trimmed) {
        this.addMessage(trimmed, "You");
      }
      this.closeChat();
      return true;
    }
    if (event.key === "Backspace") {
      this.input = this.input.slice(0, -1);
      return true;
    }
    if (event.key.length === 1) {
      this.input += event.key;
      return true;
    }
    return false;
  }
}
