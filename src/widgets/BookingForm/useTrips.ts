"use client";

import { useEffect, useState } from "react";
import { getTrips, Trip } from "@/src/shared/api/trips";

type UseTripsResult = {
  trips: Trip[];
  loading: boolean;
  error: string | null;
};

export function useTrips(): UseTripsResult {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getTrips()
      .then((data) => {
        if (!cancelled) {
          setTrips(data);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load trips");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []); // empty dependency array — fetch exactly once on mount

  return { trips, loading, error };
}
