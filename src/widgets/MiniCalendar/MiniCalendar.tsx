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

  const monthTitle = useMemo(() => locMonths[cursor.getMonth()], [cursor, locMonths]);
  const yearTitle = useMemo(() => String(cursor.getFullYear()), [cursor]);

  const days = useMemo(() => {
    const start = startOfMonth(cursor);
    const end = endOfMonth(cursor);

    const padStart = mondayIndex(start.getDay());
    const daysInCurrentMonth = end.getDate();
    const prevMonthEnd = endOfMonth(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1));

    const cells: Array<{
      date: Date;
      label: number;
      inCurrentMonth: boolean;
    }> = [];

    for (let i = padStart; i > 0; i--) {
      const day = prevMonthEnd.getDate() - i + 1;
      cells.push({
        date: new Date(cursor.getFullYear(), cursor.getMonth() - 1, day),
        label: day,
        inCurrentMonth: false,
      });
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      cells.push({
        date: new Date(cursor.getFullYear(), cursor.getMonth(), day),
        label: day,
        inCurrentMonth: true,
      });
    }

    const fillNext = 42 - cells.length;
    for (let day = 1; day <= fillNext; day++) {
      cells.push({
        date: new Date(cursor.getFullYear(), cursor.getMonth() + 1, day),
        label: day,
        inCurrentMonth: false,
      });
    }

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

        <div className={styles.title}>
          <span className={styles.titlePart}>{monthTitle}</span>
          <span className={styles.titlePart}>{yearTitle}</span>
        </div>

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
          const isSelected = selected ? isSameDay(cell.date, selected) : false;
          const isWeekend = idx % 7 === 5 || idx % 7 === 6;

          return (
            <button
              key={idx}
              type="button"
              className={[
                styles.cell,
                !cell.inCurrentMonth ? styles.cellMuted : "",
                isWeekend ? styles.cellWeekend : "",
                isSelected ? styles.selected : "",
              ].join(" ")}
              onClick={() => {
                onChange(cell.date);
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
