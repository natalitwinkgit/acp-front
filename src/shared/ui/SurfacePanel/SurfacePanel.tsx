import type { HTMLAttributes, ReactNode } from "react";
import styles from "./SurfacePanel.module.css";

type SurfacePanelProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export default function SurfacePanel({
  children,
  className = "",
  ...props
}: SurfacePanelProps) {
  return (
    <div className={`${styles.panel} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
