export class UIState {
  constructor() {
    this.showHud = true;
    this.showStatusBars = true;
    this.showHotbar = true;
    this.showInventoryReadout = true;
    this.showBuildBanner = true;
    this.showBuildCatalog = true;
    this.showChat = true;
    this.showDebug = false;
    this.showProgress = true;
    this.showNetStatus = false;
    this.inventoryOpen = false;
    this.inventoryTab = "all";
    this.inventoryTabLayout = null;
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
    if (!this.inventoryOpen) {
      this.inventoryTabLayout = null;
    }
  }

  setOption(key, value) {
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      this[key] = value;
    }
  }
}
