import { Client, Session } from "@heroiclabs/nakama-js";

function browserHostname() {
  return globalThis.location?.hostname || "127.0.0.1";
}

function browserUsesSSL() {
  return globalThis.location?.protocol === "https:";
}

function createDeviceId() {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi?.randomUUID) {
    return cryptoApi.randomUUID();
  }
  if (cryptoApi?.getRandomValues) {
    const bytes = cryptoApi.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  return `device-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadOrCreateDeviceId() {
  let deviceId = window.localStorage.getItem("jrland.device_id");
  if (!deviceId) {
    deviceId = createDeviceId();
    window.localStorage.setItem("jrland.device_id", deviceId);
  }
  return deviceId;
}

function loadOrCreateUsername() {
  let username = window.localStorage.getItem("jrland.username");
  if (!username) {
    username = createUsername();
    window.localStorage.setItem("jrland.username", username);
  }
  return username;
}

function createUsername() {
  const seed = Math.random().toString(36).slice(2, 10);
  return `ranger-${seed}`;
}

function restoreSession() {
  const authToken = window.localStorage.getItem("jrland.auth_token");
  const refreshToken = window.localStorage.getItem("jrland.refresh_token");
  if (!authToken || !refreshToken) {
    return null;
  }
  return Session.restore(authToken, refreshToken);
}

function persistSession(session) {
  window.localStorage.setItem("jrland.auth_token", session.token);
  window.localStorage.setItem("jrland.refresh_token", session.refresh_token);
}

function clearSession() {
  window.localStorage.removeItem("jrland.auth_token");
  window.localStorage.removeItem("jrland.refresh_token");
}

function isUnauthorized(error) {
  const statusCode = error?.status ?? error?.statusCode ?? error?.status_code;
  if (statusCode === 401) {
    return true;
  }
  const message = String(error?.message ?? error ?? "");
  return message.includes("401");
}

function isUsernameTaken(error) {
  const statusCode = error?.status ?? error?.statusCode ?? error?.status_code;
  if (statusCode === 409 || statusCode === 6) {
    return true;
  }
  const message = String(error?.message ?? error ?? "").toLowerCase();
  return message.includes("username is already in use");
}

export class NakamaClient {
  constructor({
    host = import.meta.env.VITE_NAKAMA_HOST ?? browserHostname(),
    port = import.meta.env.VITE_NAKAMA_PORT ?? "7350",
    serverKey = import.meta.env.VITE_NAKAMA_SERVER_KEY ?? "defaultkey",
    useSSL = import.meta.env.VITE_NAKAMA_SSL
      ? import.meta.env.VITE_NAKAMA_SSL === "true"
      : browserUsesSSL(),
  } = {}) {
    this.client = new Client(serverKey, host, port, useSSL);
    this.host = host;
    this.port = port;
    this.useSSL = useSSL;
    this.session = null;
    this.socket = null;
    this.globalChannel = null;
    this.onGlobalMessage = () => {};
  }

  getHealthcheckUrl() {
    const protocol = this.useSSL ? "https" : "http";
    return `${protocol}://${this.host}:${this.port}/healthcheck`;
  }

  async authenticate(retried = false) {
    const restored = restoreSession();
    if (restored && !restored.isexpired(Date.now() / 1000)) {
      this.session = restored;
      return restored;
    }

    const deviceId = loadOrCreateDeviceId();
    let username = loadOrCreateUsername();
    for (let attempt = 0; attempt < 5; attempt += 1) {
      try {
        this.session = await this.client.authenticateDevice(deviceId, true, username);
        window.localStorage.setItem("jrland.username", username);
        persistSession(this.session);
        return this.session;
      } catch (error) {
        if (isUsernameTaken(error)) {
          username = createUsername();
          continue;
        }
        if (!retried && isUnauthorized(error)) {
          clearSession();
          this.session = null;
          return this.authenticate(true);
        }
        throw error;
      }
    }
    throw new Error("Could not reserve a JRLand username after multiple attempts.");
  }

  async connectSocket(retried = false) {
    if (!this.session) {
      await this.authenticate();
    }
    if (this.socket) {
      return this.socket;
    }

    const socket = this.client.createSocket(this.useSSL, false);
    socket.onchannelmessage = (message) => {
      if (!this.globalChannel || message.channel_id !== this.globalChannel.id) {
        return;
      }
      let content = message.content;
      if (typeof content === "string") {
        try {
          content = JSON.parse(content);
        } catch {
          content = { text: content };
        }
      }
      this.onGlobalMessage({
        scope: "global",
        author: message.username || "global",
        text: content?.text ?? "",
      });
    };

    try {
      await socket.connect(this.session, true);
    } catch (error) {
      if (!retried && isUnauthorized(error)) {
        clearSession();
        this.session = null;
        return this.connectSocket(true);
      }
      throw error;
    }
    this.globalChannel = await socket.joinChat("global-main", 1, true, false);
    this.socket = socket;
    return socket;
  }

  async resolveWorld(characterId = "", retried = false) {
    if (!this.session) {
      await this.authenticate();
    }
    try {
      const response = await this.client.rpc(this.session, "world_resolve", { characterId });
      return response.payload;
    } catch (error) {
      if (!retried && isUnauthorized(error)) {
        clearSession();
        this.session = null;
        this.socket = null;
        this.globalChannel = null;
        return this.resolveWorld(characterId, true);
      }
      throw error;
    }
  }

  async sendGlobalChat(text) {
    if (!text || !this.socket || !this.globalChannel) {
      return;
    }
    await this.socket.writeChatMessage(this.globalChannel.id, { text });
  }
}
