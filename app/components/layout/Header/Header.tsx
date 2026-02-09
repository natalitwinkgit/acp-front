"use client";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoWrap}>
          <img className={styles.logo} src="/logo-sprinter.svg" alt="Sprinter" />
        </div>

        <nav className={styles.menu} aria-label="Header menu">
          <a className={styles.menuItem} href="/">Головна</a>
          <a className={styles.menuItem} href="/services">Послуги</a>
          <a className={styles.menuItem} href="/about">Про нас</a>
          <a className={styles.menuItem} href="/contacts">Контакти</a>
        </nav>

        <div className={styles.right}>
          <button className={styles.avatar} aria-label="User profile">
            <img src="/icons/avatar.svg" alt="" width={32} height={32} />
          </button>

          <div className={styles.phoneWrap}>
            <img src="/icons/phone.svg" alt="" width={24} height={24} />
            <div className={styles.phoneCol}>
              <a className={styles.phone} href="tel:+380632254518">+38063 225 45 18</a>
              <a className={styles.phone} href="tel:+380632254518">+38063 225 45 18</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
