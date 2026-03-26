"use client";

import NextLink, { type LinkProps } from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { type Locale } from "./config";
import { useLocalizedHref } from "./I18nProvider";

type LocaleLinkProps = Omit<ComponentPropsWithoutRef<typeof NextLink>, "href"> &
  Omit<LinkProps, "href"> & {
    href: string;
    locale?: Locale;
  };

export default function LocaleLink({ href, locale, ...props }: LocaleLinkProps) {
  const resolveHref = useLocalizedHref();

  return <NextLink href={resolveHref(href, locale)} {...props} />;
}
