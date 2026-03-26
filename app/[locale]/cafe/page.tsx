import type { Metadata } from "next";

import { hasLocale } from "@/src/shared/i18n/config";
import { getDictionary } from "@/src/shared/i18n/getDictionary";
import CafePageContent from "./CafePageContent";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale);
  const cafeTitle = typeof dictionary["menu.cafe"] === "string" ? dictionary["menu.cafe"] : "Cafe";

  return {
    title: `${cafeTitle} | Автолюкс Черкаси-Плюс`,
    description:
      locale === "en"
        ? "Cafe page for Autolux Cherkasy-Plus."
        : "Сторінка кафе Автолюкс Черкаси-Плюс.",
  };
}

export default function CafePage() {
  return <CafePageContent />;
}
