import type { Metadata } from "next";

import { hasLocale } from "@/src/shared/i18n/config";
import { createPageMetadata, getSeoCopy } from "@/src/shared/seo/metadata";
import ForgotPasswordPage from "@/src/pages-layer/auth/forgot-password/ui/ForgotPasswordPage";

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
    pathname: "/forgot-password",
    title: seo.forgotPassword.title,
    description: seo.forgotPassword.description,
    keywords: seo.forgotPassword.keywords,
    noIndex: true,
  });
}

export default function ForgotPasswordRoutePage() {
  return <ForgotPasswordPage />;
}
