"use client";

import styles from "./ModalCloseButton.module.css";

type Props = {
  className?: string;
  ariaLabel?: string;
  onClose?: () => void;
};

export default function ModalCloseButton({ className, ariaLabel = "Close", onClose }: Props) {
  const buttonClassName = className ? `${styles.button} ${className}` : styles.button;

  return (
    <button
      type="button"
      className={buttonClassName}
      aria-label={ariaLabel}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClose?.();
      }}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M7 7L17 17M7 17L17 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
