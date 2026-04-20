import type { HTMLAttributes, ReactNode } from "react";
import styles from "./AdminCard.module.css";

type AdminCardProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export default function AdminCard({ children, className = "", ...props }: AdminCardProps) {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {children}
    </div>
  );
}
