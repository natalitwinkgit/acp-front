// HTTP utilities
export { API_URL, apiFetch } from './http';

// Auth API
export { register, login, logout } from './auth';
export type { RegisterPayload, LoginPayload, TokenResponse } from './auth';
export {
  clearGoogleAuthContext,
  consumeGoogleAuthError,
  finalizeGoogleAuth,
  getGoogleAuthCallbackUrl,
  getGoogleAuthErrorRedirectPath,
  getGoogleAuthSuccessRedirectPath,
  startGoogleAuth,
  storeGoogleAuthError,
} from "./google-auth";
export type { GoogleAuthIntent } from "./google-auth";
export {
  clearAccessToken,
  getAccessToken,
  hasAccessToken,
  setAccessToken,
} from "./session";
