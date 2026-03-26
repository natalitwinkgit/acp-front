import type { Metadata } from "next";

import { hasLocale } from "@/src/shared/i18n/config";
import { createPageMetadata, getSeoCopy } from "@/src/shared/seo/metadata";
import HomePageContent from "./HomePageContent";

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
    pathname: "/",
    title: seo.home.title,
    description: seo.home.description,
    keywords: seo.home.keywords,
    noIndex: true,
  });
}

export default function HomePage() {
  return <HomePageContent />;
}
