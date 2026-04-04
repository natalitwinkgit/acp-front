"use client";

import { useRouter } from "next/navigation";
import styles from "./auth.module.css";
import { closeAuthRoute } from "@/src/shared/auth-flow";

export default function AuthModalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const close = () => {
    closeAuthRoute(router, { preferBack: true });
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className={styles.modalWrap}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
