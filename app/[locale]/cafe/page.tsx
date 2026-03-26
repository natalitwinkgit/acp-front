import type { Metadata } from "next";

import { hasLocale } from "@/src/shared/i18n/config";
import { createPageMetadata, getSeoCopy } from "@/src/shared/seo/metadata";
import CafePageContent from "./CafePageContent";

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
    pathname: "/cafe",
    title: seo.cafe.title,
    description: seo.cafe.description,
    keywords: seo.cafe.keywords,
  });
}

export default function CafePage() {
  return <CafePageContent />;
}
