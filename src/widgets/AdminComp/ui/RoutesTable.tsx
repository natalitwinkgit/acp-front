"use client";

import { useState } from "react";
import Chip from "@/src/shared/ui/Chip/Chip";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import type { RouteRow, TripStatus } from "../model/types";
import styles from "./admin-routes-table.module.css";

const MOCK_ROWS: RouteRow[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  direction: "м.Черкаси - м.Київ (ст.м.Харківська)",
  departureTime: "05:30",
  arrivalTime: "08:30",
  busNumber: "СА 5374 СО",
  availableSeats: 12,
  totalSeats: 18,
  status: (["DEPARTED", "BOARDING", "SCHEDULED", "CANCELLED"] as TripStatus[])[
    i % 4
  ],
}));

const STATUS_ITEMS: TripStatus[] = [
  "DEPARTED",
  "BOARDING",
  "SCHEDULED",
  "CANCELLED",
];

type StatusDropdownProps = {
  rowId: string;
  openId: string | null;
  onToggle: (id: string | null) => void;
  onStatusChange: (id: string, status: TripStatus) => void;
  onEdit: (id: string) => void;
};

function StatusDropdown({
  rowId,
  openId,
  onToggle,
  onStatusChange,
  onEdit,
}: StatusDropdownProps) {
  const { t } = useI18n();
  const isOpen = openId === rowId;

  return (
    <div className={styles.dropdownWrapper}>
      <button
        type="button"
        className={styles.chevronBtn}
        onClick={() => onToggle(isOpen ? null : rowId)}
        // aria-label="Змінити статус"
      >
        <span
          className={`${styles.chevron} ${isOpen ? styles.chevronUp : ""}`}
        />
      </button>

      {isOpen && (
        <ul className={styles.dropdown}>
          {STATUS_ITEMS.map((s) => (
            <li key={s}>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  onStatusChange(rowId, s);
                  onToggle(null);
                }}
              >
                {t(`dispatcherArea.routes.table.statuses.${s}`)}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className={styles.dropdownItem}
              onClick={() => {
                onEdit(rowId);
                onToggle(null);
              }}
            >
              {t("dispatcherArea.routes.table.statuses.edit")}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

function getStatusClass(status: TripStatus | null) {
  switch (status) {
    case "DEPARTED":
      return styles.statusDeparted;
    case "BOARDING":
      return styles.statusBoarding;
    case "SCHEDULED":
      return styles.statusScheduled;
    case "CANCELLED":
      return styles.statusCancelled;
    default:
      return "";
  }
}

type RoutesTableProps = {
  rows?: RouteRow[];
  onEditRoute?: (id: string) => void;
};

export default function RoutesTable({
  rows = MOCK_ROWS,
  onEditRoute,
}: RoutesTableProps) {
  const { t } = useI18n();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [rowStatuses, setRowStatuses] = useState<Record<string, TripStatus>>(
    () => Object.fromEntries(rows.map((r) => [r.id, r.status ?? "SCHEDULED"])),
  );
  const [page, setPage] = useState(1);
  const totalPages = 2;

  function handleStatusChange(id: string, status: TripStatus) {
    setRowStatuses((prev) => ({ ...prev, [id]: status }));
  }

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
          className={styles.pageBtn}
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
          className={styles.pageBtn}
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
