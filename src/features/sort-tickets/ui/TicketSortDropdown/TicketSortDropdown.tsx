"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { useEffect, useRef, useState } from "react";
import type { SortOption } from "../../model/types";
import styles from "./TicketSortDropdown.module.css";

type SortOptionItem = {
  value: SortOption;
  label: string;
};

type Props = {
  value: SortOption | "";
  onChange: (value: SortOption) => void;
};

export default function TicketSortDropdown({ value, onChange }: Props) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sortOptions: SortOptionItem[] = [
    {
      value: "date-asc",
      label: t("dispatcherArea.tickets.sort.options.dateAsc"),
    },
    {
      value: "date-desc",
      label: t("dispatcherArea.tickets.sort.options.dateDesc"),
    },
    {
      value: "name-asc",
      label: t("dispatcherArea.tickets.sort.options.nameAsc"),
    },
    {
      value: "name-desc",
      label: t("dispatcherArea.tickets.sort.options.nameDesc"),
    },
    {
      value: "status",
      label: t("dispatcherArea.tickets.sort.options.status"),
    },
  ];

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        containerRef.current
        && !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedLabel =
    sortOptions.find((option) => option.value === value)?.label
    ?? t("dispatcherArea.routes.table.sort");

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
          className={[styles.chevron, isOpen && styles.chevronOpen]
            .filter(Boolean)
            .join(" ")}
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
        <ul
          className={styles.list}
          role="listbox"
          aria-label={t("dispatcherArea.tickets.sort.aria")}
        >
          {sortOptions.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              className={[
                styles.option,
                value === option.value && styles.optionSelected,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
