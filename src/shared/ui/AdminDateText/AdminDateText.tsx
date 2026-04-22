"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";
import styles from "./adminDateText.module.css";

export function AdminDateText() {
  const { locale } = useI18n();

  const formatted = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return <span className={styles.text}>{formatted}</span>;
}
