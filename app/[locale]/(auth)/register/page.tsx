import type { Metadata } from "next";

import { hasLocale } from "@/src/shared/i18n/config";
import { createPageMetadata, getSeoCopy } from "@/src/shared/seo/metadata";
import RegisterPageContent from "./RegisterPageContent";

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
    pathname: "/register",
    title: seo.register.title,
    description: seo.register.description,
    keywords: seo.register.keywords,
    noIndex: true,
  });
}

export default function RegisterPage() {
  return <RegisterPageContent />;
}
