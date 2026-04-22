import type { HTMLAttributes, ReactNode, TableHTMLAttributes } from "react";
import styles from "./adminTable.module.css";

export const adminTableStyles = styles;

function cx(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function AdminTable({
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cx(styles.table, className)} {...props} />;
}

export function AdminThead({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <thead>
      <tr className={cx(styles.theadRow, className)}>{children}</tr>
    </thead>
  );
}

export function AdminTr({
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cx(styles.row, className)} {...props} />;
}
