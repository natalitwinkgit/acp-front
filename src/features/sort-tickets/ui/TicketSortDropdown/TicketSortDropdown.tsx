"use client";

import { useEffect, useRef, useState } from "react";
import type { SortOption } from "../../model/types";
import styles from "./TicketSortDropdown.module.css";

type SortOptionItem = {
  value: SortOption;
  label: string;
};

const SORT_OPTIONS: SortOptionItem[] = [
  { value: "date-asc", label: "Дата (спочатку старіші)" },
  { value: "date-desc", label: "Дата (спочатку новіші)" },
  { value: "name-asc", label: "Прізвище А–Я" },
  { value: "name-desc", label: "Прізвище Я–А" },
  { value: "status", label: "За статусом" },
];

type Props = {
  value: SortOption | "";
  onChange: (value: SortOption) => void;
};

export default function TicketSortDropdown({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedLabel =
    SORT_OPTIONS.find((o) => o.value === value)?.label ?? "Сортувати";

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.label}>{selectedLabel}</span>
        <svg
          className={[styles.chevron, isOpen && styles.chevronOpen].filter(Boolean).join(" ")}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.list} role="listbox" aria-label="Параметри сортування">
          {SORT_OPTIONS.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={[
                styles.option,
                value === opt.value && styles.optionSelected,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
