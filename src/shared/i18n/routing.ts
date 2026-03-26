import { defaultLocale, hasLocale, normalizeLocale, type Locale } from "./config";

const EXTERNAL_HREF_RE = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i;

function ensureLeadingSlash(pathname: string) {
  if (!pathname) {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function isExternalHref(href: string) {
  return EXTERNAL_HREF_RE.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (!firstSegment) {
    return null;
  }

  const locale = normalizeLocale(firstSegment);
  return locale && hasLocale(locale) ? locale : null;
}

export function getLocaleFromPathnameOrDefault(pathname: string) {
  return getLocaleFromPathname(pathname) ?? defaultLocale;
}

export function stripLocaleFromPathname(pathname: string) {
  const normalizedPathname = ensureLeadingSlash(pathname);
  const locale = getLocaleFromPathname(normalizedPathname);

  if (!locale) {
    return normalizedPathname === "" ? "/" : normalizedPathname;
  }

  const withoutLocale = normalizedPathname.replace(new RegExp(`^/${locale}(?=/|$)`), "") || "/";
  return withoutLocale.startsWith("/") ? withoutLocale : `/${withoutLocale}`;
}

export function localizeHref(href: string, locale: Locale) {
  if (!href || isExternalHref(href) || href.startsWith("#") || href.startsWith("?")) {
    return href;
  }

  const match = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);

  if (!match) {
    return href;
  }

  const [, rawPathname = "/", search = "", hash = ""] = match;
  const pathname = stripLocaleFromPathname(ensureLeadingSlash(rawPathname));

  if (pathname === "/") {
    return locale === defaultLocale ? `/${search}${hash}`.replace(/\/\?/, "/?") : `/${locale}${search}${hash}`;
  }

  return locale === defaultLocale ? `${pathname}${search}${hash}` : `/${locale}${pathname}${search}${hash}`;
}
