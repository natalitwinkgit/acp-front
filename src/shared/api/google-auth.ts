import { API_URL, apiFetch } from "./http";
import { setAccessToken } from "./session";
import type { TokenResponse } from "./auth";

export type GoogleAuthIntent = "login" | "register";

const GOOGLE_AUTH_ERROR_KEY = "auth:google:error";
const GOOGLE_AUTH_INTENT_KEY = "auth:google:intent";
const AUTH_BACKGROUND_KEY = "auth:background";
const DEFAULT_SUCCESS_REDIRECT = "/";
const DEFAULT_ERROR_REDIRECT: Record<GoogleAuthIntent, string> = {
  login: "/login",
  register: "/register",
};

function isBrowser() {
  return typeof window !== "undefined";
}

function getStoredGoogleAuthIntent(): GoogleAuthIntent {
  if (!isBrowser()) return "login";

  const intent = window.sessionStorage.getItem(GOOGLE_AUTH_INTENT_KEY);
  return intent === "register" ? "register" : "login";
}

export function getGoogleAuthCallbackUrl() {
  if (!isBrowser()) return "/auth/google/callback";
  return new URL("/auth/google/callback", window.location.origin).toString();
}

export function consumeGoogleAuthError() {
  if (!isBrowser()) return "";

  const error = window.sessionStorage.getItem(GOOGLE_AUTH_ERROR_KEY) ?? "";
  window.sessionStorage.removeItem(GOOGLE_AUTH_ERROR_KEY);
  return error;
}

export function storeGoogleAuthError(message: string) {
  if (!isBrowser()) return;

  if (message.trim()) {
    window.sessionStorage.setItem(GOOGLE_AUTH_ERROR_KEY, message);
    return;
  }

  window.sessionStorage.removeItem(GOOGLE_AUTH_ERROR_KEY);
}

export function clearGoogleAuthContext() {
  if (!isBrowser()) return;

  window.sessionStorage.removeItem(GOOGLE_AUTH_ERROR_KEY);
  window.sessionStorage.removeItem(GOOGLE_AUTH_INTENT_KEY);
}

export function getGoogleAuthErrorRedirectPath() {
  return DEFAULT_ERROR_REDIRECT[getStoredGoogleAuthIntent()];
}

export function getGoogleAuthSuccessRedirectPath() {
  if (!isBrowser()) return DEFAULT_SUCCESS_REDIRECT;

  const background = window.sessionStorage.getItem(AUTH_BACKGROUND_KEY);
  window.sessionStorage.removeItem(AUTH_BACKGROUND_KEY);
  return background || DEFAULT_SUCCESS_REDIRECT;
}

export function startGoogleAuth(intent: GoogleAuthIntent) {
  if (!isBrowser()) return;

  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  window.sessionStorage.setItem(GOOGLE_AUTH_INTENT_KEY, intent);
  window.sessionStorage.removeItem(GOOGLE_AUTH_ERROR_KEY);

  const authUrl = new URL(`${API_URL}/auth/google`);
  authUrl.searchParams.set("intent", intent);
  authUrl.searchParams.set("callbackUrl", getGoogleAuthCallbackUrl());

  window.location.assign(authUrl.toString());
}

export async function finalizeGoogleAuth() {
  const response = await apiFetch<TokenResponse>("/auth/refresh-token", {
    method: "POST",
    includeAuth: false,
    skipAuthRefresh: true,
  });

  if (!response?.access_token) {
    throw new Error("Відповідь API не містить access token");
  }

  setAccessToken(response.access_token);
  return response;
}
