import { apiFetch } from "./http";
import { clearAccessToken } from "./session";

export type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  name?: string;
};

export type LoginPayload = {
  identifier: string;
  password: string;
};

export type TokenResponse = {
  access_token: string;
};

type MessageResponse = {
  message: string;
};

export function register(payload: RegisterPayload) {
  return apiFetch<TokenResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
    includeAuth: false,
    skipAuthRefresh: true,
  });
}

export function login(payload: LoginPayload) {
  return apiFetch<TokenResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
    includeAuth: false,
    skipAuthRefresh: true,
  });
}

export async function logout() {
  try {
    return await apiFetch<MessageResponse>("/auth/logout", {
      method: "PATCH",
    });
  } finally {
    clearAccessToken();
  }
}
