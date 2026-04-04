"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../modal.module.css";
import ForgotPasswordPageContent from "@/app/[locale]/(auth)/forgot-password/ForgotPasswordPageContent";
import { closeAuthRoute } from "@/src/shared/auth-flow";

export default function ForgotPasswordModalRoute() {
  const router = useRouter();
  const [isDismissed, setIsDismissed] = useState(false);

  const close = useCallback(() => {
    setIsDismissed(true);
    closeAuthRoute(router, { preferBack: true });
  }, [router]);

  useEffect(() => {
    if (isDismissed) {
      document.body.style.overflow = "";
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const scrollY = window.scrollY;
    sessionStorage.setItem("scroll:position", scrollY.toString());

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      const savedScrollY = sessionStorage.getItem("scroll:position");
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);

      if (savedScrollY) {
        requestAnimationFrame(() => {
          window.scrollTo(0, parseInt(savedScrollY, 10));
          sessionStorage.removeItem("scroll:position");
        });
      }
    };
  }, [close, isDismissed]);

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.wrap} onPointerDown={(event) => event.stopPropagation()}>
        <ForgotPasswordPageContent onClose={close} />
      </div>
    </div>
  );
}
