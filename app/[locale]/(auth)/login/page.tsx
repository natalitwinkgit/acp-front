import type { Metadata } from "next";

import { hasLocale } from "@/src/shared/i18n/config";
import { createPageMetadata, getSeoCopy } from "@/src/shared/seo/metadata";
import LoginPage from "@/src/pages-layer/auth/login/ui/LoginPage";

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
    pathname: "/login",
    title: seo.login.title,
    description: seo.login.description,
    keywords: seo.login.keywords,
    noIndex: true,
  });
}

export default function LoginRoutePage() {
  return <LoginPage />;
}
