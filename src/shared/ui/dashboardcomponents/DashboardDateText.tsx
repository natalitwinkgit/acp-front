"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";
import styles from "./DashboardDateText.module.css";

export function DashboardDateText() {
  const { locale } = useI18n();

  const formatted = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return <span className={styles.text}>{formatted}</span>;
}
