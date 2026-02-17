"use client";

import { useI18n } from "./I18nProvider";

export function useT() {

  const ctx = useI18n() as any;

  const t = ctx.t;
  const raw = ctx.raw ?? ctx.dict ?? ctx.messages ?? null;
  const locale = ctx.locale ?? ctx.lang ?? "UA";

  return { t, raw, locale };
}