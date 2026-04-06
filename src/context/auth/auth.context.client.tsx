"use client";

import { createContext, useContext, useMemo, useState } from "react";

import type { AuthSession, User } from "@/types/auth/auth.type";

const ACCESS_TOKEN_KEY = "accessToken";

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function persistSession(session: AuthSession) {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
  window.localStorage.setItem("authUser", JSON.stringify(session.user));
  document.cookie = `access_token=${session.accessToken}; path=/; max-age=2592000; samesite=lax`;
  document.cookie = `accessToken=${session.accessToken}; path=/; max-age=2592000; samesite=lax`;
}

function clearPersistedSession() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem("authUser");
  document.cookie = "access_token=; path=/; max-age=0; samesite=lax";
  document.cookie = "accessToken=; path=/; max-age=0; samesite=lax";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const rawUser = window.localStorage.getItem("authUser");
    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as User;
    } catch {
      window.localStorage.removeItem("authUser");
      return null;
    }
  });
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.localStorage.getItem(ACCESS_TOKEN_KEY);
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(accessToken && user),
      setSession: (session) => {
        persistSession(session);
        setAccessToken(session.accessToken);
        setUser(session.user);
      },
      clearSession: () => {
        clearPersistedSession();
        setAccessToken(null);
        setUser(null);
      },
      setUser: (nextUser) => {
        setUser(nextUser);
        if (nextUser) {
          window.localStorage.setItem("authUser", JSON.stringify(nextUser));
        } else {
          window.localStorage.removeItem("authUser");
        }
      },
    }),
    [accessToken, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
