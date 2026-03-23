import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPopularRouteBySlug } from "@/src/shared/data/popularRoutes";
import TicketBookingPageContent from "./TicketBookingPageContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getPopularRouteBySlug(slug);

  if (!route) {
    return {
      title: "Рейс не знайдено | Автолюкс Черкаси-Плюс",
    };
  }

  return {
    title: `${route.title.UA} | Бронювання`,
    description: `Сторінка бронювання для рейсу ${route.title.UA}.`,
  };
}

export default async function TicketBookingPage({ params }: PageProps) {
  const { slug } = await params;
  const route = getPopularRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  return <TicketBookingPageContent route={route} />;
}
