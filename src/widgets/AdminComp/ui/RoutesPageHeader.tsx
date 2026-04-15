"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";
import Button from "@/src/shared/ui/Button/Button";
import styles from "./admin-routes-page.module.css";

export default function RoutesPageHeader() {
  const { t } = useI18n();

  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>
          {t("dispatcherArea.sidebar.menu.routes")}
        </span>
        <span className={styles.subtitle}>
          {t("dispatcherArea.routes.subtitle")}
        </span>
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          text={t("dispatcherArea.routes.addRoute")}
          onClick={() => {}}
          variant="secondary"
          fullWidth={false}
        />
      </div>

      <div className={styles.dateContainer}>
        <span className={styles.dateText}>7 березня 2026</span>
        <button
          className={styles.calendarButton}
          type="button"
          aria-label={t("dispatcherArea.routes.calendarAria")}
        >
          <span className={styles.calendarIcon} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
