"use client";

import { useMemo, useState } from "react";
import styles from "./MiniCalendar.module.css";

type Props = {
  value: Date | null;
  onChange: (d: Date) => void;
  onClose: () => void;

  // NEW: локализация (опционально)
  months?: string[];
  weekdays?: string[];
};

const DEFAULT_MONTHS = [
  "Січень","Лютий","Березень","Квітень","Травень","Червень",
  "Липень","Серпень","Вересень","Жовтень","Листопад","Грудень",
];

const DEFAULT_WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

// Monday-first: 0..6 where 0 = Monday
function mondayIndex(jsDay: number) {
  return (jsDay + 6) % 7;
}

export default function MiniCalendar({
  value,
  onChange,
  onClose,
  months,
  weekdays,
}: Props) {
  const locMonths = months && months.length === 12 ? months : DEFAULT_MONTHS;
  const locWeekdays = weekdays && weekdays.length === 7 ? weekdays : DEFAULT_WEEKDAYS;

  const [cursor, setCursor] = useState<Date>(() => value ?? new Date());

  const title = useMemo(() => {
    return `${locMonths[cursor.getMonth()]} ${cursor.getFullYear()}`;
  }, [cursor, locMonths]);

  const days = useMemo(() => {
    const s = startOfMonth(cursor);
    const e = endOfMonth(cursor);

    const padStart = mondayIndex(s.getDay());
    const total = padStart + e.getDate();

    const cells: Array<{ date: Date | null; label: number | null }> = [];

    for (let i = 0; i < padStart; i++) cells.push({ date: null, label: null });

    for (let d = 1; d <= e.getDate(); d++) {
      cells.push({ date: new Date(cursor.getFullYear(), cursor.getMonth(), d), label: d });
    }

    // pad to full weeks
    const padEnd = (7 - (total % 7)) % 7;
    for (let i = 0; i < padEnd; i++) cells.push({ date: null, label: null });

    return cells;
  }, [cursor]);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const selected = value;

  return (
    <div className={styles.wrap} role="dialog" aria-label="Calendar">
      <div className={styles.top}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
          aria-label="Prev month"
        >
          ‹
        </button>

        <div className={styles.title}>{title}</div>

        <button
          type="button"
          className={styles.navBtn}
          onClick={() => setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
          aria-label="Next month"
        >
          ›
        </button>

        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <div className={styles.weekdays}>
        {locWeekdays.map((w) => (
          <div key={w} className={styles.weekday}>
            {w}
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {days.map((cell, idx) => {
          if (!cell.date) {
            return <div key={idx} className={styles.cellEmpty} />;
          }

          const isSelected = selected ? isSameDay(cell.date, selected) : false;

          return (
            <button
              key={idx}
              type="button"
              className={`${styles.cell} ${isSelected ? styles.selected : ""}`}
              onClick={() => {
                onChange(cell.date!);
                onClose();
              }}
            >
              {cell.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}