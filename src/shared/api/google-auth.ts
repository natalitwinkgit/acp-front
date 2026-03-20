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

function isBrowser() {
  return typeof window !== "undefined";
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
  return response;
}
