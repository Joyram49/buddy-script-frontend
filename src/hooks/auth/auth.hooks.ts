"use client";

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/context/auth/auth.context";
import { getCurrentUser, loginAction, signUpAction } from "@/services/auth/authService";
import type { LoginPayload, RegisterPayload } from "@/types/auth/auth.type";

const authKeys = {
  me: ["auth", "me"] as const,
};

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => signUpAction({ payload }),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.me });
    },
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const { setSession } = useAuth();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginAction({ payload }),
    onSuccess: (session) => {
      setSession(session);
      queryClient.setQueryData(authKeys.me, session.user);
    },
  });
}

export function useCurrentUserQuery() {
  const { accessToken, clearSession, setUser } = useAuth();

  const query = useQuery({
    queryKey: authKeys.me,
    queryFn: getCurrentUser,
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  useEffect(() => {
    if (query.isError) {
      clearSession();
    }
  }, [clearSession, query.isError]);

  return query;
}
