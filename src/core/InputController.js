export class InputController {
  constructor() {
    this.down = new Set();
    this.pressed = new Set();
  }

  press(key) {
    if (!this.down.has(key)) {
      this.pressed.add(key);
    }
    this.down.add(key);
  }

  release(key) {
    this.down.delete(key);
  }

  isDown(key) {
    return this.down.has(key);
  }

  wasPressed(key) {
    return this.pressed.has(key);
  }

  clearPressed() {
    this.pressed.clear();
  }
}
