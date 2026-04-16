"use client";

import Chip from "@/src/shared/ui/Chip/Chip";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { getStatusClass, MOCK_ROWS } from "../lib/routesTable.utils";
import { useRoutesTable } from "../model/useRoutesTable";
import type { RouteRow } from "../model/types";
import { StatusDropdown } from "@/src/features/change-trip-status";
import styles from "./admin-routes-table.module.css";

type RoutesTableProps = {
  rows?: RouteRow[];
  onEditRoute?: (id: string) => void;
};

export default function RoutesTable({
  rows = MOCK_ROWS,
  onEditRoute,
}: RoutesTableProps) {
  const { t } = useI18n();
  const {
    openDropdownId,
    setOpenDropdownId,
    rowStatuses,
    handleStatusChange,
    page,
    setPage,
    totalPages,
  } = useRoutesTable({ rows });

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <span className={styles.title}>
          {t("dispatcherArea.routes.table.title")}
        </span>
        <button type="button" className={styles.sortBtn}>
          {t("dispatcherArea.routes.table.sort")}
          <span className={styles.sortChevron} />
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr className={styles.theadRow}>
            <th className={styles.thNum}>
              {t("dispatcherArea.routes.table.columns.number")}
            </th>
            <th className={styles.th}>
              {t("dispatcherArea.routes.table.columns.direction")}
            </th>
            <th className={styles.th}>
              {t("dispatcherArea.routes.table.columns.time")}
            </th>
            <th className={styles.th}>
              {t("dispatcherArea.routes.table.columns.bus")}
            </th>
            <th className={styles.th}>
              {t("dispatcherArea.routes.table.columns.seats")}
            </th>
            <th className={styles.thStatus}>
              {t("dispatcherArea.routes.table.columns.status")}
            </th>
            <th className={styles.thAction} />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const status = rowStatuses[row.id] ?? "SCHEDULED";
            return (
              <tr key={row.id} className={styles.row}>
                <td className={styles.tdNum}>{index + 1}</td>
                <td className={styles.td}>{row.direction}</td>
                <td className={styles.td}>
                  {row.departureTime && row.arrivalTime
                    ? `${row.departureTime} - ${row.arrivalTime}`
                    : "—"}
                </td>
                <td className={styles.td}>{row.busNumber ?? "—"}</td>
                <td className={styles.td}>
                  {row.availableSeats != null && row.totalSeats != null
                    ? `${row.availableSeats}/${row.totalSeats}`
                    : "—"}
                </td>
                <td className={styles.tdStatus}>
                  <Chip
                    className={`${styles.statusChip} ${getStatusClass(status)}`}
                  >
                    {t(`dispatcherArea.routes.table.statuses.${status}`)}
                  </Chip>
                </td>
                <td className={styles.tdAction}>
                  <StatusDropdown
                    rowId={row.id}
                    openId={openDropdownId}
                    onToggle={setOpenDropdownId}
                    onStatusChange={handleStatusChange}
                    onEdit={onEditRoute ?? (() => {})}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          type="button"
          className={`${styles.pageBtn} ${styles.pageBtnArrow}`}
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          aria-label={t("dispatcherArea.routes.table.pagination.prev")}
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ""}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          className={`${styles.pageBtn} ${styles.pageBtnArrow}`}
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          aria-label={t("dispatcherArea.routes.table.pagination.next")}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
