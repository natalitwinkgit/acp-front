// app/i18n/t.ts
import uk from "../../messages/uk.json";
import en from "../../messages/en.json";
import type { Lang } from "./I18nProvider";

type Dict = Record<string, string>;

export function getDict(lang: Lang): Dict {
  return lang === "EN" ? (en as Dict) : (uk as Dict);
}

export function t(lang: Lang, key: string): string {
  const dict = getDict(lang);
  return dict[key] ?? key;
}
