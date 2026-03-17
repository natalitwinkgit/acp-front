"use client";

import BreadcrumbChips from "@/src/shared/ui/BreadcrumbChips/BreadcrumbChips";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import styles from "./ticket-booking.module.css";

export default function TicketBookingPageContent() {
  const { t } = useI18n();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <BreadcrumbChips
          ariaLabel={t("ticketBooking.breadcrumbsAria")}
          items={[
            { label: t("ticketBooking.breadcrumbs.home"), href: "/#home" },
            { label: t("ticketBooking.breadcrumbs.routes"), href: "/#routes" },
            { label: t("ticketBooking.breadcrumbs.current"), current: true },
          ]}
        />
      </div>
    </main>
  );
}
