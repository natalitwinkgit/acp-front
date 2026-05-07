"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { useEffect, useRef, useState } from "react";
import type { SortOption } from "../../model/types";
import styles from "./TicketSortDropdown.module.css";
import { Dropdown } from "@/src/shared/ui/Dropdown/Dropdown";

export type TicketSortDropdownOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string = SortOption> = {
  options?: TicketSortDropdownOption<T>[];
  defaultLabel?: string;
  ariaLabel?: string;
  value: T | "";
  onChange: (value: T) => void;
};
const dropdownId = "routes-sort";
export default function TicketSortDropdown<T extends string = SortOption>({
  options,
  defaultLabel,
  value,
  onChange,
}: Props<T>) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const ignoreNextCloseRef = useRef(false);
  const defaultOptions: TicketSortDropdownOption<SortOption>[] = [
    {
      value: "date-asc",
      label: t("dispatcherArea.tickets.sort.options.dateAsc"),
    },
    {
      value: "date-desc",
      label: t("dispatcherArea.tickets.sort.options.dateDesc"),
    },
    {
      value: "filter-booked",
      label: t("dispatcherArea.tickets.sort.options.filterBooked"),
    },
    {
      value: "filter-paid",
      label: t("dispatcherArea.tickets.sort.options.filterPaid"),
    },
    {
      value: "filter-cancelled",
      label: t("dispatcherArea.tickets.sort.options.filterCancelled"),
    },
  ];
  const sortOptions = (options ??
    defaultOptions) as TicketSortDropdownOption<T>[];

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedLabel =
    sortOptions.find((option) => option.value === value)?.label ??
    defaultLabel ??
    t("dispatcherArea.routes.table.sort");

  const items = sortOptions.map((option) => ({
    label: option.label,
    onClick: () => onChange(option.value),
  }));

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        onMouseDown={() => {
          ignoreNextCloseRef.current = isOpen;
        }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.label}>{selectedLabel}</span>
        <span
          className={[styles.chevron, isOpen && styles.chevronOpen]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <Dropdown
          id={dropdownId}
          openId={isOpen ? dropdownId : null}
          onToggle={(id) => {
            if (id === null && ignoreNextCloseRef.current) {
              ignoreNextCloseRef.current = false;
              return;
            }

            ignoreNextCloseRef.current = false;
            setIsOpen(id === dropdownId);
          }}
          items={items}
          hideTrigger
        />
      )}
    </div>
  );
}
