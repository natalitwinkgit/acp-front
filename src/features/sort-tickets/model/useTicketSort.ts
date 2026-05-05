import { useCallback, useState } from "react";
import type { Ticket } from "@/src/entities/ticket";
import type { SortOption } from "./types";

function parseDatetime(date: string, time: string): number {
  const [day, month, year] = date.split(".").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes).getTime();
}

export function useTicketSort() {
  const [sortOption, setSortOption] = useState<SortOption | "">("");

  const sortTickets = useCallback(
    (tickets: Ticket[]): Ticket[] => {
      if (!sortOption) return tickets;

      return [...tickets].sort((a, b) => {
        switch (sortOption) {
          case "date-asc":
            return (
              parseDatetime(a.departureDate, a.departureTime) -
              parseDatetime(b.departureDate, b.departureTime)
            );
          case "date-desc":
            return (
              parseDatetime(b.departureDate, b.departureTime) -
              parseDatetime(a.departureDate, a.departureTime)
            );
          case "name-asc":
            return a.passengerName.localeCompare(b.passengerName, "uk");
          case "name-desc":
            return b.passengerName.localeCompare(a.passengerName, "uk");
          case "status":
            return a.status.localeCompare(b.status);
          default:
            return 0;
        }
      });
    },
    [sortOption]
  );

  return { sortOption, setSortOption, sortTickets };
}
