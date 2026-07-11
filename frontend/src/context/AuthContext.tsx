import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { api, getToken, setToken } from "../utils/api";

export interface User {
  name: string;
  email: string;
}

interface AuthResult {
  ok: boolean;
  error?: string;
}

interface AuthCtx {
  user: User | null;
  loading: boolean;
  signup: (data: { name: string; email: string; password: string }) => Promise<AuthResult>;
  login: (data: { email: string; password: string }) => Promise<AuthResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);

const CURRENT_KEY = "wellness_current_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(CURRENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // On mount, if a token exists, verify it against the backend and hydrate user info.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      const res = await api.get<{ ok: boolean; user: User }>("/api/auth/me");
      if (cancelled) return;
      if (res.ok && res.data?.user) {
        setUser(res.data.user);
      } else {
        // token invalid/expired
        setToken(null);
        setUser(null);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
    else localStorage.removeItem(CURRENT_KEY);
  }, [user]);

  const signup = useCallback(
    async (data: { name: string; email: string; password: string }): Promise<AuthResult> => {
      const res = await api.post<{ token: string; user: User }>("/api/auth/signup", data);
      if (!res.ok || !res.data) return { ok: false, error: res.error };
      setToken(res.data.token);
      setUser(res.data.user);
      return { ok: true };
    },
    [],
  );

  const login = useCallback(async (data: { email: string; password: string }): Promise<AuthResult> => {
    const res = await api.post<{ token: string; user: User }>("/api/auth/login", data);
    if (!res.ok || !res.data) return { ok: false, error: res.error };
    setToken(res.data.token);
    setUser(res.data.user);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
