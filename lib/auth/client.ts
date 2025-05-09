"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useState, useEffect } from "react";

export function createSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export function useGetCurrentUserId(): string | null {
  const [userId, setUserId] = useState<string | null>(null);
  const { auth } = createSupabaseClient();

  useEffect(() => {
    // Subscribe to auth‐state changes
    const { data: sub } = auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
    });

    // Initial check
    auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null);
    });

    // Cleanup
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [auth]);

  return userId;
}

export function useGetUserEmail(): string | null {
  const [email, setEmail] = useState<string | null>(null);
  const { auth } = createSupabaseClient();

  useEffect(() => {
    // Subscribe to auth‐state changes
    const { data: sub } = auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
    });

    // Initial check
    auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null);
    });

    // Cleanup
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [auth]);

  return email;
}

export function useGetCurrentUserAvatar(): string | null {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { auth } = createSupabaseClient();

  useEffect(() => {
    // 1) Listen to auth state changes
    const { data: sub } = auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      const meta = user?.user_metadata as Record<string, string> | undefined;
      setAvatarUrl(meta?.avatar_url ?? meta?.picture ?? null);
    });

    // 2) Initial check on mount
    auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      const meta = user?.user_metadata as Record<string, string> | undefined;
      setAvatarUrl(meta?.avatar_url ?? meta?.picture ?? null);
    });

    // 3) Cleanup
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [auth]);

  return avatarUrl;
}

export function useGetCurrentUserName(): string | null {
  const [name, setName] = useState<string | null>(null);
  const { auth } = createSupabaseClient();

  useEffect(() => {
    // listener for any auth-state change (sign-in, sign-out, token refresh)
    const { data: sub } = auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      const meta = user?.user_metadata as Record<string, string> | undefined;
      setName(meta?.full_name ?? meta?.name ?? null);
    });

    // initial check
    auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      const meta = user?.user_metadata as Record<string, string> | undefined;
      setName(meta?.full_name ?? meta?.name ?? null);
    });

    // cleanup on unmount
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [auth]);

  return name;
}

export function useIsAuthenticated(): boolean {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { auth } = createSupabaseClient();

  useEffect(() => {
    // 1) Listen to auth state changes
    const { data: sub } = auth.onAuthStateChange((_event, session) => {
      setIsAuth(!!session?.user);
    });

    // 2) Check immediately in case there’s an existing session
    auth.getSession().then(({ data }) => {
      setIsAuth(!!data.session?.user);
    });

    // 3) Cleanup on unmount
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [auth]);

  return isAuth;
}