
"use client";

import styles from "./ScheduleTable.module.css";

type Col = {
  title: string;
  iconSrc: string;
  subTitle: string;
};

type Props = {
  title?: string;
  columns?: Col[];
  rows?: Array<[string, string, string]>;
};

const defaultColumns: Col[] = [
  {
    title: "м. Черкаси",
    iconSrc: "/icons/ScheduleTable/map-point.svg",
    subTitle: "Відправлення\nпл.Дружби Народів",
  },
  {
    title: "м.Київ",
    iconSrc: "/icons/ScheduleTable/map-point-wave-outline.svg",
    subTitle: "Прибуття\nст.м.Харківська",
  },
  {
    title: "м.Київ",
    iconSrc: "/icons/ScheduleTable/map-point-wave-outline.svg",
    subTitle: "Прибуття\nст.м.Чернігівська",
  },
];

const defaultRows: Array<[string, string, string]> = [
  ["5:30", "8:30", "9:00"],
  ["6:30", "9:30", "10:00"],
  ["7:30", "10:30", "11:00"],
  ["8:30", "11:30", "12:00"],
  ["9:30", "12:30", "13:00"],
  ["10:30", "13:30", "14:00"],
  ["11:20", "14:20", "14:50"],
  ["12:15", "15:15", "15:45"],
  ["13:30", "16:30", "17:00"],
  ["14:30", "17:30", "18:00"],
  ["15:30", "18:30", "19:00"],
  ["16:30", "19:30", "20:00"],
  ["17:30", "20:30", "21:00"],
  ["18:30", "21:30", "22:00"],
  ["19:30", "22:30", "23:00"],
];

export default function ScheduleTable({
  title = "Розклад",
  columns = defaultColumns,
  rows = defaultRows,
}: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.table} role="table" aria-label={title}>
        {}
        <div className={styles.headerRow} role="row">
          {columns.map((c, idx) => (
            <div key={idx} className={styles.headerCell} role="columnheader">
              <img className={styles.headerIcon} src={c.iconSrc} alt="" aria-hidden="true" />
              <span className={styles.headerText}>{c.title}</span>
            </div>
          ))}
        </div>

        {}
        <div className={styles.subRow} role="row">
          {columns.map((c, idx) => (
            <div key={idx} className={styles.subCell} role="cell">
              {c.subTitle.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          ))}
        </div>

        {}
        <div className={styles.body} role="rowgroup">
          {rows.map((r, i) => (
            <div
              key={i}
              className={`${styles.timeRow} ${i % 2 === 0 ? styles.rowGray : styles.rowCream}`}
              role="row"
            >
              <div className={styles.timeCell} role="cell">
                {r[0]}
              </div>
              <div className={styles.timeCell} role="cell">
                {r[1]}
              </div>
              <div className={styles.timeCell} role="cell">
                {r[2]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
