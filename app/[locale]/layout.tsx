import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { hasLocale, locales } from "@/src/shared/i18n/config";
import { getDictionary } from "@/src/shared/i18n/getDictionary";
import { createSiteMetadata, getOrganizationStructuredData } from "@/src/shared/seo/metadata";
import { AuthSessionProvider } from "@/src/features/auth";
import Footer from "@/src/widgets/Footer/Footer";
import Header from "@/src/widgets/Header/Header";
import { I18nProvider } from "@/src/shared/i18n/I18nProvider";

type LayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(locale) ? locale : "uk";

  return createSiteMetadata(safeLocale);
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  modal,
  params,
}: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const organizationStructuredData = getOrganizationStructuredData(locale);

  return (
    <html lang={locale}>
      <head>
        <link
          rel="icon"
          href="/favicon-light.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/favicon-dark.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>

      <body suppressHydrationWarning>
        <I18nProvider locale={locale} messages={dictionary}>
          <AuthSessionProvider>
            <div className="pageContainer">
              <Header />

              <main className="pageMain">
                {children}
                {modal}
              </main>

              <Footer />
            </div>
          </AuthSessionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
