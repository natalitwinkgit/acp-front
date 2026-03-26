import LocaleLink from "@/src/shared/i18n/Link";
import styles from "./BreadcrumbChips.module.css";

export type BreadcrumbChipItem = {
  label: string;
  href?: string;
  current?: boolean;
};

type Props = {
  items: BreadcrumbChipItem[];
  ariaLabel: string;
  className?: string;
};

export default function BreadcrumbChips({
  items,
  ariaLabel,
  className = "",
}: Props) {
  const classes = `${styles.row} ${className}`.trim();

  return (
    <nav className={classes} aria-label={ariaLabel}>
      {items.map((item, index) => {
        const content =
          item.href && !item.current ? (
            <LocaleLink href={item.href} className={styles.link}>
              {item.label}
            </LocaleLink>
          ) : (
            <span className={styles.current}>{item.label}</span>
          );

        return (
          <div key={`${item.label}-${index}`} className={styles.label}>
            {content}
            <span
              className={`${styles.arrow} ${item.current ? styles.arrowCurrent : styles.arrowMuted}`}
              aria-hidden="true"
            />
          </div>
        );
      })}
    </nav>
  );
}
