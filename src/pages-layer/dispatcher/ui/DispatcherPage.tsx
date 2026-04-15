"use client";

import { mockTickets } from "@/src/entities/ticket";
import { useTicketSearch } from "@/src/features/search-tickets";
import { useTicketSort } from "@/src/features/sort-tickets";
import { TicketsTable } from "@/src/widgets/tickets-table";
import { TicketsToolbar } from "@/src/widgets/tickets-toolbar";
import { useMemo } from "react";
import styles from "./dispatcher-page.module.css";

export default function DispatcherPage() {
  const { query, setQuery, filterTickets } = useTicketSearch();
  const { sortOption, setSortOption, sortTickets } = useTicketSort();

  const displayedTickets = useMemo(
    () => sortTickets(filterTickets(mockTickets)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, sortOption]
  );

  function handleAddOrder() {
    // TODO: open add-order modal / navigate to booking flow
  }

  function handleDetails(ticketId: string) {
    // TODO: navigate to ticket detail page
    console.log("Open details for ticket:", ticketId);
  }

  return (
    <div className={styles.page}>
      <TicketsToolbar
        searchQuery={query}
        onSearchChange={setQuery}
        sortOption={sortOption}
        onSortChange={setSortOption}
        onAddOrder={handleAddOrder}
      />
      <TicketsTable tickets={displayedTickets} onDetails={handleDetails} />
    </div>
  );
}
