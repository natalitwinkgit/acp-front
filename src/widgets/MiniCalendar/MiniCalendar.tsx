"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./MiniCalendar.module.css";

type Props = {
  value?: Date | null;
  onChange: (date: Date) => void;
  onClose?: () => void;
};

const MONTHS_UA = [
  "Січень","Лютий","Березень","Квітень","Травень","Червень",
  "Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"
];


const WEEKDAYS = ["Пн","Вт","Ср","Чт","Пт","Сб","Нд"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function MiniCalendar({ value, onChange, onClose }: Props) {
  const initial = value ?? new Date();
  const [view, setView] = useState(() => new Date(initial.getFullYear(), initial.getMonth(), 1));

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) onClose?.();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);

  const days = useMemo(() => {
    const start = startOfMonth(view);
    const end = endOfMonth(view);

    
    const firstDow = (start.getDay() + 6) % 7; 
    const totalDays = end.getDate();

    const cells: { date: Date; muted: boolean }[] = [];

    
    for (let i = 0; i < firstDow; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() - (firstDow - i));
      cells.push({ date: d, muted: true });
    }

    
    for (let day = 1; day <= totalDays; day++) {
      cells.push({ date: new Date(view.getFullYear(), view.getMonth(), day), muted: false });
    }

    
    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1].date;
      const d = new Date(last);
      d.setDate(d.getDate() + 1);
      cells.push({ date: d, muted: true });
    }

    return cells;
  }, [view]);

  const monthLabel = MONTHS_UA[view.getMonth()];
  const yearLabel = String(view.getFullYear());

  const selected = value ?? null;

  return (
    <div ref={rootRef} className={styles.wrap} role="dialog" aria-label="Календар">
      <div className={styles.header}>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Попередній місяць"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
        >
          ‹
        </button>

        <div className={styles.center}>
          <div className={styles.pill}>{monthLabel}</div>
          <div className={styles.pill}>{yearLabel}</div>
        </div>

        <button
          type="button"
          className={styles.arrow}
          aria-label="Наступний місяць"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
        >
          ›
        </button>
      </div>

      <div className={styles.grid}>
        <div className={styles.row}>
          {WEEKDAYS.map((w) => (
            <div key={w} className={styles.cellWeek}>{w}</div>
          ))}
        </div>

        {}
        {Array.from({ length: days.length / 7 }).map((_, rowIdx) => (
          <div key={rowIdx} className={styles.row}>
            {days.slice(rowIdx * 7, rowIdx * 7 + 7).map(({ date, muted }) => {
              const isSel = selected ? isSameDay(date, selected) : false;
              return (
                <button
                  key={`${date.toISOString()}`}
                  type="button"
                  className={[
                    styles.cellDay,
                    muted ? styles.muted : "",
                    isSel ? styles.selected : "",
                  ].join(" ")}
                  onClick={() => {
                    onChange(date);
                    onClose?.();
                  }}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
