import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTripById } from "@/src/shared/api";
import { hasLocale, type Locale } from "@/src/shared/i18n/config";
import { getPopularRouteBySlug, mapTripToPopularRoute } from "@/src/shared/data/popularRoutes";
import { createPageMetadata, getSeoCopy, getTicketBookingSeo } from "@/src/shared/seo/metadata";
import TicketBookingPageContent from "./TicketBookingPageContent";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

async function resolveRoute(slug: string) {
  const fallbackRoute = getPopularRouteBySlug(slug);

  if (fallbackRoute) {
    return fallbackRoute;
  }

  try {
    const trip = await getTripById(slug);
    return mapTripToPopularRoute(trip);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const route = await resolveRoute(slug);
  const safeLocale: Locale = hasLocale(locale) ? locale : "uk";

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

  const routeTitle = route.title[safeLocale];
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

export default async function TicketBookingPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const route = await resolveRoute(slug);

  if (!route) {
    notFound();
  }

  return <TicketBookingPageContent route={route} />;
}
