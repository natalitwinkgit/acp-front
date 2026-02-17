"use client";

import { useRouter } from "next/navigation";
import styles from "./auth.module.css";

export default function AuthModalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        
        if (e.target === e.currentTarget) router.back();
      }}
    >
      <div className={styles.modalWrap}>
        {children}
      </div>
    </div>
  );
}