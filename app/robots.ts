import type { MetadataRoute } from "next";

import { siteOrigin } from "@/src/shared/seo/config";

const disallowPaths = [
  "/home",
  "/en/home",
  "/login",
  "/en/login",
  "/register",
  "/en/register",
  "/forgot-password",
  "/en/forgot-password",
  "/profile",
  "/en/profile",
  "/profile/tickets",
  "/en/profile/tickets",
  "/404",
  "/en/404",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowPaths,
      },
    ],
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
