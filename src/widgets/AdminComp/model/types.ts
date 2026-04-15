export type TripStatus = "DEPARTED" | "BOARDING" | "SCHEDULED" | "CANCELLED";

export type RouteRow = {
  id: string;
  direction: string;
  departureTime: string | null;
  arrivalTime: string | null;
  busNumber: string | null;
  availableSeats: number | null;
  totalSeats: number | null;
  status: TripStatus | null;
};

export type RoutesStatVariant = "dark" | "yellow" | "green" | "red";

export type RoutesStatBadgeProps = {
  icon: string;
  label: string;
  count: number;
  variant: RoutesStatVariant;
};

export type RoutesStatsProps = {
  total: number;
  boarding: number;
  departed: number;
  cancelled: number;
};
