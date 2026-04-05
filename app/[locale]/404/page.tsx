import type { Metadata } from "next";

import { hasLocale } from "@/src/shared/i18n/config";
import { createPageMetadata, getSeoCopy } from "@/src/shared/seo/metadata";
import NotFoundPage from "@/src/pages-layer/not-found/ui/NotFoundPage";

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
    pathname: "/404",
    title: seo.notFound.title,
    description: seo.notFound.description,
    keywords: seo.notFound.keywords,
    noIndex: true,
  });
}

export default function Custom404Page() {
  return <NotFoundPage />;
}
