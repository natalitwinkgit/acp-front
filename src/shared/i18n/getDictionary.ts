import "server-only";

import { cache } from "react";

import { defaultLocale, type Locale } from "./config";
import type { Messages } from "./types";

const dictionaries: Record<Locale, () => Promise<Messages>> = {
  uk: () => import("@/src/shared/locales/uk.json").then((module) => module.default as Messages),
  en: () => import("@/src/shared/locales/en.json").then((module) => module.default as Messages),
};

export const getDictionary = cache(async (locale: Locale): Promise<Messages> => {
  try {
    return await dictionaries[locale]();
  } catch (error) {
    console.error(`Failed to load dictionary for locale "${locale}"`, error);

    if (locale !== defaultLocale) {
      return dictionaries[defaultLocale]();
    }

    throw new Error(`Unable to load dictionary for locale "${locale}".`);
  }
});
