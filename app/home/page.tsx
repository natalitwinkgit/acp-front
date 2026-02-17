"use client";

import styles from "./home.module.css";
import LanguageSwitcher from "@/src/widgets/LanguageSwitcher/LanguageSwitcher";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import BookingHero from "@/src/widgets/BookingHero/BookingHero";
import BenefitsWidget from "@/src/widgets/BenefitsWidget/BenefitsWidget";
import PopularRoutes from "@/src/widgets/PopularRoutes/PopularRoutes";
import ScheduleTable from "@/src/widgets/ScheduleTable/ScheduleTable";
import Services from "@/src/widgets/Services/Services";
import AboutCompany from "@/src/widgets/AboutCompany/AboutCompany";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          
          {}
          <LanguageSwitcher />

          {}
          <section id="home">
            <h1 className={styles.title}>{t("home.title")}</h1>
            <BookingHero />
          </section>

          <BenefitsWidget />

          <section id="routes">
            <PopularRoutes />
          </section>

          <section id="schedule">
            <ScheduleTable />
          </section>

          <section id="services">
            <Services />
          </section>

          <section id="about">
            <AboutCompany />
          </section>
        </div>
      </div>
    </main>
  );
}