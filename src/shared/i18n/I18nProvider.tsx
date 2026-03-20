"use client";

import React, { createContext, useContext, useMemo, useCallback, useState } from "react";
import uk from "@/src/shared/locales/uk.json";
import en from "@/src/shared/locales/en.json";

export type Lang = "UA" | "EN";
export type MessageValue =
  | string
  | number
  | boolean
  | null
  | MessageValue[]
  | { [key: string]: MessageValue };

type Messages = Record<string, MessageValue>;

type I18nCtx = {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: (key: string) => string;
  raw: (key: string) => MessageValue | undefined;
};

const I18nContext = createContext<I18nCtx | null>(null);

function isMessageRecord(value: MessageValue | undefined): value is Record<string, MessageValue> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getNested(obj: MessageValue | undefined, path: string): MessageValue | undefined {
  return path.split(".").reduce<MessageValue | undefined>((acc, part) => {
    if (!isMessageRecord(acc)) return undefined;
    return acc[part];
  }, obj);
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
      const direct = messages[key];
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
