import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type TableHTMLAttributes,
} from "react";
import styles from "./adminTable.module.css";

export const adminTableStyles = styles;

function cx(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export const AdminTable = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(
  function AdminTable({ className, ...props }, ref) {
    return <table ref={ref} className={cx(styles.table, className)} {...props} />;
  },
);

export const AdminThead = forwardRef<
  HTMLTableRowElement,
  {
    className?: string;
    children: ReactNode;
  }
>(function AdminThead({ className, children }, ref) {
  return (
    <thead>
      <tr ref={ref} className={cx(styles.theadRow, className)}>
        {children}
      </tr>
    </thead>
  );
});

export const AdminTr = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  function AdminTr({ className, ...props }, ref) {
    return <tr ref={ref} className={cx(styles.row, className)} {...props} />;
  },
);
