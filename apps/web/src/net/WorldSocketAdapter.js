import { decodeServerEnvelope, encodeClientEnvelope } from "./protocol.js";

export class WorldSocketAdapter {
  constructor() {
    this.socket = null;
    this.sessionId = "";
    this.seq = 0;
    this.connected = false;
    this.clientName = "";
    this.handoffInFlight = false;
    this.quietCloseSockets = new Set();
    this.onWelcome = () => {};
    this.onWorldState = () => {};
    this.onChunkSnapshot = () => {};
    this.onChunkDelta = () => {};
    this.onInventoryDelta = () => {};
    this.onChat = () => {};
    this.onHandoffPrepare = () => {};
    this.onHandoffCommit = () => {};
    this.onError = () => {};
    this.onDisconnect = () => {};
  }

  async connect(endpoint, { ticket, clientName }) {
    this.clientName = clientName || this.clientName;
    if (this.socket) {
      this.disconnect();
    }
    const { socket, welcome } = await this.openSocket(endpoint, ticket, this.clientName);
    this.adoptSocket(socket, welcome);
    return welcome;
  }

  disconnect() {
    this.handoffInFlight = false;
    this.connected = false;
    this.sessionId = "";
    if (this.socket) {
      this.quietCloseSockets.add(this.socket);
      this.socket.close();
    }
    this.socket = null;
  }

  sendInput(moveX, moveZ, sprint, yaw = 0) {
    this.sendRaw({
      sessionId: this.sessionId,
      inputFrame: {
        move: {
          moveX,
          moveZ,
          sprint,
          yaw,
        },
      },
    });
  }

  sendMine(x, y, z) {
    this.sendRaw({
      sessionId: this.sessionId,
      mineCommand: { x, y, z },
    });
  }

  sendBuild(x, y, z, blockType) {
    this.sendRaw({
      sessionId: this.sessionId,
      buildCommand: { x, y, z, blockType },
    });
  }

  sendLocalChat(text) {
    this.sendRaw({
      sessionId: this.sessionId,
      chatLocal: { text },
    });
  }

  sendRaw(payload) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return;
    }
    const buffer = encodeClientEnvelope({
      seq: ++this.seq,
      clientTimeMs: Date.now(),
      ...payload,
    });
    this.socket.send(buffer);
  }

  async performHandoff(handoff) {
    if (!handoff?.nextAddress || !handoff?.ticket || this.handoffInFlight) {
      return;
    }
    this.handoffInFlight = true;
    this.onHandoffPrepare(handoff);
    try {
      const { socket, welcome } = await this.openSocket(handoff.nextAddress, handoff.ticket, this.clientName);
      const previousSocket = this.socket;
      this.adoptSocket(socket, welcome);
      if (previousSocket && previousSocket !== socket) {
        this.quietCloseSockets.add(previousSocket);
        previousSocket.close();
      }
      this.onHandoffCommit({
        nextRegionId: handoff.nextRegionId || welcome.regionId,
      });
    } catch (error) {
      const activeSocket = this.socket;
      const activeSocketUsable = activeSocket && activeSocket.readyState === WebSocket.OPEN;
      this.handoffInFlight = false;
      if (activeSocketUsable) {
        this.connected = true;
      } else {
        this.connected = false;
        this.sessionId = "";
      }
      if (this.socket?.readyState === WebSocket.CLOSED) {
        this.socket = null;
      }
      this.onError({
        code: "HANDOFF_FAILED",
        message: activeSocketUsable
          ? error.message || "Region handoff failed; staying on the current region."
          : error.message || "Region handoff failed.",
      });
      if (!this.socket) {
        this.onDisconnect();
      }
    }
  }

  adoptSocket(socket, welcome) {
    this.socket = socket;
    this.sessionId = welcome.sessionId;
    this.connected = true;
    this.handoffInFlight = false;
    this.onWelcome(welcome);
  }

  openSocket(endpoint, ticket, clientName) {
    return new Promise((resolve, reject) => {
      const socket = new WebSocket(endpoint);
      socket.binaryType = "arraybuffer";

      let resolved = false;
      socket.onopen = () => {
        this.sendRawOnSocket(socket, {
          hello: {
            ticket,
            clientName,
          },
        });
      };

      socket.onmessage = (event) => {
        const message = decodeServerEnvelope(event.data);
        if (!resolved && message.error) {
          resolved = true;
          reject(new Error(message.error.message || "World join failed."));
          socket.close();
          return;
        }
        if (!resolved && message.welcome) {
          resolved = true;
          resolve({ socket, welcome: message.welcome });
          return;
        }
        if (socket !== this.socket) {
          if (message.handoffCommit) {
            this.onHandoffCommit(message.handoffCommit);
          }
          return;
        }
        this.handleMessage(message);
      };

      socket.onerror = () => {
        if (!resolved) {
          resolved = true;
          reject(new Error("World socket failed to open."));
        } else if (socket === this.socket) {
          this.onError({ code: "WORLD_SOCKET_ERROR", message: "World socket error." });
        }
      };

      socket.onclose = () => {
        if (this.quietCloseSockets.has(socket)) {
          this.quietCloseSockets.delete(socket);
          return;
        }
        if (!resolved) {
          resolved = true;
          reject(new Error("World socket closed before welcome."));
          return;
        }
        if (socket !== this.socket) {
          return;
        }
        this.connected = false;
        this.sessionId = "";
        this.socket = null;
        if (!this.handoffInFlight) {
          this.onDisconnect();
        }
      };
    });
  }

  handleMessage(message) {
    if (message.worldState) {
      this.onWorldState(message.worldState);
      return;
    }
    if (message.chunkSnapshot) {
      this.onChunkSnapshot(message.chunkSnapshot);
      return;
    }
    if (message.chunkDelta) {
      this.onChunkDelta(message.chunkDelta);
      return;
    }
    if (message.inventoryDelta) {
      this.onInventoryDelta(message.inventoryDelta);
      return;
    }
    if (message.chat) {
      this.onChat(message.chat);
      return;
    }
    if (message.handoffPrepare) {
      this.performHandoff(message.handoffPrepare);
      return;
    }
    if (message.handoffCommit) {
      this.onHandoffCommit(message.handoffCommit);
      return;
    }
    if (message.error) {
      this.onError(message.error);
    }
  }

  sendRawOnSocket(socket, payload) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      return;
    }
    const buffer = encodeClientEnvelope({
      seq: ++this.seq,
      clientTimeMs: Date.now(),
      ...payload,
    });
    socket.send(buffer);
  }
}
