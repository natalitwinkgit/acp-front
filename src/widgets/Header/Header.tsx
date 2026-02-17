"use client";

import styles from "./Header.module.css";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { MouseEvent } from "react";


const menu = [
  { key: "menu.home", href: "#home" },         
  { key: "menu.routes", href: "#routes" },     
  { key: "menu.schedule", href: "#schedule" }, 
  { key: "menu.services", href: "#services" }, 
  { key: "menu.about", href: "#about" },       
];

export default function Header() {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openLoginModal = () => {
    const search = searchParams?.toString();
    const background = search ? `${pathname}?${search}` : pathname;
    sessionStorage.setItem("auth:background", background);
    router.push("/login");
  };

  
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); 

    
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem) {
      elem.scrollIntoView({
        behavior: "smooth",
        block: "start", 
      });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {}
        <a 
          className={styles.logoWrap} 
          href="#home" 
          onClick={(e) => handleScroll(e, "#home")}
          aria-label={t("aria.home")}
        >
          <img className={styles.logo} src="/logo-sprinter.svg" alt={t("header.logoAlt")} />
        </a>

        <nav className={styles.menu} aria-label={t("header.menuAria")}>
          {menu.map((item) => (
            <a
              key={item.key}
              className={styles.menuItem}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
          <button
            className={styles.avatarBtn}
            aria-label={t("header.profileAria")}
            type="button"
            onClick={openLoginModal}
          >
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
