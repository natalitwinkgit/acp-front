import styles from "./StatusBadge.module.css";

export type StatusBadgeVariant = "success" | "warning" | "danger" | "neutral";

type Props = {
  label: string;
  variant: StatusBadgeVariant;
  className?: string;
};

export default function StatusBadge({ label, variant, className }: Props) {
  return (
    <span
      className={[styles.badge, styles[variant], className].filter(Boolean).join(" ")}
      role="status"
    >
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  );
}
