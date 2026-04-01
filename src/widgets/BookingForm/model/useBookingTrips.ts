"use client";

import { useEffect, useMemo, useState } from "react";

import { getTrips, type Trip } from "@/src/shared/api";

import {
  buildRouteOptions,
  formatISODate,
  parseRouteValue,
  sortTripsByTime,
} from "../lib/bookingForm.utils";
import type { BookingTranslateFn } from "./types";

type UseBookingTripsParams = {
  initialTrips: Trip[];
  selectedRouteValue: string;
  date: Date | null;
  seats: number;
  t: BookingTranslateFn;
};

export function useBookingTrips({
  initialTrips,
  selectedRouteValue,
  date,
  seats,
  t,
}: UseBookingTripsParams) {
  const [allTrips, setAllTrips] = useState<Trip[]>(initialTrips);
  const [matchingTrips, setMatchingTrips] = useState<Trip[]>([]);
  const [selectedTripId, setSelectedTripId] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(initialTrips.length === 0);
  const [isSearchingTrips, setIsSearchingTrips] = useState(false);

  const routeOptions = useMemo(() => buildRouteOptions(allTrips), [allTrips]);
  const selectedRouteOption = useMemo(
    () => routeOptions.find((routeOption) => routeOption.value === selectedRouteValue) ?? null,
    [routeOptions, selectedRouteValue],
  );
  const timeOptions = useMemo(() => sortTripsByTime(matchingTrips), [matchingTrips]);
  const selectedTrip = useMemo(
    () => timeOptions.find((trip) => trip.id === selectedTripId) ?? null,
    [selectedTripId, timeOptions],
  );

  useEffect(() => {
    if (initialTrips.length > 0) {
      setAllTrips(initialTrips);
      setIsBootstrapping(false);
      return;
    }

    let isCancelled = false;

    const loadTrips = async () => {
      setIsBootstrapping(true);
      setStatusMessage("");
      setIsError(false);

      try {
        const trips = await getTrips();

        if (isCancelled) {
          return;
        }

        setAllTrips(trips);

        if (trips.length === 0) {
          setStatusMessage(t("bookingForm.status.empty"));
        }
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setStatusMessage(
          error instanceof Error && error.message
            ? error.message
            : t("bookingForm.status.loadError"),
        );
        setIsError(true);
      } finally {
        if (!isCancelled) {
          setIsBootstrapping(false);
        }
      }
    };

    void loadTrips();

    return () => {
      isCancelled = true;
    };
  }, [initialTrips, t]);

  useEffect(() => {
    if (!selectedRouteValue) {
      setMatchingTrips([]);
      setSelectedTripId("");
      if (!isBootstrapping && routeOptions.length > 0) {
        setStatusMessage("");
        setIsError(false);
      }

      return;
    }

    let isCancelled = false;
    const { from, to } = parseRouteValue(selectedRouteValue);
    const selectedDateKey = date ? formatISODate(date) : null;

    const loadMatchingTrips = async () => {
      setIsSearchingTrips(true);
      setStatusMessage("");
      setIsError(false);

      try {
        const trips = await getTrips({
          from,
          to,
          date: selectedDateKey ?? undefined,
          seats,
        });

        if (isCancelled) {
          return;
        }

        const sortedTrips = sortTripsByTime(trips);
        setMatchingTrips(sortedTrips);
        setSelectedTripId((currentTripId) => (
          sortedTrips.some((trip) => trip.id === currentTripId)
            ? currentTripId
            : (sortedTrips[0]?.id ?? "")
        ));

        if (sortedTrips.length === 0) {
          setStatusMessage(t("bookingForm.status.noTrips"));
        }
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setMatchingTrips([]);
        setSelectedTripId("");
        setStatusMessage(
          error instanceof Error && error.message
            ? error.message
            : t("bookingForm.status.searchError"),
        );
        setIsError(true);
      } finally {
        if (!isCancelled) {
          setIsSearchingTrips(false);
        }
      }
    };

    void loadMatchingTrips();

    return () => {
      isCancelled = true;
    };
  }, [date, isBootstrapping, routeOptions.length, seats, selectedRouteValue, t]);

  return {
    routeOptions,
    selectedRouteOption,
    timeOptions,
    selectedTrip,
    selectedTripId,
    setSelectedTripId,
    statusMessage,
    setStatusMessage,
    isError,
    setIsError,
    isBootstrapping,
    isSearchingTrips,
  };
}
