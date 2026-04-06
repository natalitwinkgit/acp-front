import Footer from "@/src/widgets/Footer/Footer";
import Header from "@/src/widgets/Header/Header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pageContainer">
      <Header />
      <main className="pageMain">{children}</main>
      <Footer />
    </div>
  );
}
