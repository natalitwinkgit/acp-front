import { apiFetch } from "./http";

export type UserProfile = {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
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
