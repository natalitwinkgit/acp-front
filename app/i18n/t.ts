import uk from "../../messages/uk.json";
import en from "../../messages/en.json";
import type { Lang } from "../components/LanguageSwitcher/LanguageSwitcher";

type Dict = Record<string, string>;

export function getDict(lang: Lang): Dict {
  return (lang === "EN" ? (en as Dict) : (uk as Dict));
}
