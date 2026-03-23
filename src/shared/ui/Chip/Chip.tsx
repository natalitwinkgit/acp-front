import type { ReactNode } from "react";
import styles from "./Chip.module.css";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Chip({ children, className = "" }: Props) {
  const classes = `${styles.chip} ${className}`.trim();

  return <span className={classes}>{children}</span>;
}