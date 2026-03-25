export class WorldGatewayClient {
  constructor(nakamaClient) {
    this.nakama = nakamaClient;
  }

  async resolve(characterId = "") {
    return this.nakama.resolveWorld(characterId);
  }
}
