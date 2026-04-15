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
