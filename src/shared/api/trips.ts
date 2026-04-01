import { apiFetch } from "./http";

type UnknownRecord = Record<string, unknown>;

export type TripSearchParams = {
  from?: string;
  to?: string;
  date?: string;
  seats?: number;
  page?: number;
  limit?: number;
};

export type Trip = {
  id: string;
  routeNumber: string | null;
  platform: string | null;
  direction: string;
  slug: string | null;
  from: string;
  to: string;
  date: string | null;
  departureTime: string | null;
  arrivalTime: string | null;
  price: number | null;
  availableSeats: number | null;
  totalSeats: number | null;
  imageSrc: string | null;
  raw: unknown;
};

export type TripAvailability = {
  tripId: string;
  totalSeats: number | null;
  reservedSeats: number | null;
  availableSeats: number | null;
  canReserve: boolean | null;
  raw: unknown;
};

export type CreateTripPayload = Record<string, unknown>;

type MessageResponse = {
  message?: string;
};

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getNestedValue(source: unknown, path: string) {
  return path.split(".").reduce<unknown>((currentValue, segment) => {
    if (!isRecord(currentValue)) {
      return undefined;
    }

    return currentValue[segment];
  }, source);
}

function getString(source: unknown, paths: string[]) {
  for (const path of paths) {
    const value = getNestedValue(source, path);

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }

    if (typeof value === "number") {
      return String(value);
    }
  }

  return null;
}

function getNumber(source: unknown, paths: string[]) {
  for (const path of paths) {
    const value = getNestedValue(source, path);

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsedValue = Number(value);

      if (Number.isFinite(parsedValue)) {
        return parsedValue;
      }
    }
  }

  return null;
}

function normalizeDate(value: string | null) {
  if (!value) {
    return null;
  }

  const directMatch = value.match(/^(\d{4}-\d{2}-\d{2})$/);
  if (directMatch) {
    return directMatch[1];
  }

  const isoMatch = value.match(/^(\d{4}-\d{2}-\d{2})[T\s]/);
  if (isoMatch) {
    return isoMatch[1];
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toISOString().slice(0, 10);
}

function splitDirection(direction: string) {
  const parts = direction
    .split(/\s[-—–]\s/)
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    from: parts[0] ?? "",
    to: parts.slice(1).join(" - ").trim(),
  };
}

function normalizeTrip(payload: unknown): Trip | null {
  if (!isRecord(payload)) {
    return null;
  }

  const id = getString(payload, ["id", "tripId", "trip_id"]);
  const explicitFrom = getString(payload, [
    "from",
    "fromCity",
    "departureCity",
    "origin",
    "origin.name",
    "route.from",
    "route.origin",
  ]);
  const explicitTo = getString(payload, [
    "to",
    "toCity",
    "arrivalCity",
    "destination",
    "destination.name",
    "route.to",
    "route.destination",
  ]);
  const direction =
    getString(payload, ["direction", "route.direction"]) ??
    (explicitFrom && explicitTo ? `${explicitFrom} - ${explicitTo}` : null);

  if (!id || !direction) {
    return null;
  }

  const splitRoute = explicitFrom && explicitTo
    ? { from: explicitFrom, to: explicitTo }
    : splitDirection(direction);

  if (!splitRoute.from || !splitRoute.to) {
    return null;
  }

  const departureDateTime = getString(payload, [
    "departureTime",
    "departureAt",
    "departureDateTime",
    "departure_datetime",
    "datetime",
    "tripDateTime",
  ]);

  const arrivalDateTime = getString(payload, [
    "arrivalTime",
    "arrivalAt",
    "arrivalDateTime",
    "arrival_datetime",
  ]);

  const date = normalizeDate(
    getString(payload, ["date", "tripDate", "departureDate"]) ?? departureDateTime,
  );

  return {
    id,
    routeNumber: getString(payload, ["routeNumber", "route_number"]),
    platform: getString(payload, ["platform"]),
    direction,
    slug: getString(payload, ["slug"]),
    from: splitRoute.from,
    to: splitRoute.to,
    date,
    departureTime: departureDateTime,
    arrivalTime: arrivalDateTime,
    price: getNumber(payload, ["price", "ticketPrice", "cost"]),
    availableSeats: getNumber(payload, [
      "availableSeats",
      "freeSeats",
      "free_seats",
      "available_places",
      "available_places_count",
      "seatsAvailable",
    ]),
    totalSeats: getNumber(payload, ["totalSeats", "maxSeats", "capacity", "seatsTotal"]),
    imageSrc: getString(payload, ["imageSrc", "image", "imageUrl", "photo", "photoUrl"]),
    raw: payload,
  };
}

function extractTripCollection(payload: unknown) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!isRecord(payload)) {
    return [];
  }

  const candidates = ["items", "trips", "data", "results"] as const;

  for (const key of candidates) {
    const value = payload[key];
    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
}

function extractTripEntity(payload: unknown) {
  if (normalizeTrip(payload)) {
    return payload;
  }

  if (!isRecord(payload)) {
    return null;
  }

  const candidates = ["trip", "data", "item", "result"] as const;

  for (const key of candidates) {
    const value = payload[key];

    if (normalizeTrip(value)) {
      return value;
    }
  }

  return null;
}

function extractAvailabilityEntity(payload: unknown) {
  if (!isRecord(payload)) {
    return payload;
  }

  const candidates = ["availability", "data", "result"] as const;

  for (const key of candidates) {
    const value = payload[key];

    if (isRecord(value)) {
      return value;
    }
  }

  return payload;
}

function normalizeAvailability(payload: unknown, tripId: string): TripAvailability {
  if (!isRecord(payload)) {
    return {
      tripId,
      totalSeats: null,
      reservedSeats: null,
      availableSeats: null,
      canReserve: null,
      raw: payload,
    };
  }

  const canReserveValue = getNestedValue(payload, "canReserve");
  const legacyAvailableValue = getNestedValue(payload, "available");
  const canReserve =
    typeof canReserveValue === "boolean"
      ? canReserveValue
      : typeof legacyAvailableValue === "boolean"
        ? legacyAvailableValue
        : null;

  return {
    tripId,
    totalSeats: getNumber(payload, ["totalSeats", "maxSeats", "capacity", "seatsTotal"]),
    reservedSeats: getNumber(payload, ["reservedSeats", "reserved_seats"]),
    availableSeats: getNumber(payload, [
      "availableSeats",
      "freeSeats",
      "free_seats",
      "available_places",
      "available_places_count",
      "seatsAvailable",
    ]),
    canReserve,
    raw: payload,
  };
}

function toQueryString(params: TripSearchParams) {
  const searchParams = new URLSearchParams();

  if (params.from) {
    searchParams.set("from", params.from);
  }

  if (params.to) {
    searchParams.set("to", params.to);
  }

  if (params.date) {
    searchParams.set("date", params.date);
  }

  if (typeof params.seats === "number" && Number.isFinite(params.seats)) {
    searchParams.set("seats", String(params.seats));
  }

  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 100));

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export async function getTrips(params: TripSearchParams = {}) {
  const response = await apiFetch<unknown>(`/trips${toQueryString(params)}`, {
    includeAuth: false,
    skipAuthRefresh: true,
  });

  return extractTripCollection(response)
    .map(normalizeTrip)
    .filter((trip): trip is Trip => trip !== null);
}

export async function getTripById(id: string | number) {
  const response = await apiFetch<unknown>(`/trips/${encodeURIComponent(String(id))}`, {
    includeAuth: false,
    skipAuthRefresh: true,
  });

  const trip = normalizeTrip(extractTripEntity(response));

  if (!trip) {
    throw new Error(`Trip "${String(id)}" has an unsupported response shape.`);
  }

  return trip;
}

export async function getTripAvailability(id: string | number, seats?: number) {
  const queryString =
    typeof seats === "number" && Number.isFinite(seats)
      ? `?seats=${encodeURIComponent(String(seats))}`
      : "";

  const response = await apiFetch<unknown>(
    `/trips/${encodeURIComponent(String(id))}/availability${queryString}`,
    {
      includeAuth: false,
      skipAuthRefresh: true,
    },
  );

  return normalizeAvailability(extractAvailabilityEntity(response), String(id));
}

export function createTrip(payload: CreateTripPayload) {
  return apiFetch<unknown>("/admin/create-trip", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteTrip(id: string | number) {
  return apiFetch<MessageResponse>(`/admin/trip/${encodeURIComponent(String(id))}`, {
    method: "DELETE",
  });
}
