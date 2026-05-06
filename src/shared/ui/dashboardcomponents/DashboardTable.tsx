import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type TableHTMLAttributes,
} from "react";
import styles from "./DashboardTable.module.css";

export const dashboardTableStyles = styles;

function cx(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export const DashboardTable = forwardRef<
  HTMLTableElement,
  TableHTMLAttributes<HTMLTableElement>
>(function DashboardTable({ className, ...props }, ref) {
  return <table ref={ref} className={cx(styles.table, className)} {...props} />;
});

export const DashboardThead = forwardRef<
  HTMLTableRowElement,
  {
    className?: string;
    children: ReactNode;
  }
>(function DashboardThead({ className, children }, ref) {
  return (
    <thead>
      <tr ref={ref} className={cx(styles.theadRow, className)}>
        {children}
      </tr>
    </thead>
  );
});

export const DashboardTr = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(function DashboardTr({ className, ...props }, ref) {
  return <tr ref={ref} className={cx(styles.row, className)} {...props} />;
});
