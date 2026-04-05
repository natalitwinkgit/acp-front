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

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const requestIdRef = useRef(0);
  const [isAuthenticated, setIsAuthenticated] = useState(() => hasAccessToken());
  const [isLoading, setIsLoading] = useState(() => hasAccessToken());
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const refreshSession = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    const authenticated = hasAccessToken();

    setIsAuthenticated(authenticated);

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
