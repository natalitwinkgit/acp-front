"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../modal.module.css";
import RegisterPageContent from "@/app/[locale]/(auth)/register/RegisterPageContent";
import { closeAuthRoute } from "@/src/shared/auth-flow";

export default function RegisterModalRoute() {
  const router = useRouter();

  const close = useCallback(() => {
    closeAuthRoute(router, { preferBack: true });
  }, [router]);

  useEffect(() => {
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
        <RegisterPageContent onClose={close} />
      </div>
    </div>
  );
}
