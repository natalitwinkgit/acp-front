"use client";

import { AddOrderButton } from "@/src/features/add-order";
import { TicketSearchInput } from "@/src/features/search-tickets";
import { TicketSortDropdown } from "@/src/features/sort-tickets";
import type { SortOption } from "@/src/features/sort-tickets";
import styles from "./TicketsToolbar.module.css";

function formatUkrainianDate(date: Date): string {
  return date.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type Props = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption | "";
  onSortChange: (option: SortOption) => void;
  onAddOrder: () => void;
};

export default function TicketsToolbar({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  onAddOrder,
}: Props) {
  const today = formatUkrainianDate(new Date());

  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Панель управління квитками">
      <TicketSearchInput value={searchQuery} onChange={onSearchChange} />
      <TicketSortDropdown value={sortOption} onChange={onSortChange} />
      <AddOrderButton onClick={onAddOrder} />
      <div className={styles.date}>
        <span className={styles.dateText}>{today}</span>
        <svg
          className={styles.calendarIcon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
    </div>
  );
}
