"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react";

import type { Locale } from "./config";
import { localizeHref } from "./routing";
import type { MessageValue, Messages } from "./types";

type I18nCtx = {
  locale: Locale;
  lang: Locale;
  messages: Messages;
  t: (key: string) => string;
  raw: (key: string) => MessageValue | undefined;
};

const I18nContext = createContext<I18nCtx | null>(null);

function isMessageRecord(value: MessageValue | undefined): value is Record<string, MessageValue> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getNested(obj: MessageValue | undefined, path: string): MessageValue | undefined {
  return path.split(".").reduce<MessageValue | undefined>((acc, part) => {
    if (!isMessageRecord(acc)) {
      return undefined;
    }

    return acc[part];
  }, obj);
}

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: Locale;
  messages: Messages;
}) {
  const raw = useCallback(
    (key: string) => {
      const direct = messages[key];

      if (direct !== undefined) {
        return direct;
      }

      return getNested(messages, key);
    },
    [messages],
  );

  const t = useCallback(
    (key: string) => {
      const value = raw(key);
      return typeof value === "string" ? value : key;
    },
    [raw],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nCtx>(
    () => ({
      locale,
      lang: locale,
      messages,
      t,
      raw,
    }),
    [locale, messages, raw, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}

export function useLocalizedHref() {
  const { locale } = useI18n();

  return useCallback(
    (href: string, targetLocale: Locale = locale) => localizeHref(href, targetLocale),
    [locale],
  );
}
