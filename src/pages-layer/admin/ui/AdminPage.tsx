"use client";

import { RoleAccessGate } from "@/src/features/access-control";
import LocaleLink from "@/src/shared/i18n/Link";
import { useI18n } from "@/src/shared/i18n/I18nProvider";

import styles from "@/src/pages-layer/role-workspace/ui/role-workspace-page.module.css";

const ADMIN_CARD_KEYS = ["routes", "team", "operations"] as const;

export default function AdminPage() {
  const { t } = useI18n();

  return (
    <RoleAccessGate allowedRoles={["ADMIN"]}>
      <main className={styles.page}>
        <div className={styles.container}>
          <section className={styles.hero}>
            <p className={styles.eyebrow}>{t("adminArea.eyebrow")}</p>
            <h1 className={styles.title}>{t("adminArea.title")}</h1>
            <p className={styles.description}>{t("adminArea.description")}</p>

            <div className={styles.actions}>
              <LocaleLink href="/profile" className={`${styles.action} ${styles.actionPrimary}`}>
                {t("adminArea.actions.profile")}
              </LocaleLink>
              <LocaleLink href="/" className={`${styles.action} ${styles.actionSecondary}`}>
                {t("adminArea.actions.home")}
              </LocaleLink>
            </div>
          </section>

          <section className={styles.grid} aria-label={t("adminArea.cardsAria")}>
            {ADMIN_CARD_KEYS.map((key, index) => (
              <article key={key} className={styles.card}>
                <span className={styles.cardNumber}>{index + 1}</span>
                <h2 className={styles.cardTitle}>{t(`adminArea.cards.${key}.title`)}</h2>
                <p className={styles.cardDescription}>{t(`adminArea.cards.${key}.description`)}</p>
              </article>
            ))}
          </section>
        </div>
      </main>
    </RoleAccessGate>
  );
}
