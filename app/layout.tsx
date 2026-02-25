import "./globals.css";
import Header from "@/src/widgets/Header/Header";
import { I18nProvider, type Lang } from "@/src/shared/i18n/I18nProvider";
import { Roboto } from "next/font/google";
import { cookies } from "next/headers";
import Footer from "@/src/widgets/Footer/Footer";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata = {
  title: "Автолюкс Черкаси-ПЛЮС",
  description: "Professional passenger transportation services",
  icons: { icon: "/favicon-light.svg" },
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value;

  const initialLang: Lang =
    cookieLang === "EN" || cookieLang === "UA" ? (cookieLang as Lang) : "UA";

  return (
    <html lang={initialLang === "EN" ? "en" : "uk"} className={roboto.variable}>
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
      </head>

      <body suppressHydrationWarning>
        <I18nProvider initialLang={initialLang}>
          <div className="pageContainer">
            <Header />

            {/* Ось тут системні відступи між секціями */}
            <main className="pageMain">
              {children}
              {modal}
            </main>

            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}