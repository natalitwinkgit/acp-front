"use client";

import Image from "next/image";
import Link from "next/link";
import BreadcrumbChips from "@/src/shared/ui/BreadcrumbChips/BreadcrumbChips";
import SurfacePanel from "@/src/shared/ui/SurfacePanel/SurfacePanel";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import ProfileTabsBar from "@/src/shared/ui/ProfileTabsBar/ProfileTabsBar";
import styles from "./tickets.module.css";

export default function TicketsPageContent() {
  const { t } = useI18n();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <BreadcrumbChips
          ariaLabel={t("profile.breadcrumbsAria")}
          items={[
            { label: t("menu.home"), href: "/#home" },
            { label: t("profile.title"), href: "/profile" },
            { label: t("profile.tickets.title"), current: true },
          ]}
        />

        <ProfileTabsBar
          ariaLabel={t("profile.tabsAria")}
          showExitButton
          items={[
            { label: t("profile.tabs.tickets"), active: true },
            { label: t("profile.tabs.archive") },
            { label: t("profile.tabs.profile"), href: "/profile" },
          ]}
        />

        <section className={styles.emptyState} aria-labelledby="tickets-title">
          <h1 id="tickets-title" className={styles.srOnly}>
            {t("profile.tickets.title")}
          </h1>

          <SurfacePanel className={styles.emptyCard}>
            <div className={styles.emptyContentWrapper}>
              
              {/* Блок з ілюстрацією */}
              <div className={styles.illustrationBox}>
                <Image
                  src="/icons/account/tickets/fontisto_bus-ticket.svg"
                  alt=""
                  width={301}
                  height={301}
                  className={styles.ticketBack}
                />
                <Image
                  src="/icons/account/tickets/fontisto_bus-ticket.svg"
                  alt=""
                  width={301}
                  height={301}
                  className={styles.ticketFront}
                />
              </div>

              {/* Блок з текстом та кнопкою */}
              <div className={styles.textAndActionBlock}>
                <h2 className={styles.emptyStateText}>
                  У вас ще немає квитків. Бажаєте знайти рейс?
                </h2>
                <Link href="/#routes" className={styles.searchButton}>
                  Вибрати рейс
                </Link>
              </div>

            </div>
          </SurfacePanel>
        </section>
      </div>
    </main>
  );
}
