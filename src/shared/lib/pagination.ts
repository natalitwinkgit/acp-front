export const DEFAULT_TABLE_PAGE_SIZE = 10;

export function countPages(
  totalItems: number,
  pageSize = DEFAULT_TABLE_PAGE_SIZE,
): number {
  return Math.ceil(totalItems / pageSize);
}

export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize = DEFAULT_TABLE_PAGE_SIZE,
): T[] {
  const startIndex = (page - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}
