"use client";

import React, { createContext, useContext, useMemo, useCallback, useState } from "react";
import uk from "@/src/shared/locales/uk.json";
import en from "@/src/shared/locales/en.json";

export type Lang = "UA" | "EN";
type Messages = Record<string, any>;

type I18nCtx = {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: (key: string) => string;
  raw: (key: string) => any;
};

const I18nContext = createContext<I18nCtx | null>(null);

function getNested(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => (acc == null ? undefined : acc[part]), obj);
}

function setCookie(name: string, value: string) {
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax`;
  } catch {}
}

export function I18nProvider({
  children,
  initialLang = "UA",
}: {
  children: React.ReactNode;
  initialLang?: Lang;
}) {
  
  const [lang, setLangState] = useState<Lang>(initialLang);

  const messages: Messages = useMemo(() => (lang === "EN" ? (en as Messages) : (uk as Messages)), [lang]);

  const raw = useCallback(
    (key: string) => {
      
      const direct = (messages as any)[key];
      if (direct !== undefined) return direct;

      
      return getNested(messages, key);
    },
    [messages]
  );

  const t = useCallback(
    (key: string) => {
      const v = raw(key);
      return typeof v === "string" ? v : key;
    },
    [raw]
  );

  const setLang = useCallback((next: Lang) => {
    setLangState(next);

    
    setCookie("lang", next);

    
    try {
      window.localStorage.setItem("lang", next);
    } catch {}

    
    try {
      document.documentElement.lang = next === "EN" ? "en" : "uk";
    } catch {}
  }, []);

  const value = useMemo<I18nCtx>(() => ({ lang, setLang, t, raw }), [lang, setLang, t, raw]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}