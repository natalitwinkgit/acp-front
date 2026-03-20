import type { ReactNode } from "react";
import Chip from "@/src/shared/ui/Chip/Chip";
import styles from "./SlantedChip.module.css";

type SlantedChipProps = {
  children: ReactNode;
  className?: string;
};

export default function SlantedChip({
  children,
  className = "",
}: SlantedChipProps) {
  return <Chip className={`${styles.chip} ${className}`.trim()}>{children}</Chip>;
}
