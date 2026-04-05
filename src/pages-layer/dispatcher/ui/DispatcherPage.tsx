"use client";

import { RoleAccessGate } from "@/src/features/access-control";
import { useI18n } from "@/src/shared/i18n/I18nProvider";

import styles from "./dispatcher-page.module.css";

export default function DispatcherPage() {
  const { t } = useI18n();

  return (
    <RoleAccessGate allowedRoles={["DISPETCHER", "ADMIN"]}>
      <main className={styles.page}>
        <p className={styles.placeholder}>{t("dispatcherArea.emptyState")}</p>
      </main>
    </RoleAccessGate>
  );
}
