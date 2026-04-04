"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../modal.module.css";
import LoginPageContent from "@/app/[locale]/(auth)/login/LoginPageContent";
import { closeAuthRoute } from "@/src/shared/auth-flow";

export default function LoginModalRoute() {
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

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    // зберігаємо позицію скролу
    const scrollY = window.scrollY;
    sessionStorage.setItem("scroll:position", scrollY.toString());

    // Блокуємо фон сторінки, але не скрол усередині модалки
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      // Восстановлюємо скролл
      const savedScrollY = sessionStorage.getItem("scroll:position");
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      
      // Повертаємо до збереженої позиції після видалення стилів
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
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }} 
      role="dialog" 
      aria-modal="true"
    >
      <div
        className={styles.wrap}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <LoginPageContent onClose={close} />
      </div>
    </div>
  );
}
