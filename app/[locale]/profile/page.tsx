import type { Metadata } from "next";

import { hasLocale } from "@/src/shared/i18n/config";
import { createPageMetadata, getSeoCopy } from "@/src/shared/seo/metadata";
import ProfilePageContent from "./ProfilePageContent";

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
    pathname: "/profile",
    title: seo.profile.title,
    description: seo.profile.description,
    keywords: seo.profile.keywords,
    noIndex: true,
  });
}

export default function ProfilePage() {
  return <ProfilePageContent />;
}
