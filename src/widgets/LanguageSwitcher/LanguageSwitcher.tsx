"use client";

import { useEffect, useState } from "react";
import "./LanguageSwitcher.css";
import { useI18n, type Lang } from "@/src/shared/i18n/I18nProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  
  const effectiveLang: Lang = hydrated ? lang : "UA";
  const isEn = effectiveLang === "EN";

  const switchTo = (next: Lang) => {
    if (next === lang) return;
    setLang(next);
  };

  return (
    <div
      className={`language-switcher ${isEn ? "is-en" : "is-ua"}`}
      role="group"
      aria-label="Вибір мови"
    >
      <span className="language-switcher__ring" aria-hidden="true" />

      <button
        type="button"
        className="language-switcher__btn language-switcher__btn--ua"
        onClick={() => switchTo("UA")}
        aria-pressed={!isEn}
        aria-label="Українська"
      >
        <img className="language-switcher__img" src="/icons/flag-ua.svg" alt="UA" />
      </button>

      <button
        type="button"
        className="language-switcher__btn language-switcher__btn--en"
        onClick={() => switchTo("EN")}
        aria-pressed={isEn}
        aria-label="English"
      >
        <img
          className="language-switcher__img language-switcher__img--en"
          src="/icons/flag-en.svg"
          alt="EN"
        />
      </button>
    </div>
  );
}
