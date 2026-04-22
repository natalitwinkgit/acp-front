"use client";

import { useEffect, useState } from "react";
import Chip from "@/src/shared/ui/Chip/Chip";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { getStatusClass, MOCK_ROWS } from "../lib/routesTable.utils";
import { useRoutesTable } from "../model/useRoutesTable";
import type { RouteRow } from "../model/types";
import { StatusDropdown } from "@/src/features/change-trip-status";
import {
  AdminCard,
  AdminTable,
  AdminThead,
  AdminTr,
  adminTableStyles,
  DEFAULT_TABLE_PAGE_SIZE,
  countPages,
  paginateItems,
  TablePagination,
} from "@/src/shared";
import styles from "./admin-routes-table.module.css";
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
  } = useRoutesTable({ rows });
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);

  const [filteredRows, setFilteredRows] = useState(rows);
  const totalPages = countPages(filteredRows.length);
  const paginatedRows = paginateItems(filteredRows, page);

  useEffect(() => {
    const nextTotalPages = countPages(filteredRows.length);
    if (nextTotalPages > 0 && page > nextTotalPages) {
      setPage(nextTotalPages);
    }
  }, [filteredRows, page, setPage]);

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
              setPage(1);
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
          {paginatedRows.map((row, index) => {
            const status = rowStatuses[row.id] ?? "SCHEDULED";
            return (
              <AdminTr key={row.id}>
                <td className={adminTableStyles.tdNum}>
                  {(page - 1) * DEFAULT_TABLE_PAGE_SIZE + index + 1}
                </td>
                <td
                  className={`${adminTableStyles.td} ${adminTableStyles.tdLeft}`}
                >
                  {row.direction}
                </td>
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

      <TablePagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        prevAriaLabel={t("dispatcherArea.routes.table.pagination.prev")}
        nextAriaLabel={t("dispatcherArea.routes.table.pagination.next")}
      />
    </AdminCard>
  );
}
