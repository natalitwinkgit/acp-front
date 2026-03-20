"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  authenticateWithGoogleCredential,
  getGoogleClientId,
  loadGoogleIdentityScript,
} from "@/src/shared/api/google-auth";
import styles from "./GoogleAuthButton.module.css";

type GoogleAuthIntent = "login" | "register";

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleAuthButtonProps = {
  intent: GoogleAuthIntent;
  disabled?: boolean;
  onBusyChange?: (busy: boolean) => void;
  onError?: (message: string) => void;
  onSuccess?: () => void;
};

function getGoogleButtonText(intent: GoogleAuthIntent) {
  return intent === "register" ? "signup_with" : "signin_with";
}

function getGoogleButtonLocale() {
  if (typeof document === "undefined") return "uk";
  return document.documentElement.lang?.toLowerCase().startsWith("en") ? "en" : "uk";
}

export default function GoogleAuthButton({
  intent,
  disabled = false,
  onBusyChange,
  onError,
  onSuccess,
}: GoogleAuthButtonProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Підключаємо Google...");

  const reportBusyChange = useEffectEvent((busy: boolean) => {
    onBusyChange?.(busy);
  });

  const reportError = useEffectEvent((message: string) => {
    onError?.(message);
  });

  const reportSuccess = useEffectEvent(() => {
    onSuccess?.();
  });

  const handleCredentialResponse = useEffectEvent(async (response: GoogleCredentialResponse) => {
    if (!response.credential) {
      reportError("Google не повернув identity token. Спробуйте ще раз.");
      return;
    }

    reportError("");
    reportBusyChange(true);
    setIsSubmitting(true);

    try {
      await authenticateWithGoogleCredential(response.credential);
      reportSuccess();
    } catch (err) {
      reportError(err instanceof Error ? err.message : "Не вдалося завершити вхід через Google.");
    } finally {
      reportBusyChange(false);
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    let isActive = true;
    let resizeObserver: ResizeObserver | null = null;

    const renderGoogleButton = () => {
      const host = hostRef.current;
      const googleId = window.google?.accounts?.id;

      if (!host || !googleId) return;

      const width = Math.max(240, Math.floor(host.getBoundingClientRect().width || 360));

      host.innerHTML = "";
      googleId.renderButton(host, {
        theme: "outline",
        size: "large",
        shape: "rectangular",
        text: getGoogleButtonText(intent),
        logo_alignment: "left",
        width,
        locale: getGoogleButtonLocale(),
      });
    };

    const initializeGoogleButton = async () => {
      try {
        const clientId = getGoogleClientId();
        await loadGoogleIdentityScript();

        if (!isActive || !hostRef.current || !window.google?.accounts?.id) {
          return;
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response: GoogleCredentialResponse) => {
            void handleCredentialResponse(response);
          },
        });

        renderGoogleButton();
        resizeObserver = new ResizeObserver(() => renderGoogleButton());
        resizeObserver.observe(hostRef.current);

        if (isActive) {
          setPlaceholderText("");
          setIsReady(true);
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Не вдалося підключити Google авторизацію.";

        if (isActive) {
          setPlaceholderText("Google авторизація недоступна");
          setIsReady(false);
          reportError(message);
        }
      }
    };

    void initializeGoogleButton();

    return () => {
      isActive = false;
      resizeObserver?.disconnect();
    };
  }, [intent]);

  const rootClassName = `${styles.root} ${disabled || isSubmitting ? styles.disabled : ""}`.trim();

  return (
    <div className={rootClassName} aria-busy={isSubmitting}>
      <div ref={hostRef} className={styles.host} />

      {!isReady ? <div className={styles.placeholder}>{placeholderText}</div> : null}

      {isSubmitting ? <div className={styles.overlay}>Зачекайте...</div> : null}
    </div>
  );
}
