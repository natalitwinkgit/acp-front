import { apiFetch } from "@/src/shared/api/http";

export const USER_ROLES = ["USER", "ADMIN", "DISPETCHER"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export type UserProfile = {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
  role?: UserRole | null;
  specialCategory: string | null;
  documentPhoto: string | null;
  createdAt: string;
};

export type UpdateProfilePayload = {
  email?: string;
  name?: string;
  phone?: string;
  specialCategory?: string;
  documentPhoto?: string;
};

export type UpdateProfileResponse = {
  message: string;
  user: Omit<UserProfile, "createdAt">;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

type MessageResponse = {
  message: string;
};

export function getProfile() {
  return apiFetch<UserProfile>("/users/profile");
}

export function updateProfile(payload: UpdateProfilePayload) {
  return apiFetch<UpdateProfileResponse>("/users/profile", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function changePassword(payload: ChangePasswordPayload) {
  return apiFetch<MessageResponse>("/users/change-password", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
