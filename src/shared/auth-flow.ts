import { getLocaleFromPathnameOrDefault } from "@/src/shared/i18n/routing";
import { localizeHref } from "@/src/shared/i18n/routing";

type RouterLike = {
  back: () => void;
  replace: (href: string) => void;
};

export const AUTH_BACKGROUND_KEY = "auth:background";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getAuthBackground() {
  if (!isBrowser()) return null;
  return window.sessionStorage.getItem(AUTH_BACKGROUND_KEY);
}

export function storeAuthBackground(href: string) {
  if (!isBrowser()) return;
  window.sessionStorage.setItem(AUTH_BACKGROUND_KEY, href);
}

export function clearAuthBackground() {
  if (!isBrowser()) return;
  window.sessionStorage.removeItem(AUTH_BACKGROUND_KEY);
}

export function consumeAuthBackground() {
  const background = getAuthBackground();
  clearAuthBackground();
  return background;
}

export function closeAuthRoute(
  router: RouterLike,
  options: { fallback?: string; preferBack?: boolean } = {},
) {
  const { fallback = "/", preferBack = false } = options;
  const background = consumeAuthBackground();

  if (preferBack && background && isBrowser() && window.history.length > 1) {
    router.back();
    return;
  }

  const locale = isBrowser() ? getLocaleFromPathnameOrDefault(window.location.pathname) : "uk";
  router.replace(background || localizeHref(fallback, locale));
}
