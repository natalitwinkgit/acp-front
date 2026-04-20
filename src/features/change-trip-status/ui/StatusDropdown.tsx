"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";
import type { TripStatus } from "@/src/entities/trip";
import styles from "./status-dropdown.module.css";

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

export function StatusDropdown({
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
