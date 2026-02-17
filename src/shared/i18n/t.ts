"use client";

import { useI18n } from "./I18nProvider";

export function useT() {
  const { t, raw, locale } = useI18n();
  return { t, raw, locale };
}

export function T({
  k,
  params,
}: {
  k: string;
  params?: Record<string, string | number>;
}) {
  const { t } = useI18n();
  return <>{t(k, params)}</>;
}