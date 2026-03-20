"use client";

import BreadcrumbChips from "@/src/shared/ui/BreadcrumbChips/BreadcrumbChips";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import ProfileTabsBar from "@/src/shared/ui/ProfileTabsBar/ProfileTabsBar";
import styles from "./profile.module.css";

export default function ProfilePageContent() {
  const { t } = useI18n();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <BreadcrumbChips
          ariaLabel={t("profile.breadcrumbsAria")}
          items={[
            { label: t("menu.home"), href: "/#home" },
            { label: t("profile.cabinet"), current: true },
            { label: t("profile.title"), current: true },
          ]}
        />

        <ProfileTabsBar
          ariaLabel={t("profile.tabsAria")}
          showExitButton
          items={[
            { label: t("profile.tabs.tickets"), href: "/profile/tickets" },
            { label: t("profile.tabs.archive"), href: "/profile" },
            { label: t("profile.tabs.profile"), active: true },
          ]}
        />

        <section className={styles.card} aria-labelledby="profile-title">
          <h1 id="profile-title" className={styles.title}>
            {t("profile.title")}
          </h1>

          <p className={styles.description}>{t("profile.description")}</p>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>{t("profile.fields.name")}</span>
              <span className={styles.infoValue}>{t("profile.placeholders.name")}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>{t("profile.fields.phone")}</span>
              <span className={styles.infoValue}>{t("profile.placeholders.phone")}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>{t("profile.fields.email")}</span>
              <span className={styles.infoValue}>{t("profile.placeholders.email")}</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
