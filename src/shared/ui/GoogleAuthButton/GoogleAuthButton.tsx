"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  authenticateWithGoogleCredential,
  getGoogleAuthErrorMessage,
  getGoogleClientId,
  loadGoogleIdentityScript,
} from "@/src/shared/api/google-auth";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
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
  const { t } = useI18n();
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placeholderText, setPlaceholderText] = useState(t("googleAuth.loading"));

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
      reportError(t("googleAuth.errors.noCredential"));
      return;
    }

    reportError("");
    reportBusyChange(true);
    setIsSubmitting(true);

    try {
      await authenticateWithGoogleCredential(response.credential);
      reportSuccess();
    } catch (err) {
      reportError(err instanceof Error ? err.message : t("googleAuth.errors.complete"));
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
        const clientId = await getGoogleClientId();
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
        const message = getGoogleAuthErrorMessage(err);

        if (isActive) {
          setPlaceholderText(t("googleAuth.unavailable"));
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
  }, [intent, t]);

  const rootClassName = `${styles.root} ${disabled || isSubmitting ? styles.disabled : ""}`.trim();

  return (
    <div className={rootClassName} aria-busy={isSubmitting}>
      <div ref={hostRef} className={styles.host} />

      {!isReady ? <div className={styles.placeholder}>{placeholderText}</div> : null}

      {isSubmitting ? <div className={styles.overlay}>{t("googleAuth.submitting")}</div> : null}
    </div>
  );
}
