import type { ReactNode } from "react";
import styles from "./DecorativeBorder.module.css";

interface DecorativeBorderProps {
  children: ReactNode;
  className?: string;
}

export function DecorativeBorder({
  children,
  className = "",
}: DecorativeBorderProps) {
  const classes = `${styles.borderContainer} ${className}`.trim();

  return (
    <div className={classes}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}