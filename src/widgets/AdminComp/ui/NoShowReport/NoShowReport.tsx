"use client";

import { useState } from "react";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { AdminCard, AdminTable, AdminThead, AdminTr } from "@/src/shared";
import styles from "./NoShowReport.module.css";

type NoShowRow = {
  id: number;
  name: string;
  phone: string;
  ratio: string;
};

const MOCK_ROWS: NoShowRow[] = [];

type Props = { rows?: NoShowRow[] };

export default function NoShowReport({ rows = MOCK_ROWS }: Props) {
  const { t } = useI18n();
  const [blocked, setBlocked] = useState<Set<number>>(new Set());
  const visibleRows = rows.filter((row) => !blocked.has(row.id));

  function block(id: number) {
    setBlocked((prev) => new Set(prev).add(id));
  }

  return (
    <AdminCard className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>
          {t("dispatcherArea.analytics.noShowReport.title")}
        </span>
        <span className={styles.subtitle}>
          {t("dispatcherArea.analytics.noShowReport.subtitle")}
        </span>
      </div>

      {visibleRows.length === 0 ? (
        <div className={styles.emptyState} aria-live="polite">
          <div className={styles.emptyCard}>
            <div className={styles.icon} aria-hidden="true" />
            <p className={styles.emptyTitle}>
              {t("dispatcherArea.analytics.noShowReport.empty.title")}
            </p>
            <p className={styles.emptyText}>
              {t("dispatcherArea.analytics.noShowReport.empty.description")}
            </p>
            <p className={styles.emptyText}>
              {t("dispatcherArea.analytics.noShowReport.empty.note")}
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <AdminTable className={styles.table}>
            <AdminThead className={styles.theadRow}>
              <th className={styles.thNum}>
                {t("dispatcherArea.analytics.noShowReport.columns.number")}
              </th>
              <th className={styles.th}>
                {t("dispatcherArea.analytics.noShowReport.columns.passenger")}
              </th>
              <th className={styles.th}>
                {t("dispatcherArea.analytics.noShowReport.columns.phone")}
              </th>
              <th className={styles.thRatio}>
                {t("dispatcherArea.analytics.noShowReport.columns.ratio")}
              </th>
              <th className={styles.thAction} />
            </AdminThead>
            <tbody>
              {visibleRows.map((row, index) => (
                <AdminTr key={row.id} className={styles.row}>
                  <td className={styles.tdNum}>{index + 1}</td>
                  <td className={`${styles.td} ${styles.tdLeft}`}>
                    {row.name}
                  </td>
                  <td className={`${styles.td} ${styles.tdLeft}`}>
                    {row.phone}
                  </td>
                  <td className={styles.td}>{row.ratio}</td>
                  <td className={styles.tdAction}>
                    <button
                      type="button"
                      className={styles.blockBtn}
                      onClick={() => block(row.id)}
                    >
                      {t("dispatcherArea.analytics.noShowReport.blockBtn")}
                    </button>
                  </td>
                </AdminTr>
              ))}
            </tbody>
          </AdminTable>
        </div>
      )}
    </AdminCard>
  );
}
