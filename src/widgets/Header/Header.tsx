"use client";

import styles from "./Header.module.css";
import LanguageSwitcher from "@/src/widgets/LanguageSwitcher/LanguageSwitcher";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { MouseEvent, useEffect, useState, useSyncExternalStore } from "react";


const menu = [
  { key: "menu.home", href: "#home" },         
  { key: "menu.routes", href: "#routes" },     
  { key: "menu.schedule", href: "#schedule" }, 
  { key: "menu.services", href: "#services" }, 
  { key: "menu.about", href: "#about" },       
];

const phones = [
  { text: "+38097 480 24 28", href: "tel:+380974802428" },
  { text: "+38093 966 09 40", href: "tel:+380939660940" },
  { text: "+38099 078 20 21", href: "tel:+380990782021" },
];

function getAuthStatusSnapshot() {
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem("token") || localStorage.getItem("access_token"));
}

function subscribeToAuthStatus(onChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.key === "token" || event.key === "access_token" || event.key === null) {
      onChange();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener("focus", onChange);
  window.addEventListener("pageshow", onChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("focus", onChange);
    window.removeEventListener("pageshow", onChange);
  };
}

export default function Header() {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAuthorized = useSyncExternalStore(subscribeToAuthStatus, getAuthStatusSnapshot, () => false);
  const isAvatarActive = pathname === "/login";
  const [activeMenuHref, setActiveMenuHref] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const syncActiveFromHash = () => {
      const hash = window.location.hash;
      const knownHash = menu.some((item) => item.href === hash);
      setActiveMenuHref(knownHash ? hash : "#home");
    };

    syncActiveFromHash();
    window.addEventListener("hashchange", syncActiveFromHash);
    return () => window.removeEventListener("hashchange", syncActiveFromHash);
  }, [pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openLoginModal = () => {
    const search = searchParams?.toString();
    const background = search ? `${pathname}?${search}` : pathname;
    sessionStorage.setItem("auth:background", background);
    router.push("/login");
  };

  const handleAvatarClick = () => {
    router.push("/profile");
  };

  
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); 
    setIsMobileMenuOpen(false);

    
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

      if (window.location.hash !== href) {
        window.history.replaceState(null, "", href);
      }
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {}
        <a 
          className={styles.logoWrap} 
          href="#home" 
          onClick={(e) => {
            setActiveMenuHref("#home");
            handleScroll(e, "#home");
          }}
          aria-label={t("aria.home")}
        >
          <img className={styles.logo} src="/logo-sprinter.svg" alt={t("header.logoAlt")} />
        </a>

        <nav className={styles.menu} aria-label={t("header.menuAria")}>
          {menu.map((item) => (
            <a
              key={item.key}
              className={`${styles.menuItem} ${
                activeMenuHref === item.href ? styles.menuItemActive : ""
              }`}
              href={item.href}
              onClick={(e) => {
                setActiveMenuHref(item.href);
                handleScroll(e, item.href);
              }}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className={styles.mobileLang}>
          <LanguageSwitcher />
        </div>

        <div className={`${styles.right} ${isAuthorized ? styles.rightAuthorized : styles.rightUnauthorized}`}>
          {isAuthorized ? (
            <button
              className={`${styles.avatarBtn} ${isAvatarActive ? styles.avatarBtnActive : ""}`}
              aria-label={t("header.profileAria")}
              type="button"
              onClick={handleAvatarClick}
            >
              <img className={styles.avatarIcon} src="/icons/avatar.svg" alt="" />
            </button>
          ) : (
            <button className={styles.loginBtn} type="button" onClick={openLoginModal}>
              {t("header.login")}
            </button>
          )}

          <div className={styles.phoneWrap}>
            <img className={styles.phoneIcon} src="/icons/phone.svg" alt="" />
            <div className={styles.phoneCol}>
              {phones.map((item) => (
                <div className={styles.phoneRow} key={item.href}>
                  <a className={styles.phone} href={item.href}>
                    {item.text}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.mobileMenuBtnOpen : ""}`}
            type="button"
            aria-label={t("header.menuAria")}
            aria-expanded={isMobileMenuOpen}
            aria-controls="header-mobile-menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <span className={styles.mobileCloseIcon} aria-hidden="true" />
            ) : (
              <img
                className={styles.mobileMenuIcon}
                src="/icons/Header/Vector%20(Stroke).png"
                alt=""
              />
            )}
          </button>
        </div>

        <div
          id="header-mobile-menu"
          className={`${styles.mobileMenuPanel} ${isMobileMenuOpen ? styles.mobileMenuPanelOpen : ""}`}
          aria-hidden={!isMobileMenuOpen}
        >
          {menu.map((item) => (
            <a
              key={`mobile-${item.key}`}
              className={`${styles.mobileMenuItem} ${
                activeMenuHref === item.href ? styles.mobileMenuItemActive : ""
              }`}
              href={item.href}
              onClick={(e) => {
                setActiveMenuHref(item.href);
                handleScroll(e, item.href);
              }}
            >
              {t(item.key)}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
