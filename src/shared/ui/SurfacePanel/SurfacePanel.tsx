import type { HTMLAttributes, ReactNode } from "react";
import styles from "./SurfacePanel.module.css";

// Додаємо типізацію для стандартних атрибутів div та children
type SurfacePanelProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export default function SurfacePanel({
  children,
  className = "",
  ...props
}: SurfacePanelProps) {
  return (
    <div className={`${styles.panel} ${className}`} {...props}>
      {children}
    </div>
  );
}