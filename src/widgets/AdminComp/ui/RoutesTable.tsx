"use client";

import { useState } from "react";
import { FilterDropdown } from "@/src/features/filter-routes";
import { StatusDropdown } from "@/src/features/change-trip-status";
import {
  DashboardCard,
  DashboardTable,
  DashboardThead,
  DashboardTr,
  dashboardTableStyles,
  TablePagination,
  useResizeTableHook,
} from "@/src/shared";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import Chip from "@/src/shared/ui/Chip/Chip";
import { getStatusClass, MOCK_ROWS } from "../lib/routesTable.utils";
import { useRoutesTable } from "../model/useRoutesTable";
import type { RouteRow } from "../model/types";
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
  } = useRoutesTable({ rows });
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);
  const [filteredRows, setFilteredRows] = useState(rows);
  const {
    page,
    setPage,
    rowsPerPage,
    totalPages,
    paginatedRows,
    refs: {
      cardRef,
      headerRef,
      tableAreaRef,
      tableScrollRef,
      theadRef,
      firstRowRef,
      paginationRef,
    },
  } = useResizeTableHook({
    items: filteredRows,
  });

  return (
    <div ref={cardRef} className={styles.cardRoot}>
      <DashboardCard className={styles.card}>
        <div ref={headerRef} className={styles.header}>
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

                setFilteredRows(rows.filter((row) => row.status === status));
              }}
              onToggle={setOpenFilterId}
            />
          </div>
        </div>

        <div ref={tableAreaRef} className={styles.tableArea}>
          <div ref={tableScrollRef} className={styles.tableScroll}>
            <DashboardTable>
              <DashboardThead ref={theadRef}>
                <th className={dashboardTableStyles.thNum}>
                  {t("dispatcherArea.routes.table.columns.number")}
                </th>
                <th className={dashboardTableStyles.thLeft}>
                  {t("dispatcherArea.routes.table.columns.direction")}
                </th>
                <th className={dashboardTableStyles.th}>
                  {t("dispatcherArea.routes.table.columns.time")}
                </th>
                <th className={dashboardTableStyles.th}>
                  {t("dispatcherArea.routes.table.columns.bus")}
                </th>
                <th className={dashboardTableStyles.th}>
                  {t("dispatcherArea.routes.table.columns.seats")}
                </th>
                <th className={dashboardTableStyles.thStatus}>
                  {t("dispatcherArea.routes.table.columns.status")}
                </th>
                <th className={dashboardTableStyles.thAction} />
              </DashboardThead>
              <tbody>
                {paginatedRows.map((row, index) => {
                  const status = rowStatuses[row.id] ?? "SCHEDULED";

                  return (
                    <DashboardTr
                      key={row.id}
                      ref={index === 0 ? firstRowRef : undefined}
                    >
                      <td className={dashboardTableStyles.tdNum}>
                        {(page - 1) * rowsPerPage + index + 1}
                      </td>
                      <td
                        className={`${dashboardTableStyles.td} ${dashboardTableStyles.tdLeft}`}
                      >
                        {row.direction}
                      </td>
                      <td className={dashboardTableStyles.td}>
                        {row.departureTime && row.arrivalTime
                          ? `${row.departureTime} - ${row.arrivalTime}`
                          : "Ã¢â‚¬â€"}
                      </td>
                      <td className={dashboardTableStyles.td}>
                        {row.busNumber ?? "Ã¢â‚¬â€"}
                      </td>
                      <td className={dashboardTableStyles.td}>
                        {row.availableSeats != null && row.totalSeats != null
                          ? `${row.availableSeats}/${row.totalSeats}`
                          : "Ã¢â‚¬â€"}
                      </td>
                      <td className={dashboardTableStyles.tdStatus}>
                        <Chip
                          className={`${styles.statusChip} ${getStatusClass(status)}`}
                        >
                          {t(`dispatcherArea.routes.table.statuses.${status}`)}
                        </Chip>
                      </td>
                      <td className={dashboardTableStyles.tdAction}>
                        <StatusDropdown
                          rowId={row.id}
                          openId={openDropdownId}
                          onToggle={setOpenDropdownId}
                          onStatusChange={handleStatusChange}
                          onEdit={onEditRoute ?? (() => {})}
                        />
                      </td>
                    </DashboardTr>
                  );
                })}
              </tbody>
            </DashboardTable>
          </div>
        </div>

        <div ref={paginationRef}>
          <TablePagination
            className={styles.pagination}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            prevAriaLabel={t("dispatcherArea.routes.table.pagination.prev")}
            nextAriaLabel={t("dispatcherArea.routes.table.pagination.next")}
          />
        </div>
      </DashboardCard>
    </div>
  );
}
