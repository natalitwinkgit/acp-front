import type { HTMLAttributes, ReactNode } from "react";
import styles from "./DashboardCard.module.css";

type DashboardCardProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};
//comment to trigger changes, ignor it
export default function DashboardCard({
  children,
  className = "",
  ...props
}: DashboardCardProps) {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {children}
    </div>
  );
}
