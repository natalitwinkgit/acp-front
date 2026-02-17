import { apiFetch } from "./http";

export type RegisterPayload = {
  email: string;
  password: string;
  name?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type TokenResponse = {
  access_token: string;
};

export function register(payload: RegisterPayload) {
  return apiFetch<TokenResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function login(payload: LoginPayload) {
  return apiFetch<TokenResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}