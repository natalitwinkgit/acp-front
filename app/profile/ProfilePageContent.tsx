"use client";

import Link from "next/link";
import BreadcrumbChips from "@/src/shared/ui/BreadcrumbChips/BreadcrumbChips";
import Chip from "@/src/shared/ui/Chip/Chip";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
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

        <section className={styles.tabsBar} aria-label={t("profile.tabsAria")}>
          <div className={styles.tabsRow}>
            <Link href="/profile" className={styles.tabLink}>
              <Chip className={`${styles.tabChip} ${styles.tabChipMuted}`}>
                {t("profile.tabs.tickets")}
              </Chip>
            </Link>

            <Link href="/profile" className={styles.tabLink}>
              <Chip className={`${styles.tabChip} ${styles.tabChipMuted}`}>
                {t("profile.tabs.archive")}
              </Chip>
            </Link>

            <Chip className={`${styles.tabChip} ${styles.tabChipActive}`}>
              {t("profile.tabs.profile")}
            </Chip>
          </div>
        </section>

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
