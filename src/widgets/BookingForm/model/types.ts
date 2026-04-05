import type { Trip } from "@/src/entities/trip";

export type RouteOption = {
  value: string;
  from: string;
  to: string;
  label: string;
};

export type BookingFormProps = {
  initialTrips?: Trip[];
};

export type BookingTranslateFn = (key: string) => string;

export const EMPTY_TRIPS: Trip[] = [];

export const SEAT_OPTIONS = ["1", "2", "3", "4", "5", "6", "7"] as const;
