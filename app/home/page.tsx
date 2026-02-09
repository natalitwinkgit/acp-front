"use client";

import styles from "./home.module.css";
import LanguageSwitcher from "../components/LanguageSwitcher/LanguageSwitcher";
import { useI18n } from "../i18n/I18nProvider";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          <LanguageSwitcher />
          <h1 className={styles.title}>{t("home.title")}</h1>
        </div>
      </div>
    </main>
  );
}
