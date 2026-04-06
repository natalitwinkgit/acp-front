"use client";

import { getProfile, type UserProfile, type UserRole } from "@/src/entities/user";
import { hasAccessToken, subscribeToAuthChange } from "@/src/shared/api/session";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type AuthSessionContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  profile: UserProfile | null;
  role: UserRole | null;
  refreshSession: () => Promise<UserProfile | null>;
};

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);
const DEV_ROLE_KEY = "dev-role";
const DEV_AUTH_ENABLED = process.env.NEXT_PUBLIC_ENABLE_DEV_AUTH === "true";

function getDevRole(): UserRole | null {
  if (!DEV_AUTH_ENABLED) {
    return null;
  }

  if (typeof window === "undefined") {
    return null;
  }

  // DEV ONLY: temporary local role override for UI testing in development.
  const value = window.localStorage.getItem(DEV_ROLE_KEY);

  if (value === "USER" || value === "ADMIN" || value === "DISPETCHER") {
    return value;
  }

  return null;
}

function createDevProfile(role: UserRole): UserProfile {
  return {
    id: 1,
    email: "dev@example.com",
    name: role === "ADMIN" ? "Admin Test" : role === "DISPETCHER" ? "Dispatcher Test" : "User Test",
    phone: null,
    role,
    specialCategory: null,
    documentPhoto: null,
    createdAt: new Date().toISOString(),
  };
}

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const requestIdRef = useRef(0);
  // Keep the first server and client render identical. Real auth state is resolved after mount.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const refreshSession = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    const authenticated = hasAccessToken();
    const devRole = getDevRole();

    setIsAuthenticated(authenticated || devRole != null);

    if (devRole != null) {
      const nextProfile = createDevProfile(devRole);

      if (requestId === requestIdRef.current) {
        setProfile(nextProfile);
        setIsLoading(false);
      }

      return nextProfile;
    }

    if (!authenticated) {
      setProfile(null);
      setIsLoading(false);
      return null;
    }

    setIsLoading(true);

    try {
      const nextProfile = await getProfile();

      if (requestId === requestIdRef.current) {
        setProfile(nextProfile);
      }

      return nextProfile;
    } catch {
      if (requestId === requestIdRef.current) {
        setProfile(null);
      }

      return null;
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void refreshSession();

    return subscribeToAuthChange(() => {
      void refreshSession();
    });
  }, [refreshSession]);

  const value = useMemo<AuthSessionContextValue>(
    () => ({
      isAuthenticated,
      isLoading,
      profile,
      role: profile?.role ?? null,
      refreshSession,
    }),
    [isAuthenticated, isLoading, profile, refreshSession],
  );

  return <AuthSessionContext.Provider value={value}>{children}</AuthSessionContext.Provider>;
}

export function useAuthSession() {
  const context = useContext(AuthSessionContext);

  if (!context) {
    throw new Error("useAuthSession must be used within AuthSessionProvider");
  }

  return context;
}
