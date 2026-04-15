"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";
import type { RoutesStatBadgeProps, RoutesStatsProps } from "../../model/types";
import styles from "./admin-routes-page.module.css";

function RoutesStatBadge({
  icon,
  label,
  count,
  variant,
}: RoutesStatBadgeProps) {
  return (
    <div className={`${styles.badge} ${styles[variant]}`}>
      <span
        className={styles.badgeIcon}
        aria-hidden="true"
        style={{ WebkitMaskImage: `url(${icon})`, maskImage: `url(${icon})` }}
      />
      <span className={styles.badgeText}>
        {label} {count}
      </span>
    </div>
  );
}

export default function RoutesStats({
  total,
  boarding,
  departed,
  cancelled,
}: RoutesStatsProps) {
  const { t } = useI18n();

  return (
    <div className={styles.statsRow}>
      <RoutesStatBadge
        icon="/icons/workspace/sidebar/routes.svg"
        label={t("dispatcherArea.routes.stats.total")}
        count={total}
        variant="dark"
      />
      <RoutesStatBadge
        icon="/icons/Services/clock-loading.svg"
        label={t("dispatcherArea.routes.stats.boarding")}
        count={boarding}
        variant="yellow"
      />
      <RoutesStatBadge
        icon="/icons/shield-check-broken.svg"
        label={t("dispatcherArea.routes.stats.departed")}
        count={departed}
        variant="green"
      />
      <RoutesStatBadge
        icon="/icons/close-circle-broken.svg"
        label={t("dispatcherArea.routes.stats.cancelled")}
        count={cancelled}
        variant="red"
      />
    </div>
  );
}
