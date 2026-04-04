"use client";

import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { useState } from "react";

import styles from "./TextField.module.css";

type PasswordFieldProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  className?: string;
  showLabel: string;
  hideLabel: string;
};

export default function PasswordField({
  className,
  showLabel,
  hideLabel,
  disabled,
  ...props
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.field}>
      <input
        {...props}
        type={isVisible ? "text" : "password"}
        disabled={disabled}
        className={[styles.control, styles.withTrailing, className].filter(Boolean).join(" ")}
      />

      <span className={styles.trailingAdornment}>
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setIsVisible((value) => !value)}
          aria-label={isVisible ? hideLabel : showLabel}
          disabled={disabled}
        >
          <Image
            className={styles.icon}
            src={isVisible ? "/icons/eye-open.svg" : "/icons/eye-off-light.svg"}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
          />
        </button>
      </span>
    </div>
  );
}
