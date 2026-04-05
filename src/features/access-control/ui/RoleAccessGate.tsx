"use client";

import type { UserRole } from "@/src/entities/user";
import { useAuthSession } from "@/src/features/auth/model/session";
import LocaleLink from "@/src/shared/i18n/Link";
import { useI18n, useLocalizedHref } from "@/src/shared/i18n/I18nProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { getRoleLandingPath, hasRequiredRole } from "../model/roles";
import styles from "./RoleAccessGate.module.css";

type RoleAccessGateProps = {
  allowedRoles: readonly UserRole[];
  children: React.ReactNode;
};

export default function RoleAccessGate({
  allowedRoles,
  children,
}: RoleAccessGateProps) {
  const router = useRouter();
  const resolveHref = useLocalizedHref();
  const { t } = useI18n();
  const { isAuthenticated, isLoading, role } = useAuthSession();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace(resolveHref("/login"));
      return;
    }

    if (!hasRequiredRole(role, allowedRoles)) {
      router.replace(resolveHref(getRoleLandingPath(role)));
    }
  }, [allowedRoles, isAuthenticated, isLoading, resolveHref, role, router]);

  if (isLoading) {
    return (
      <section className={styles.state}>
        <div className={styles.card}>
          <h1 className={styles.title}>{t("accessControl.loadingTitle")}</h1>
          <p className={styles.description}>{t("accessControl.loadingDescription")}</p>
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className={styles.state}>
        <div className={styles.card}>
          <h1 className={styles.title}>{t("accessControl.loginRequiredTitle")}</h1>
          <p className={styles.description}>{t("accessControl.loginRequiredDescription")}</p>
          <div className={styles.actions}>
            <LocaleLink href="/login" className={`${styles.action} ${styles.actionPrimary}`}>
              {t("accessControl.actions.login")}
            </LocaleLink>
          </div>
        </div>
      </section>
    );
  }

  if (!hasRequiredRole(role, allowedRoles)) {
    return (
      <section className={styles.state}>
        <div className={styles.card}>
          <h1 className={styles.title}>{t("accessControl.forbiddenTitle")}</h1>
          <p className={styles.description}>{t("accessControl.forbiddenDescription")}</p>
          <div className={styles.actions}>
            <LocaleLink href={getRoleLandingPath(role)} className={`${styles.action} ${styles.actionPrimary}`}>
              {t("accessControl.actions.workspace")}
            </LocaleLink>
            <LocaleLink href="/" className={`${styles.action} ${styles.actionSecondary}`}>
              {t("accessControl.actions.home")}
            </LocaleLink>
          </div>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
