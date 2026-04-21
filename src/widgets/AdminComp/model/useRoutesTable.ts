"use client";

import { useState } from "react";
import type { TripStatus } from "@/src/entities/trip";
import type { RouteRow } from "./types";
import { MOCK_ROWS } from "../lib/routesTable.utils";

type UseRoutesTableParams = {
  rows?: RouteRow[];
  totalPages?: number;
};

export function useRoutesTable({
  rows = MOCK_ROWS,
  totalPages = 2,
}: UseRoutesTableParams = {}) {
  const [rowStatuses, setRowStatuses] = useState<Record<string, TripStatus>>(
    () => Object.fromEntries(rows.map((r) => [r.id, r.status ?? "SCHEDULED"])),
  );
  const [page, setPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  function handleStatusChange(id: string, status: TripStatus) {
    setRowStatuses((prev) => ({ ...prev, [id]: status }));
  }

  return {
    openDropdownId,
    setOpenDropdownId,
    rowStatuses,
    handleStatusChange,
    page,
    setPage,
    totalPages,
  };
}
