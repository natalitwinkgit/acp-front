"use client";

import { RoleAccessGate } from "@/src/features/access-control";
import LocaleLink from "@/src/shared/i18n/Link";
import { useI18n } from "@/src/shared/i18n/I18nProvider";

import styles from "@/src/pages-layer/role-workspace/ui/role-workspace-page.module.css";

const DISPATCHER_CARD_KEYS = ["board", "reservations", "support"] as const;

export default function DispatcherPage() {
  const { t } = useI18n();

  return (
    <RoleAccessGate allowedRoles={["DISPETCHER", "ADMIN"]}>
      <main className={styles.page}>
        <div className={styles.container}>
          <section className={styles.hero}>
            <p className={styles.eyebrow}>{t("dispatcherArea.eyebrow")}</p>
            <h1 className={styles.title}>{t("dispatcherArea.title")}</h1>
            <p className={styles.description}>{t("dispatcherArea.description")}</p>

            <div className={styles.actions}>
              <LocaleLink href="/profile" className={`${styles.action} ${styles.actionPrimary}`}>
                {t("dispatcherArea.actions.profile")}
              </LocaleLink>
              <LocaleLink href="/" className={`${styles.action} ${styles.actionSecondary}`}>
                {t("dispatcherArea.actions.home")}
              </LocaleLink>
            </div>
          </section>

          <section className={styles.grid} aria-label={t("dispatcherArea.cardsAria")}>
            {DISPATCHER_CARD_KEYS.map((key, index) => (
              <article key={key} className={styles.card}>
                <span className={styles.cardNumber}>{index + 1}</span>
                <h2 className={styles.cardTitle}>{t(`dispatcherArea.cards.${key}.title`)}</h2>
                <p className={styles.cardDescription}>{t(`dispatcherArea.cards.${key}.description`)}</p>
              </article>
            ))}
          </section>
        </div>
      </main>
    </RoleAccessGate>
  );
}
