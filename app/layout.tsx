// app/layout.tsx
import "./globals.css";
import Header from "./components/layout/Header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body suppressHydrationWarning>
        <Header />
        {children}
      </body>
    </html>
  );
}
