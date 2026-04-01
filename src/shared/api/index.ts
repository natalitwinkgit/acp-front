// HTTP utilities
export { API_URL, apiFetch } from './http';

// Auth API
export { register, login, logout } from './auth';
export type { RegisterPayload, LoginPayload, TokenResponse } from './auth';
export { changePassword, getProfile, updateProfile } from "./users";
export type {
  ChangePasswordPayload,
  UpdateProfilePayload,
  UpdateProfileResponse,
  UserProfile,
} from "./users";
export {
  clearAccessToken,
  getAccessToken,
  hasAccessToken,
  setAccessToken,
} from "./session";
export { getTrips } from "./trips";
export type { Trip } from "./trips";
