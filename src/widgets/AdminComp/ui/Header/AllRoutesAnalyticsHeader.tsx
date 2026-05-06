"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { DashboardDateText } from "@/src/shared";
import styles from "./admin-routes-page.module.css";
import { useRouter } from "next/navigation";
export default function AllRoutesAnalyticsHeader() {
  const { t } = useI18n();
  const router = useRouter();

  return (
    <div className={styles.headerContainer}>
      <div className={styles.leftCont}>
        <div className={styles.iconContainer} onClick={() => router.back()}>
          <div className={styles.icon} />
        </div>
        <div className={styles.titleContainer}>
          <span className={styles.title}>
            {t("dispatcherArea.sidebar.menu.analytics")}
          </span>
          <span className={styles.subtitle}>
            {t("dispatcherArea.analytics.subtitle")}
          </span>
        </div>
      </div>
      <div className={styles.dateContainer}>
        <DashboardDateText />
      </div>
    </div>
  );
}
