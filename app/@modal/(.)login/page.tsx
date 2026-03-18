"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../modal.module.css";
import LoginPageContent from "@/app/(auth)/login/LoginPageContent";

export default function LoginModalRoute() {
  const router = useRouter();

  const close = useCallback(() => {
    const background = sessionStorage.getItem("auth:background");
    const hasBackground = Boolean(background);
    sessionStorage.removeItem("auth:background");
    if (hasBackground && window.history.length > 1) {
      router.back();
      return;
    }

    router.replace(background || "/");
  }, [router]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    // зберігаємо позицію скролу
    const scrollY = window.scrollY;
    sessionStorage.setItem("scroll:position", scrollY.toString());

    // Блокуємо скролл без зміни позиції
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    // Запобігаємо свайпу
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };
    document.addEventListener("touchmove", preventScroll, { passive: false });

    window.addEventListener("keydown", onKeyDown);

    return () => {
      // Восстановлюємо скролл
      const savedScrollY = sessionStorage.getItem("scroll:position");
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", onKeyDown);
      
      // Повертаємо до збереженої позиції після видалення стилів
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
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }} 
      role="dialog" 
      aria-modal="true"
    >
      <div
        className={styles.wrap}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <LoginPageContent onClose={close} />
      </div>
    </div>
  );
}
