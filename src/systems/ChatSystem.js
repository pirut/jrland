export class ChatSystem {
  constructor() {
    this.messages = [];
    this.open = false;
    this.input = "";
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

  addMessage(text, author = "You") {
    if (!text) return;
    this.messages.push({ text, author, time: Date.now() });
    if (this.messages.length > 50) this.messages.shift();
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
