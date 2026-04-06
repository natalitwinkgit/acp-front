import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTripById } from "@/src/entities/trip";
import TicketBookingScreen from "@/src/pages-layer/ticket-booking/ui/TicketBookingPage";
import { hasLocale, type Locale } from "@/src/shared/i18n/config";
import {
  getPopularRouteBySlug,
  getLocalizedRouteValue,
  mapTripToPopularRoute,
  type PopularRoute,
} from "@/src/entities/trip";
import { createPageMetadata, getSeoCopy, getTicketBookingSeo } from "@/src/shared/seo/metadata";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type TicketSelection = {
  tripId: string | null;
  seats: number;
  from: string | null;
  to: string | null;
  date: string | null;
  departureTime: string | null;
  arrivalTime: string | null;
  price: number | null;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? null : value ?? null;
}

function parseSelection(searchParams?: Record<string, string | string[] | undefined>): TicketSelection {
  const seatsValue = Number(getSingleValue(searchParams?.seats));
  const priceValue = Number(getSingleValue(searchParams?.price));

  return {
    tripId: getSingleValue(searchParams?.tripId),
    seats: Number.isFinite(seatsValue) && seatsValue > 0 ? seatsValue : 1,
    from: getSingleValue(searchParams?.from),
    to: getSingleValue(searchParams?.to),
    date: getSingleValue(searchParams?.date),
    departureTime: getSingleValue(searchParams?.departureTime),
    arrivalTime: getSingleValue(searchParams?.arrivalTime),
    price: Number.isFinite(priceValue) ? priceValue : null,
  };
}

async function resolveRoute(slug: string, tripId: string | null) {
  const fallbackRoute = getPopularRouteBySlug(slug);

  try {
    const trip = await getTripById(tripId ?? slug);
    return mapTripToPopularRoute(trip, fallbackRoute ?? undefined);
  } catch {
    return fallbackRoute ?? null;
  }
}

function applySelectionToRoute(route: PopularRoute, selection: TicketSelection): PopularRoute {
  const tripDate = selection.date ?? route.tripDate;
  const departureTime = selection.departureTime ?? route.departureTime;
  const arrivalTime = selection.arrivalTime ?? route.arrivalTime;

  return {
    ...route,
    title: {
      uk: selection.from && selection.to ? `${selection.from} - ${selection.to}` : route.title.uk,
      en: selection.from && selection.to ? `${selection.from} - ${selection.to}` : route.title.en,
    },
    nearestTripLabel: {
      uk: tripDate || departureTime
        ? `Найближчий рейс: ${tripDate ?? "дату уточнюйте"}${departureTime ? ` о ${departureTime}` : ""}`
        : route.nearestTripLabel.uk,
      en: tripDate || departureTime
        ? `Nearest trip: ${tripDate ?? "date to be confirmed"}${departureTime ? ` at ${departureTime}` : ""}`
        : route.nearestTripLabel.en,
    },
    price: selection.price ?? route.price,
    tripDate,
    departureTime,
    arrivalTime,
    departureCity: selection.from ? { uk: selection.from, en: selection.from } : route.departureCity,
    arrivalCity: selection.to ? { uk: selection.to, en: selection.to } : route.arrivalCity,
  };
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = hasLocale(locale) ? locale : "uk";
  const selection = parseSelection(await searchParams);
  const route = await resolveRoute(slug, selection.tripId);

  if (!route) {
    const seo = getSeoCopy(safeLocale);

    return createPageMetadata({
      locale: safeLocale,
      pathname: `/tickets/${slug}`,
      title: seo.notFound.title,
      description: seo.notFound.description,
      keywords: seo.notFound.keywords,
      noIndex: true,
    });
  }

  const routeTitle = getLocalizedRouteValue(applySelectionToRoute(route, selection).title, safeLocale);
  const routeSeo = getTicketBookingSeo(safeLocale, routeTitle);

  return createPageMetadata({
    locale: safeLocale,
    pathname: `/tickets/${slug}`,
    title: routeSeo.title,
    description: routeSeo.description,
    keywords: routeSeo.keywords,
    imagePath: route.imageSrc,
  });
}

export default async function TicketBookingRoutePage({ params, searchParams }: PageProps) {
  const { locale, slug } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const selection = parseSelection(await searchParams);
  const route = await resolveRoute(slug, selection.tripId);

  if (!route) {
    notFound();
  }

  return (
    <TicketBookingScreen
      route={applySelectionToRoute(route, selection)}
      initialSeats={selection.seats}
    />
  );
}
