"use client";

import { usePathname, useRouter } from "next/navigation";

import "./LanguageSwitcher.css";
import { localeCookieName } from "@/src/shared/i18n/config";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { localizeHref, stripLocaleFromPathname } from "@/src/shared/i18n/routing";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, t } = useI18n();
  const isEn = locale === "en";

  const switchTo = (nextLocale: "uk" | "en") => {
    if (nextLocale === locale) {
      return;
    }

    const currentPathname = stripLocaleFromPathname(pathname || "/");
    const search = typeof window === "undefined" ? "" : window.location.search;
    const hash = typeof window === "undefined" ? "" : window.location.hash;
    const nextHref = localizeHref(
      `${currentPathname}${search}${hash}`,
      nextLocale,
    );

    document.cookie = `${localeCookieName}=${encodeURIComponent(nextLocale)}; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.replace(nextHref);
  };

  return (
    <div
      className={`language-switcher ${isEn ? "is-en" : "is-ua"}`}
      role="group"
      aria-label={t("languageSwitcher.ariaLabel")}
    >
      <span className="language-switcher__ring" aria-hidden="true" />

      <button
        type="button"
        className="language-switcher__btn language-switcher__btn--ua"
        onClick={() => switchTo("uk")}
        aria-pressed={!isEn}
        aria-label={t("languageSwitcher.ua")}
      >
        <img className="language-switcher__img" src="/icons/flag-ua.svg" alt="UA" width={24} height={24} />
      </button>

      <button
        type="button"
        className="language-switcher__btn language-switcher__btn--en"
        onClick={() => switchTo("en")}
        aria-pressed={isEn}
        aria-label={t("languageSwitcher.en")}
      >
        <img
          className="language-switcher__img language-switcher__img--en"
          src="/icons/flag-en.svg"
          alt="EN"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
