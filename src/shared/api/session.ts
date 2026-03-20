const ACCESS_TOKEN_KEY = "access_token";
const LEGACY_TOKEN_KEY = "token";

function isBrowser() {
  return typeof window !== "undefined";
}

function notifyAuthChange() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event("focus"));
}

export function getAccessToken() {
  if (!isBrowser()) return null;

  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  if (accessToken) return accessToken;

  const legacyToken = window.localStorage.getItem(LEGACY_TOKEN_KEY);
  if (!legacyToken) return null;

  window.localStorage.setItem(ACCESS_TOKEN_KEY, legacyToken);
  window.localStorage.removeItem(LEGACY_TOKEN_KEY);
  return legacyToken;
}

export function hasAccessToken() {
  return Boolean(getAccessToken());
}

export function setAccessToken(token: string) {
  if (!isBrowser()) return;

  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  window.localStorage.removeItem(LEGACY_TOKEN_KEY);
  notifyAuthChange();
}

export function clearAccessToken() {
  if (!isBrowser()) return;

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(LEGACY_TOKEN_KEY);
  notifyAuthChange();
}
