"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "../modal.module.css";
import ForgotPasswordPageContent from "@/app/[locale]/(auth)/forgot-password/ForgotPasswordPageContent";
import { closeAuthRoute } from "@/src/shared/auth-flow";

export default function ForgotPasswordModalRoute() {
  const router = useRouter();

  const close = useCallback(() => {
    closeAuthRoute(router, { preferBack: true });
  }, [router]);

  useEffect(() => {
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
  }, [close]);

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.wrap} onMouseDown={(event) => event.stopPropagation()}>
        <ForgotPasswordPageContent onClose={close} />
      </div>
    </div>
  );
}
