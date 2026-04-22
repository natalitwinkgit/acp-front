"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";
import Button from "@/src/shared/ui/Button/Button";
import styles from "./admin-routes-page.module.css";
export default function AllRoutesAnalyticsHeader() {
  const { t } = useI18n();

  return (
    <div className={styles.headerContainer}>
      <div className={styles.iconContainer}>
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

      <div className={styles.buttonWrapper}>
        <Button
          text={t("dispatcherArea.analytics.allRoutes")}
          onClick={() => {}}
          variant="secondary"
          fullWidth={false}
        />
      </div>

      <div className={styles.dateContainer}>
        <span className={styles.dateText}>7 березня 2026</span>
      </div>
    </div>
  );
}
