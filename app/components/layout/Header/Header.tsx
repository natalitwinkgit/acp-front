"use client";

import styles from "./Header.module.css";
import { useI18n } from "@/app/i18n/I18nProvider";

const menu = [
  { key: "menu.home", href: "/" },
  { key: "menu.routes", href: "/routes" },
  { key: "menu.schedule", href: "/schedule" },
  { key: "menu.services", href: "/services" },
  { key: "menu.about", href: "/about" },
];

export default function Header() {
  const { t } = useI18n();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left: logo */}
        <a className={styles.logoWrap} href="/" aria-label={t("aria.home")}>
          <img
            className={styles.logo}
            src="/logo-sprinter.svg"
            alt={t("header.logoAlt")}
          />
        </a>

        {/* Center: menu */}
        <nav className={styles.menu} aria-label={t("header.menuAria")}>
          {menu.map((item) => (
            <a key={item.key} className={styles.menuItem} href={item.href}>
              {t(item.key)}
            </a>
          ))}
        </nav>

        {/* Right: profile + phone + numbers */}
        <div className={styles.right}>
          <button className={styles.avatarBtn} aria-label={t("header.profileAria")}>
            <img className={styles.avatarIcon} src="/icons/avatar.svg" alt="" />
          </button>

          <div className={styles.phoneWrap}>
            <img className={styles.phoneIcon} src="/icons/phone.svg" alt="" />

            <div className={styles.phoneCol}>
              <div className={styles.phoneRow}>
                <a className={styles.phone} href="tel:+380632254518">
                  +38063 225 45 18
                </a>
              </div>
              <div className={styles.phoneRow}>
                <a className={styles.phone} href="tel:+380632254518">
                  +38063 225 45 18
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
