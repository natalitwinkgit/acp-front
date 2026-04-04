"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { closeAuthRoute } from "@/src/shared/auth-flow";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import ModalCloseButton from "@/src/shared/ui/ModalCloseButton/ModalCloseButton";
import AuthPromoList from "./AuthPromoList";
import styles from "./forgot-password/forgot-password.module.css";

type PasswordRecoveryShellProps = {
  title: string;
  subtitle: string;
  titleId: string;
  onClose?: () => void;
  shellClassName?: string;
  contentClassName?: string;
  asideClassName?: string;
  cardClassName?: string;
  children: ReactNode;
};

export default function PasswordRecoveryShell({
  title,
  subtitle,
  titleId,
  onClose,
  shellClassName,
  contentClassName,
  asideClassName,
  cardClassName,
  children,
}: PasswordRecoveryShellProps) {
  const router = useRouter();
  const { t } = useI18n();

  const promoItems = [
    t("auth.common.promo.one"),
    t("auth.common.promo.two"),
    t("auth.common.promo.three"),
  ];

  const handleCloseAuthFlow = () => {
    if (onClose) {
      onClose();
      return;
    }

    closeAuthRoute(router);
  };

  return (
    <div
      className={[styles.shell, styles.bannerGlass, shellClassName].filter(Boolean).join(" ")}
      style={{ backgroundImage: "url('/(auth)/forgot-pass/forgot-bus.jpg')" }}
    >
      <ModalCloseButton
        className={styles.close}
        ariaLabel={t("common.close")}
        onClose={handleCloseAuthFlow}
      />

      <div className={[styles.content, contentClassName].filter(Boolean).join(" ")}>
        <aside className={[styles.aside, asideClassName].filter(Boolean).join(" ")}>
          <div className={styles.brand}>
            <Image
              src="/logo-sprinter.svg"
              alt={t("header.logoAlt")}
              className={styles.brandLogo}
              width={213}
              height={50}
            />
            <p className={styles.brandDesc}>{t("auth.common.brandDesc")}</p>
          </div>

          <AuthPromoList
            items={promoItems}
            listClassName={styles.infoBlock}
            itemClassName={styles.infoLine}
          />
        </aside>

        <section
          className={[styles.card, cardClassName].filter(Boolean).join(" ")}
          aria-labelledby={titleId}
        >
          <h1 id={titleId} className={styles.title}>
            {title}
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {children}
        </section>
      </div>
    </div>
  );
}
