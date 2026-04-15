import { useCallback, useState } from "react";
import type { Ticket } from "@/src/entities/ticket";

export function useTicketSearch() {
  const [query, setQuery] = useState("");

  const filterTickets = useCallback(
    (tickets: Ticket[]): Ticket[] => {
      const q = query.trim().toLowerCase();
      if (!q) return tickets;

      return tickets.filter(
        (ticket) =>
          ticket.bookingNumber.toLowerCase().includes(q) ||
          ticket.passengerName.toLowerCase().includes(q) ||
          ticket.passengerPhone.replace(/\D/g, "").includes(q.replace(/\D/g, ""))
      );
    },
    [query]
  );

  return { query, setQuery, filterTickets };
}
