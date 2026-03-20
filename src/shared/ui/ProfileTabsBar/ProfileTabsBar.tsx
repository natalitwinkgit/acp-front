import Link from "next/link";
import type { ReactNode } from "react";
import Chip from "@/src/shared/ui/Chip/Chip";
import styles from "./ProfileTabsBar.module.css";

export type ProfileTabsBarItem = {
  label: ReactNode;
  href?: string;
  active?: boolean;
};

type ProfileTabsBarProps = {
  ariaLabel: string;
  items: ProfileTabsBarItem[];
  className?: string;
  activeVariant?: "light" | "overlay";
};

export default function ProfileTabsBar({
  ariaLabel,
  items,
  className = "",
  activeVariant = "light",
}: ProfileTabsBarProps) {
  const activeClassName =
    activeVariant === "overlay" ? styles.tabChipActiveOverlay : styles.tabChipActiveLight;
  const classes = `${styles.tabsBar} ${className}`.trim();

  return (
    <section className={classes} aria-label={ariaLabel}>
      <div className={styles.tabsRow}>
        {items.map((item, index) => {
          const chip = (
            <Chip
              className={`${styles.tabChip} ${item.active ? activeClassName : styles.tabChipMuted}`.trim()}
            >
              {item.label}
            </Chip>
          );

          if (item.href && !item.active) {
            return (
              <Link
                key={`${String(item.label)}-${index}`}
                href={item.href}
                className={styles.tabLink}
              >
                {chip}
              </Link>
            );
          }

          return <div key={`${String(item.label)}-${index}`}>{chip}</div>;
        })}
      </div>
    </section>
  );
}
