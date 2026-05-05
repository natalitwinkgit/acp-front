/**
 * Shared layer - common utilities, composites and helpers
 * Exports from multiple shared modules for convenient imports
 */

// API & HTTP utilities
export * from './api';

// Internationalization
export { I18nProvider, LocaleLink, useI18n, useLocalizedHref, useT } from './i18n';
export type { Locale, MessageValue, Messages } from './i18n';

// Shared UI
export { default as Button } from './ui/Button/Button';
export { default as Notification } from './ui/Notification/Notification';
export type { NotificationSize, NotificationVariant } from './ui/Notification/Notification';
export { default as AdminCard } from './ui/AdminCard/AdminCard';
export { AdminTable, AdminThead, AdminTr, adminTableStyles } from './ui/AdminTable/AdminTable';
export { AdminDateText } from './ui/AdminDateText/AdminDateText';
export { TablePagination } from './ui/TablePagination/TablePagination';

// Shared utilities
export {
  DEFAULT_TABLE_PAGE_SIZE,
  countPages,
  getVisiblePages,
  paginateItems,
} from './lib/pagination';
export { useResizeTableHook } from './lib/resizeTableHook';
