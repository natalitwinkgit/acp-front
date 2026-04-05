import type { Metadata } from "next";

import { hasLocale } from "@/src/shared/i18n/config";
import { createPageMetadata, getSeoCopy } from "@/src/shared/seo/metadata";
import ResetPasswordPage from "@/src/pages-layer/auth/reset-password/ui/ResetPasswordPage";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string | string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    return {};
  }

  const seo = getSeoCopy(locale);

  return createPageMetadata({
    locale,
    pathname: "/reset-password",
    title: seo.resetPassword.title,
    description: seo.resetPassword.description,
    keywords: seo.resetPassword.keywords,
    noIndex: true,
  });
}

export default async function ResetPasswordRoutePage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const rawToken = resolvedSearchParams.token;
  const token = Array.isArray(rawToken) ? rawToken[0] ?? "" : rawToken ?? "";

  return <ResetPasswordPage token={token} />;
}
