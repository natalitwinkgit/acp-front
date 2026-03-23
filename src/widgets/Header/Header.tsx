"use client";

import styles from "./Header.module.css";
import { storeAuthBackground } from "@/src/shared/auth-flow";
import { hasAccessToken } from "@/src/shared/api";
import LanguageSwitcher from "@/src/widgets/LanguageSwitcher/LanguageSwitcher";
import HeaderAuthControl from "./HeaderAuthControl";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { MouseEvent, useEffect, useEffectEvent, useRef, useState, useSyncExternalStore } from "react";

const menu = [
  { key: "menu.home", href: "#home" },
  { key: "menu.routes", href: "#routes" },
  { key: "menu.about", href: "#about" },
  { key: "menu.cafe", href: "/cafe" },
  { key: "menu.contacts", href: "#contacts" },
];

const phones = [
  { text: "+38097 480 24 28", href: "tel:+380974802428" },
  { text: "+38093 966 09 40", href: "tel:+380939660940" },
  { text: "+38099 078 20 21", href: "tel:+380990782021" },
];

function getAuthStatusSnapshot() {
  if (typeof window === "undefined") return false;
  return hasAccessToken();
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
  const isAvatarActive = pathname === "/profile" || pathname.startsWith("/profile/");

  const [activeMenuHref, setActiveMenuHref] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPhoneMenuOpen, setIsPhoneMenuOpen] = useState(false);
  const currentMenuHref = pathname === "/cafe" ? "/cafe" : activeMenuHref;
  const phoneMenuRef = useRef<HTMLDivElement | null>(null);

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
    const onResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        setIsPhoneMenuOpen(false);
      }
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    router.prefetch("/login");
  }, [router]);

  const closePhoneMenu = useEffectEvent(() => {
    setIsPhoneMenuOpen(false);
  });

  useEffect(() => {
    if (!isPhoneMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!phoneMenuRef.current?.contains(event.target as Node)) {
        closePhoneMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePhoneMenu();
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPhoneMenuOpen]);

  const openLoginModal = () => {
    setIsPhoneMenuOpen(false);
    const search = searchParams?.toString();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const background = search ? `${pathname}?${search}` : pathname;
    storeAuthBackground(`${background}${hash}`);
    router.push("/login", { scroll: false });
  };

  const handleAvatarClick = () => {
    setIsPhoneMenuOpen(false);
    router.push("/profile");
  };

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsPhoneMenuOpen(false);

    if (!href.startsWith("#")) {
      router.push(href);
      return;
    }

    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });

      if (window.location.hash !== href) {
        window.history.replaceState(null, "", href);
      }
    }
  };

  return (
    <header className={`${styles.header} ${isMobileMenuOpen ? styles.headerNoShadow : ""}`}>
      <div className={styles.container}>
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
          <img className={styles.logoText} src="/Text.svg" alt="" aria-hidden="true" />
        </a>

        <nav className={styles.menu} aria-label={t("header.menuAria")}>
          {menu.map((item) => (
            <a
              key={item.key}
              aria-current={currentMenuHref === item.href ? "page" : undefined}
              className={`${styles.menuItem} ${currentMenuHref === item.href ? styles.menuItemActive : ""}`}
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
          <HeaderAuthControl
            className={styles.authControl}
            isAuthorized={isAuthorized}
            isAvatarActive={isAvatarActive}
            loginLabel={t("header.login")}
            profileAriaLabel={t("header.profileAria")}
            onLoginClick={openLoginModal}
            onAvatarClick={handleAvatarClick}
          />

          <div className={styles.phoneWrap} ref={phoneMenuRef}>
            <img className={styles.phoneIconDesktop} src="/icons/phone.svg" alt="" aria-hidden="true" />
            <button
              className={styles.phoneToggle}
              type="button"
              aria-label={t("profile.fields.phone")}
              aria-expanded={isPhoneMenuOpen}
              aria-controls="header-phone-menu"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsPhoneMenuOpen((prev) => !prev);
              }}
            >
              <img className={styles.phoneIcon} src="/icons/phone.svg" alt="" aria-hidden="true" />
            </button>

            <div className={styles.phoneCol}>
              {phones.map((item) => (
                <div className={styles.phoneRow} key={item.href}>
                  <a className={styles.phone} href={item.href}>
                    {item.text}
                  </a>
                </div>
              ))}
            </div>

            <div
              id="header-phone-menu"
              className={`${styles.phoneMenuPanel} ${isPhoneMenuOpen ? styles.phoneMenuPanelOpen : ""}`}
              aria-hidden={!isPhoneMenuOpen}
              aria-label={t("menu.contacts")}
            >
              {phones.map((item) => (
                <a
                  key={`popup-${item.href}`}
                  className={styles.phoneMenuItem}
                  href={item.href}
                  onClick={() => setIsPhoneMenuOpen(false)}
                >
                  {item.text}
                </a>
              ))}
            </div>
          </div>

          <button
            className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.mobileMenuBtnOpen : ""}`}
            type="button"
            aria-label={t("header.menuAria")}
            aria-expanded={isMobileMenuOpen}
            aria-controls="header-mobile-menu"
            onClick={() => {
              setIsPhoneMenuOpen(false);
              setIsMobileMenuOpen((prev) => !prev);
            }}
          >
            {isMobileMenuOpen ? (
              <span key="icon-close" className={styles.mobileCloseIcon} aria-hidden="true" />
            ) : (
              <img
                key="icon-menu"
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
              aria-current={currentMenuHref === item.href ? "page" : undefined}
              className={`${styles.mobileMenuItem} ${currentMenuHref === item.href ? styles.mobileMenuItemActive : ""}`}
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
