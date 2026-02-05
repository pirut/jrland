export class UIState {
  constructor() {
    this.showHud = true;
    this.showStatusBars = true;
    this.showHotbar = true;
    this.showInventoryReadout = true;
    this.showBuildBanner = true;
    this.showBuildCatalog = true;
    this.showChat = true;
    this.showDebug = true;
    this.showProgress = true;
    this.showNetStatus = true;
    this.inventoryOpen = false;
    this.activeHotbarIndex = 0;
    this.cursorItem = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseWorldX = 0;
    this.mouseWorldY = 0;
    this.pointerInCanvas = false;
    this.buildCatalogLayout = null;
    this.splitPicker = null;
    this.splitPickerLayout = null;
  }

  toggleInventory() {
    this.inventoryOpen = !this.inventoryOpen;
  }

  setOption(key, value) {
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      this[key] = value;
    }
  }
}
