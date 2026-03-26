import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { hasLocale, type Locale } from "@/src/shared/i18n/config";
import { getPopularRouteBySlug } from "@/src/shared/data/popularRoutes";
import TicketBookingPageContent from "./TicketBookingPageContent";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const route = getPopularRouteBySlug(slug);

  if (!route) {
    return {
      title: locale === "en" ? "Route not found | Autolux Cherkasy-Plus" : "Рейс не знайдено | Автолюкс Черкаси-Плюс",
    };
  }

  const safeLocale: Locale = hasLocale(locale) ? locale : "uk";
  const routeTitle = route.title[safeLocale];

  return {
    title: `${routeTitle} | ${safeLocale === "en" ? "Booking" : "Бронювання"}`,
    description:
      safeLocale === "en"
        ? `Booking page for the ${routeTitle} route.`
        : `Сторінка бронювання для рейсу ${routeTitle}.`,
  };
}

export default async function TicketBookingPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const route = getPopularRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  return <TicketBookingPageContent route={route} />;
}
