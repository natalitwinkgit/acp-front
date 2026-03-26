export const locales = ["uk", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uk";

export const localeCookieName = "locale";
export const legacyLocaleCookieName = "lang";

export function hasLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizeLocale(value?: string | null): Locale | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "ua" || normalized.startsWith("uk")) {
    return "uk";
  }

  if (normalized.startsWith("en")) {
    return "en";
  }

  return null;
}
