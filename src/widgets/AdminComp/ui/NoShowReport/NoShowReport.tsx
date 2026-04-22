"use client";

import { useState } from "react";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import {
  AdminCard,
  AdminTable,
  AdminThead,
  AdminTr,
} from "@/src/shared";
import styles from "./NoShowReport.module.css";

type NoShowRow = {
  id: number;
  name: string;
  phone: string;
  ratio: string;
};

const MOCK_ROWS: NoShowRow[] = [
  { id: 1, name: "Денисенко Сергій", phone: "+380675494578", ratio: "8/6" },
  { id: 2, name: "Сисоєва Інна", phone: "+380675494578", ratio: "12/7" },
  { id: 3, name: "Трайтак Ігор", phone: "+380675494578", ratio: "14/12" },
  { id: 4, name: "Юнак Людмила", phone: "+380675494578", ratio: "17/6" },
  { id: 5, name: "Науменко Ольга", phone: "+380675494578", ratio: "19/12" },
  { id: 6, name: "Ковтун Максим", phone: "+380675494578", ratio: "12/6" },
  { id: 7, name: "Науменко Ольга", phone: "+380675494578", ratio: "19/12" },
  { id: 8, name: "Науменко Ольга", phone: "+380675494578", ratio: "19/12" },
];

type Props = { rows?: NoShowRow[] };

export default function NoShowReport({ rows = MOCK_ROWS }: Props) {
  const { t } = useI18n();
  const [blocked, setBlocked] = useState<Set<number>>(new Set());

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
            {rows.map(
              (row, index) =>
                !blocked.has(row.id) && (
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
                      {
                        <button
                          type="button"
                          className={styles.blockBtn}
                          onClick={() => block(row.id)}
                        >
                          {t("dispatcherArea.analytics.noShowReport.blockBtn")}
                        </button>
                      }
                    </td>
                  </AdminTr>
                ),
            )}
          </tbody>
        </AdminTable>
      </div>
    </AdminCard>
  );
}
