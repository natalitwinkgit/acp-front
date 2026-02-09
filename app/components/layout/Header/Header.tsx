"use client";

import styles from "./Header.module.css";

const menu = [
  { label: "Головна", href: "/" },
  { label: "Напрямки", href: "/routes" },
  { label: "Розклад", href: "/schedule" },
  { label: "Послуги", href: "/services" },
  { label: "Про компанію", href: "/about" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left: logo */}
        <a className={styles.logoWrap} href="/" aria-label="На головну">
          <img
            className={styles.logo}
            src="/logo-sprinter.svg"
            alt="Автолюкс Черкаси-Плюс"
          />
        </a>

        {/* Center: menu */}
        <nav className={styles.menu} aria-label="Головне меню">
          {menu.map((item) => (
            <a key={item.href} className={styles.menuItem} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: profile + phone + numbers */}
   <div className={styles.right}>
  <button className={styles.avatarBtn} aria-label="Профіль">
    <img className={styles.avatarIcon} src="/icons/avatar.svg" alt="" />
  </button>

  <div className={styles.phoneWrap}>
    <img className={styles.phoneIcon} src="/icons/phone.svg" alt="" />

    <div className={styles.phoneCol}>
      <div className={styles.phoneRow}>
        <a className={styles.phone} href="tel:+380632254518">+38063 225 45 18</a>
      </div>
      <div className={styles.phoneRow}>
        <a className={styles.phone} href="tel:+380632254518">+38063 225 45 18</a>
      </div>
    </div>
  </div>
</div>

      </div>
    </header>
  );
}
