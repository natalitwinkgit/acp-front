export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
    cache: "no-store",
  });

  
  if (!res.ok) {
    let msg = "Request failed";
    try {
      const body = await res.json();
      msg = body?.message ?? msg;
      if (Array.isArray(msg)) msg = msg.join(", ");
    } catch {}
    throw new Error(msg);
  }

  
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}