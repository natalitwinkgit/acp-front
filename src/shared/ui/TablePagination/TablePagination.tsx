import styles from "./TablePagination.module.css";

type TablePaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  prevAriaLabel: string;
  nextAriaLabel: string;
};

export function TablePagination({
  page,
  totalPages,
  onPageChange,
  prevAriaLabel,
  nextAriaLabel,
}: TablePaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={`${styles.pageBtn} ${styles.pageBtnArrow}`}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label={prevAriaLabel}
      >
        {"<"}
      </button>
      {Array.from({ length: safeTotalPages }, (_, index) => index + 1).map(
        (value) => (
          <button
            key={value}
            type="button"
            className={`${styles.pageBtn} ${value === page ? styles.pageBtnActive : ""}`}
            onClick={() => onPageChange(value)}
          >
            {value}
          </button>
        ),
      )}
      <button
        type="button"
        className={`${styles.pageBtn} ${styles.pageBtnArrow}`}
        disabled={page === safeTotalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label={nextAriaLabel}
      >
        {">"}
      </button>
    </div>
  );
}
