import { ARCHIVED_TICKETS } from "../model/archive-tickets";
import type { ArchivedTicket } from "../model/archive-tickets";

export type ArchiveTicketsResponse = {
  tickets: ArchivedTicket[];
};

export async function getArchivedTickets(): Promise<ArchiveTicketsResponse> {
  return {
    tickets: ARCHIVED_TICKETS,
  };
}
