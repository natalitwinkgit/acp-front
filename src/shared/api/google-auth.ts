import { apiFetch } from "./http";
import { setAccessToken } from "./session";
import type { TokenResponse } from "./auth";

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

const GOOGLE_AUTH_MESSAGES = {
  onlyBrowser: {
    uk: "Google Identity Services доступний лише у браузері",
    en: "Google Identity Services is only available in the browser",
  },
  initFailed: {
    uk: "Google Identity Services не ініціалізувався коректно",
    en: "Google Identity Services did not initialize correctly",
  },
  loadFailed: {
    uk: "Не вдалося завантажити Google Identity Services",
    en: "Failed to load Google Identity Services",
  },
  missingToken: {
    uk: "Відповідь API не містить access token",
    en: "API response does not include an access token",
  },
} as const;

function isBrowser() {
  return typeof window !== "undefined";
}

function getClientLocale() {
  if (typeof document === "undefined") {
    return "uk" as const;
  }

  return document.documentElement.lang?.toLowerCase().startsWith("en") ? "en" : "uk";
}

function getGoogleAuthMessage(key: keyof typeof GOOGLE_AUTH_MESSAGES) {
  return GOOGLE_AUTH_MESSAGES[key][getClientLocale()];
}

export function getGoogleClientId() {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured");
  }

  return GOOGLE_CLIENT_ID;
}

export function loadGoogleIdentityScript() {
  if (!isBrowser()) {
    return Promise.reject(new Error(getGoogleAuthMessage("onlyBrowser")));
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

      reject(new Error(getGoogleAuthMessage("initFailed")));
    };

    if (existingScript) {
      if (window.google?.accounts?.id) {
        resolve();
        return;
      }

      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error(getGoogleAuthMessage("loadFailed"))),
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
      () => reject(new Error(getGoogleAuthMessage("loadFailed"))),
      { once: true },
    );

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
    throw new Error(getGoogleAuthMessage("missingToken"));
  }

  setAccessToken(response.access_token);
  return response;
}
