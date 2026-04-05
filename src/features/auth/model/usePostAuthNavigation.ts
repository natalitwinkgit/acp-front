"use client";

import { getRoleLandingPath } from "@/src/features/access-control/model/roles";
import { useLocalizedHref } from "@/src/shared/i18n/I18nProvider";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useAuthSession } from "./session";

export function usePostAuthNavigation(onUserSuccess?: () => void) {
  const router = useRouter();
  const resolveHref = useLocalizedHref();
  const { refreshSession } = useAuthSession();

  return useCallback(async () => {
    const profile = await refreshSession();
    const destination = getRoleLandingPath(profile?.role);

    if (destination === "/profile" && onUserSuccess) {
      onUserSuccess();
      return;
    }

    router.replace(resolveHref(destination));
  }, [onUserSuccess, refreshSession, resolveHref, router]);
}
