const AUTH_BASE = "https://auth.spacetimedb.com/oidc";
const AUTH_URL = `${AUTH_BASE}/auth`;
const TOKEN_URL = `${AUTH_BASE}/token`;

const STORAGE_KEY = "spacetimeauth_id_token";
const STATE_KEY = "spacetimeauth_state";
const VERIFIER_KEY = "spacetimeauth_verifier";
const RETURN_TO_KEY = "spacetimeauth_return_to";

const CLIENT_ID = import.meta.env.VITE_SPACETIMEAUTH_CLIENT_ID || "";
const DEFAULT_REDIRECT = `${window.location.origin}/auth/callback`;
const REDIRECT_URI = import.meta.env.VITE_SPACETIMEAUTH_REDIRECT_URI || DEFAULT_REDIRECT;

function randomString(bytes = 32) {
  const array = new Uint8Array(bytes);
  window.crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

function base64UrlEncode(input) {
  const bytes = input instanceof Uint8Array ? input : new TextEncoder().encode(input);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function sha256Base64Url(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(new Uint8Array(digest));
}

export function getStoredToken() {
  return localStorage.getItem(STORAGE_KEY);
}

export function clearStoredToken() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getProfileFromToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(payload.padEnd(payload.length + ((4 - (payload.length % 4)) % 4), "="));
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
}

export function isAuthCallback() {
  try {
    const redirectPath = new URL(REDIRECT_URI).pathname;
    return window.location.pathname === redirectPath;
  } catch (error) {
    return window.location.pathname === "/auth/callback";
  }
}

export async function beginLogin() {
  if (!CLIENT_ID) {
    throw new Error("Missing VITE_SPACETIMEAUTH_CLIENT_ID");
  }
  const state = randomString(18);
  const verifier = randomString(32);
  const challenge = await sha256Base64Url(verifier);
  sessionStorage.setItem(STATE_KEY, state);
  sessionStorage.setItem(VERIFIER_KEY, verifier);
  sessionStorage.setItem(RETURN_TO_KEY, window.location.href);

  const url = new URL(AUTH_URL);
  url.searchParams.set("client_id", CLIENT_ID);
  url.searchParams.set("redirect_uri", REDIRECT_URI);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid profile email");
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("state", state);
  url.searchParams.set("nonce", randomString(12));
  window.location.assign(url.toString());
}

export async function handleAuthCallback() {
  const params = new URLSearchParams(window.location.search);
  const error = params.get("error");
  if (error) {
    throw new Error(params.get("error_description") || error);
  }
  const code = params.get("code");
  const state = params.get("state");
  if (!code) return null;
  const expectedState = sessionStorage.getItem(STATE_KEY);
  if (!expectedState || expectedState !== state) {
    throw new Error("Invalid auth state");
  }
  const verifier = sessionStorage.getItem(VERIFIER_KEY);
  if (!verifier) {
    throw new Error("Missing PKCE verifier");
  }

  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("client_id", CLIENT_ID);
  body.set("redirect_uri", REDIRECT_URI);
  body.set("code", code);
  body.set("code_verifier", verifier);

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Token exchange failed");
  }
  const data = await response.json();
  if (!data.id_token) {
    throw new Error("Missing id_token in response");
  }
  localStorage.setItem(STORAGE_KEY, data.id_token);
  sessionStorage.removeItem(STATE_KEY);
  sessionStorage.removeItem(VERIFIER_KEY);
  const returnTo = sessionStorage.getItem(RETURN_TO_KEY) || "/";
  sessionStorage.removeItem(RETURN_TO_KEY);
  window.location.replace(returnTo);
  return data.id_token;
}
