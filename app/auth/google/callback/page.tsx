"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setAccessToken } from "@/src/shared/api";
import {
  clearGoogleAuthContext,
  finalizeGoogleAuth,
  getGoogleAuthErrorRedirectPath,
  getGoogleAuthSuccessRedirectPath,
  storeGoogleAuthError,
} from "@/src/shared/api/google-auth";

function getCallbackParam(searchParams: URLSearchParams, key: string) {
  const queryValue = searchParams.get(key);
  if (queryValue) return queryValue;

  if (typeof window === "undefined") return null;

  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return hashParams.get(key);
}

export default function GoogleAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let isActive = true;

    const finishGoogleAuth = async () => {
      const accessToken = getCallbackParam(searchParams, "access_token");
      const error =
        getCallbackParam(searchParams, "error_description")
        ?? getCallbackParam(searchParams, "message")
        ?? getCallbackParam(searchParams, "error");

      if (error) {
        storeGoogleAuthError(error);
        if (isActive) {
          router.replace(getGoogleAuthErrorRedirectPath());
        }
        return;
      }

      try {
        if (accessToken) {
          setAccessToken(accessToken);
        } else {
          await finalizeGoogleAuth();
        }

        clearGoogleAuthContext();

        if (isActive) {
          router.replace(getGoogleAuthSuccessRedirectPath());
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Не вдалося завершити вхід через Google.";
        storeGoogleAuthError(message);

        if (isActive) {
          router.replace(getGoogleAuthErrorRedirectPath());
        }
      }
    };

    void finishGoogleAuth();

    return () => {
      isActive = false;
    };
  }, [router, searchParams]);

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "24px",
          padding: "32px 24px",
          background: "#fff",
          boxShadow: "0 20px 60px rgba(14, 35, 67, 0.12)",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "28px", lineHeight: 1.2 }}>Google авторизація</h1>
        <p style={{ margin: "12px 0 0", color: "#5f6773" }}>
          Завершуємо вхід і повертаємо вас у застосунок.
        </p>
      </div>
    </main>
  );
}
