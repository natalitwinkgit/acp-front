import { apiFetch } from "./http";
import { setAccessToken } from "./session";
import type { TokenResponse } from "./auth";

const GOOGLE_IDENTITY_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

type GoogleClientConfigStatus =
  | "ready"
  | "missing_client_id"
  | "invalid_client"
  | "redirect_uri_mismatch"
  | "unknown_error";

type GoogleClientConfigResponse = {
  clientId?: string;
  status: GoogleClientConfigStatus;
};

type GoogleAuthErrorCode =
  | "missing_client_id"
  | "invalid_client"
  | "redirect_uri_mismatch"
  | "only_browser"
  | "init_failed"
  | "load_failed"
  | "request_failed"
  | "missing_token";

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
let googleClientConfigPromise: Promise<string> | null = null;

const GOOGLE_AUTH_MESSAGES = {
  only_browser: {
    uk: "Google Identity Services доступний лише у браузері",
    en: "Google Identity Services is only available in the browser",
  },
  init_failed: {
    uk: "Google Identity Services не ініціалізувався коректно",
    en: "Google Identity Services did not initialize correctly",
  },
  load_failed: {
    uk: "Не вдалося завантажити Google Identity Services",
    en: "Failed to load Google Identity Services",
  },
  request_failed: {
    uk: "Не вдалося отримати конфігурацію Google авторизації",
    en: "Failed to load Google sign-in configuration",
  },
  missing_client_id: {
    uk: "Google авторизація ще не налаштована",
    en: "Google sign-in is not configured yet",
  },
  invalid_client: {
    uk: "Google авторизація тимчасово недоступна: OAuth client не знайдено",
    en: "Google sign-in is temporarily unavailable: OAuth client was not found",
  },
  redirect_uri_mismatch: {
    uk: "Google авторизація налаштована некоректно",
    en: "Google sign-in is misconfigured",
  },
  missing_token: {
    uk: "Відповідь API не містить access token",
    en: "API response does not include an access token",
  },
} as const;

export class GoogleAuthError extends Error {
  code: GoogleAuthErrorCode;

  constructor(code: GoogleAuthErrorCode, message?: string) {
    super(message ?? GOOGLE_AUTH_MESSAGES[code][getClientLocale()]);
    this.code = code;
    this.name = "GoogleAuthError";
  }
}

function isBrowser() {
  return typeof window !== "undefined";
}

function getClientLocale() {
  if (typeof document === "undefined") {
    return "uk" as const;
  }

  return document.documentElement.lang?.toLowerCase().startsWith("en") ? "en" : "uk";
}

function getGoogleClientConfigError(status: Exclude<GoogleClientConfigStatus, "ready">) {
  switch (status) {
    case "missing_client_id":
      return new GoogleAuthError("missing_client_id");
    case "invalid_client":
      return new GoogleAuthError("invalid_client");
    case "redirect_uri_mismatch":
      return new GoogleAuthError("redirect_uri_mismatch");
    default:
      return new GoogleAuthError("request_failed");
  }
}

export function getGoogleAuthErrorMessage(error: unknown) {
  if (error instanceof GoogleAuthError) {
    return error.message;
  }

  return error instanceof Error ? error.message : GOOGLE_AUTH_MESSAGES.request_failed[getClientLocale()];
}

export async function getGoogleClientId() {
  if (!isBrowser()) {
    throw new GoogleAuthError("only_browser");
  }

  if (googleClientConfigPromise) {
    return googleClientConfigPromise;
  }

  googleClientConfigPromise = fetch("/api/google-auth/config", {
    method: "GET",
    cache: "no-store",
  })
    .then(async (response) => {
      let payload: GoogleClientConfigResponse | null = null;

      try {
        payload = (await response.json()) as GoogleClientConfigResponse;
      } catch {}

      if (!response.ok || !payload) {
        throw new GoogleAuthError("request_failed");
      }

      if (payload.status !== "ready") {
        throw getGoogleClientConfigError(payload.status);
      }

      if (!payload.clientId) {
        throw getGoogleClientConfigError("missing_client_id");
      }

      return payload.clientId;
    })
    .catch((error) => {
      googleClientConfigPromise = null;
      throw error;
    });

  return googleClientConfigPromise;
}

export function loadGoogleIdentityScript() {
  if (!isBrowser()) {
    return Promise.reject(new GoogleAuthError("only_browser"));
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

      reject(new GoogleAuthError("init_failed"));
    };

    if (existingScript) {
      if (window.google?.accounts?.id) {
        resolve();
        return;
      }

      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener("error", () => reject(new GoogleAuthError("load_failed")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = GOOGLE_IDENTITY_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", () => reject(new GoogleAuthError("load_failed")), {
      once: true,
    });

    document.head.appendChild(script);
  }).catch((error) => {
    googleIdentityScriptPromise = null;
    throw error;
  });

  return googleIdentityScriptPromise;
}

export async function authenticateWithGoogleCredential(idToken: string) {
  const response = await apiFetch<TokenResponse>("/auth/google", {
    method: "POST",
    body: JSON.stringify({ idToken }),
    includeAuth: false,
    skipAuthRefresh: true,
  });

  if (!response?.access_token) {
    throw new GoogleAuthError("missing_token");
  }

  setAccessToken(response.access_token);
  return response;
}
