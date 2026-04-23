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

export function getVisiblePages(page: number, totalPages: number): number[] {
  const visibleValues: number[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      visibleValues.push(i);
    }

    return visibleValues;
  }

  if (page !== 1) {
    visibleValues.push(1);
  }

  visibleValues.push(page);

  if (page !== totalPages) {
    visibleValues.push(totalPages);
  }

  return visibleValues;
}
