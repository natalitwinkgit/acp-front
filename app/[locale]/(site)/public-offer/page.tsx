import type { Metadata } from "next";

import PublicOfferPage from "@/src/pages-layer/public-offer/ui/PublicOfferPage";
import { hasLocale } from "@/src/shared/i18n/config";
import { createPageMetadata, getSeoCopy } from "@/src/shared/seo/metadata";

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
    pathname: "/public-offer",
    title: seo.publicOffer.title,
    description: seo.publicOffer.description,
    keywords: seo.publicOffer.keywords,
  });
}

export default function PublicOfferRoutePage() {
  return <PublicOfferPage />;
}
