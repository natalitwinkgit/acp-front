import { apiFetch } from "./http";
import { setAccessToken } from "./session";
import type { TokenResponse } from "./auth";
import { consumeAuthBackground } from "@/src/shared/auth-flow";

export type GoogleAuthIntent = "login" | "register";

const GOOGLE_AUTH_ERROR_KEY = "auth:google:error";
const GOOGLE_AUTH_INTENT_KEY = "auth:google:intent";
const DEFAULT_SUCCESS_REDIRECT = "/";
const DEFAULT_ERROR_REDIRECT: Record<GoogleAuthIntent, string> = {
  login: "/login",
  register: "/register",
};
const GOOGLE_IDENTITY_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ?? "";

type GoogleIdentityApi = {
  initialize: (config: {
    client_id: string;
    callback: (response: { credential?: string }) => void;
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: {
      theme?: "outline" | "filled_blue" | "filled_black";
      size?: "large" | "medium" | "small";
      shape?: "rectangular" | "pill" | "circle" | "square";
      text?: "signin_with" | "signup_with" | "continue_with" | "signin";
      logo_alignment?: "left" | "center";
      width?: number;
      locale?: string;
    },
  ) => void;
};

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: GoogleIdentityApi;
      };
    };
  }
}

let googleIdentityScriptPromise: Promise<void> | null = null;

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
  return consumeAuthBackground() || DEFAULT_SUCCESS_REDIRECT;
}

export function getGoogleClientId() {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured");
  }

  return GOOGLE_CLIENT_ID;
}

export function loadGoogleIdentityScript() {
  if (!isBrowser()) {
    return Promise.reject(new Error("Google Identity Services доступний лише у браузері"));
  }

  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (googleIdentityScriptPromise) {
    return googleIdentityScriptPromise;
  }

  googleIdentityScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${GOOGLE_IDENTITY_SCRIPT_SRC}"]`,
    );

    const handleLoad = () => {
      if (window.google?.accounts?.id) {
        resolve();
        return;
      }

      reject(new Error("Google Identity Services не ініціалізувався коректно"));
    };

    if (existingScript) {
      if (window.google?.accounts?.id) {
        resolve();
        return;
      }

      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Не вдалося завантажити Google Identity Services")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = GOOGLE_IDENTITY_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Не вдалося завантажити Google Identity Services")),
      { once: true },
    );

    document.head.appendChild(script);
  }).catch((error) => {
    googleIdentityScriptPromise = null;
    throw error;
  });

  return googleIdentityScriptPromise;
}

export function startGoogleAuth(intent: GoogleAuthIntent) {
  if (!isBrowser()) return;

  window.sessionStorage.setItem(GOOGLE_AUTH_INTENT_KEY, intent);
  window.sessionStorage.removeItem(GOOGLE_AUTH_ERROR_KEY);
  throw new Error("Google redirect-flow більше не підтримується поточним контрактом бекенда.");
}

export async function authenticateWithGoogleCredential(idToken: string) {
  const response = await apiFetch<TokenResponse>("/auth/google", {
    method: "POST",
    body: JSON.stringify({ idToken }),
    includeAuth: false,
    skipAuthRefresh: true,
  });

  if (!response?.access_token) {
    throw new Error("Відповідь API не містить access token");
  }

  setAccessToken(response.access_token);
  clearGoogleAuthContext();
  return response;
}

export async function finalizeGoogleAuth() {
  throw new Error("Google redirect callback-flow не підтримується поточним контрактом бекенда.");
}
