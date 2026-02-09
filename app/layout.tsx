// app/layout.tsx
import "./globals.css";
import Header from "./components/layout/Header/Header";
import { I18nProvider } from "./i18n/I18nProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body suppressHydrationWarning>
        <I18nProvider>
          <Header />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
