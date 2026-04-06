import type { Metadata } from "next";

import ProfileArchivePage from "@/src/pages-layer/profile-archive/ui/ProfileArchivePage";
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
    pathname: "/profile/archive",
    title: locale === "en" ? "Ticket archive" : "Архів квитків",
    description:
      locale === "en"
        ? "View archived tickets and completed trips in your account."
        : "Переглядайте архівні квитки та завершені поїздки в особистому кабінеті.",
    keywords: ["archive", "tickets", "travel history"],
    noIndex: true,
  });
}

export default function ProfileArchiveRoutePage() {
  return <ProfileArchivePage />;
}
