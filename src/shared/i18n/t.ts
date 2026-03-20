"use client";

import { useI18n } from "./I18nProvider";

export function useT() {
  const { t, raw, lang } = useI18n();
  return { t, raw, locale: lang };
}
