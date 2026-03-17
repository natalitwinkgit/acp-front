"use client";

import BreadcrumbChips from "@/src/shared/ui/BreadcrumbChips/BreadcrumbChips";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import styles from "./cafe.module.css";

export default function CafePageContent() {
  const { t } = useI18n();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <BreadcrumbChips
          ariaLabel={t("menu.cafe")}
          items={[
            { label: t("menu.home"), href: "/#home" },
            { label: t("menu.cafe"), current: true },
          ]}
        />
      </div>
    </main>
  );
}
