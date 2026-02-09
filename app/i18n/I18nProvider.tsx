"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import uk from "../../messages/uk.json";
import en from "../../messages/en.json";

export type Lang = "UA" | "EN";
type Dict = Record<string, string>;

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("UA");

  useEffect(() => {
    const saved = (localStorage.getItem("lang") as Lang | null) ?? "UA";
    setLangState(saved === "EN" ? "EN" : "UA");
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const dict: Dict = (lang === "EN" ? (en as Dict) : (uk as Dict));

  const value = useMemo<I18nValue>(() => {
    return {
      lang,
      setLang,
      t: (key: string) => dict[key] ?? key,
    };
  }, [lang, dict]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
