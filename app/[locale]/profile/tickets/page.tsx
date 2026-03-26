import type { Metadata } from "next";

import { hasLocale } from "@/src/shared/i18n/config";
import { createPageMetadata, getSeoCopy } from "@/src/shared/seo/metadata";
import TicketsPageContent from "./TicketsPageContent";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    return {};
  }

  const seo = getSeoCopy(locale);

  return createPageMetadata({
    locale,
    pathname: "/profile/tickets",
    title: seo.profileTickets.title,
    description: seo.profileTickets.description,
    keywords: seo.profileTickets.keywords,
    noIndex: true,
  });
}

export default function ProfileTicketsPage() {
  return <TicketsPageContent />;
}
