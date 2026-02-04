import { QUESTS } from "../config.js";

export class QuestSystem {
  constructor() {
    this.reset();
  }

  reset() {
    this.quests = QUESTS.map((quest) => ({
      ...quest,
      progress: 0,
      completed: false,
      notified: false,
    }));
  }

  getActive(limit = 3) {
    return this.quests.filter((quest) => !quest.completed).slice(0, limit);
  }

  getById(id) {
    return this.quests.find((quest) => quest.id === id);
  }

  updateQuestProgress(quest, amount = 1) {
    if (!quest || quest.completed) return false;
    quest.progress = Math.min(quest.target, quest.progress + amount);
    if (quest.progress >= quest.target) {
      quest.completed = true;
      return true;
    }
    return false;
  }

  onGather(itemId, amount = 1) {
    return this.quests
      .filter((quest) => quest.type === "gather" && quest.item === itemId)
      .map((quest) => this.updateQuestProgress(quest, amount));
  }

  onCraft(itemId, amount = 1) {
    return this.quests
      .filter((quest) => quest.type === "craft" && quest.item === itemId)
      .map((quest) => this.updateQuestProgress(quest, amount));
  }

  onBuild(structureId) {
    return this.quests
      .filter((quest) => quest.type === "build" && quest.item === structureId)
      .map((quest) => this.updateQuestProgress(quest, 1));
  }
}
