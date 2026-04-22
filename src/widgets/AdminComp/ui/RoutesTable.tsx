"use client";

import Chip from "@/src/shared/ui/Chip/Chip";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { getStatusClass, MOCK_ROWS } from "../lib/routesTable.utils";
import { useRoutesTable } from "../model/useRoutesTable";
import type { RouteRow } from "../model/types";
import { StatusDropdown } from "@/src/features/change-trip-status";
import { AdminCard, AdminTable, AdminThead, AdminTr, adminTableStyles } from "@/src/shared";
import styles from "./admin-routes-table.module.css";
import { useState } from "react";
import { FilterDropdown } from "@/src/features/filter-routes";

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
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);

  const [filteredRows, setFilteredRows] = useState(rows);

  return (
    <AdminCard>
      <div className={styles.header}>
        <span className={styles.title}>
          {t("dispatcherArea.routes.table.title")}
        </span>
        <div style={{ position: "relative" }}>
          <button
            type="button"
            className={styles.sortBtn}
            onClick={() =>
              setOpenFilterId((prev) =>
                prev === "sort-filter" ? null : "sort-filter",
              )
            }
          >
            {t("dispatcherArea.routes.table.sort")}
            <span className={styles.sortChevron} />
          </button>
          <FilterDropdown
            id="sort-filter"
            openId={openFilterId}
            onFilterChange={(status) => {
              if (!status) {
                setFilteredRows(rows);
                return;
              }
              setFilteredRows(rows.filter((i) => i.status === status));
            }}
            onToggle={setOpenFilterId}
          />
        </div>
      </div>

      <AdminTable>
        <AdminThead>
            <th className={adminTableStyles.thNum}>
              {t("dispatcherArea.routes.table.columns.number")}
            </th>
            <th className={adminTableStyles.thLeft}>
              {t("dispatcherArea.routes.table.columns.direction")}
            </th>
            <th className={adminTableStyles.th}>
              {t("dispatcherArea.routes.table.columns.time")}
            </th>
            <th className={adminTableStyles.th}>
              {t("dispatcherArea.routes.table.columns.bus")}
            </th>
            <th className={adminTableStyles.th}>
              {t("dispatcherArea.routes.table.columns.seats")}
            </th>
            <th className={adminTableStyles.thStatus}>
              {t("dispatcherArea.routes.table.columns.status")}
            </th>
            <th className={adminTableStyles.thAction} />
          </AdminThead>
        <tbody>
          {filteredRows.map((row, index) => {
            const status = rowStatuses[row.id] ?? "SCHEDULED";
            return (
              <AdminTr key={row.id}>
                <td className={adminTableStyles.tdNum}>{index + 1}</td>
                <td className={adminTableStyles.td}>{row.direction}</td>
                <td className={adminTableStyles.td}>
                  {row.departureTime && row.arrivalTime
                    ? `${row.departureTime} - ${row.arrivalTime}`
                    : "—"}
                </td>
                <td className={adminTableStyles.td}>{row.busNumber ?? "—"}</td>
                <td className={adminTableStyles.td}>
                  {row.availableSeats != null && row.totalSeats != null
                    ? `${row.availableSeats}/${row.totalSeats}`
                    : "—"}
                </td>
                <td className={adminTableStyles.tdStatus}>
                  <Chip
                    className={`${styles.statusChip} ${getStatusClass(status)}`}
                  >
                    {t(`dispatcherArea.routes.table.statuses.${status}`)}
                  </Chip>
                </td>
                <td className={adminTableStyles.tdAction}>
                  <StatusDropdown
                    rowId={row.id}
                    openId={openDropdownId}
                    onToggle={setOpenDropdownId}
                    onStatusChange={handleStatusChange}
                    onEdit={onEditRoute ?? (() => {})}
                  />
                </td>
              </AdminTr>
            );
          })}
        </tbody>
      </AdminTable>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            className={`${styles.pageBtn} ${styles.pageBtnArrow}`}
            disabled={page === 1}
            onClick={() => {
              setPage((p) => p - 1);
            }}
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
      )}
    </AdminCard>
  );
}
