import { apiFetch } from "./http";

export type Trip = {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  price: number;
  availableSeats: number;
};

export function getTrips() {
  return apiFetch<Trip[]>("/trips", { includeAuth: false });
}
