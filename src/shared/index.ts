/**
 * Shared layer - common utilities, composites and helpers
 * Exports from multiple shared modules for convenient imports
 */

// API & HTTP utilities
export * from './api';

// Internationalization
export { I18nProvider, useI18n, useT } from './i18n';
export type { Lang } from './i18n';
