/**
 * Small fetch wrapper for talking to the backend API.
 *
 * Base URL is read from VITE_API_URL (see .env.example). Falls back to
 * http://localhost:5000 for local development.
 */

const API_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:5000";

const TOKEN_KEY = "wellness_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

interface ApiResult<T> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

async function request<T = any>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResult<T>> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_URL}${path}`, { ...options, headers });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, status: res.status, error: body.error || "Request failed." };
    }
    return { ok: true, status: res.status, data: body };
  } catch (err) {
    return { ok: false, status: 0, error: "Could not reach the server. Is the backend running?" };
  }
}

export const api = {
  get: <T = any>(path: string) => request<T>(path, { method: "GET" }),
  post: <T = any>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
};
