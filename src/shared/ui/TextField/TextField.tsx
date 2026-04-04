"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Image from "next/image";
import { useState } from "react";

import styles from "./TextField.module.css";

type TextFieldProps = ComponentPropsWithoutRef<"input"> & {
  leadingAdornment?: ReactNode;
  trailingAdornment?: ReactNode;
  className?: string;
  passwordToggle?: boolean;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
};

export default function TextField({
  type,
  leadingAdornment,
  trailingAdornment,
  className,
  passwordToggle = false,
  showPasswordLabel = "Show password",
  hidePasswordLabel = "Hide password",
  disabled,
  ...props
}: TextFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = passwordToggle && type === "password";
  const resolvedType = isPasswordField && isPasswordVisible ? "text" : type;
  const resolvedTrailingAdornment = isPasswordField ? (
    <button
      type="button"
      className={styles.toggleButton}
      onClick={() => setIsPasswordVisible((value) => !value)}
      aria-label={isPasswordVisible ? hidePasswordLabel : showPasswordLabel}
      disabled={disabled}
    >
      <Image
        className={styles.icon}
        src={isPasswordVisible ? "/icons/eye-open.svg" : "/icons/eye-off-light.svg"}
        alt=""
        aria-hidden="true"
        width={24}
        height={24}
      />
    </button>
  ) : (
    trailingAdornment
  );

  return (
    <div className={styles.field}>
      {leadingAdornment ? <span className={styles.leadingAdornment}>{leadingAdornment}</span> : null}
      <input
        {...props}
        type={resolvedType}
        disabled={disabled}
        className={[
          styles.control,
          leadingAdornment ? styles.withLeading : "",
          resolvedTrailingAdornment ? styles.withTrailing : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
      {resolvedTrailingAdornment ? (
        <span className={styles.trailingAdornment}>{resolvedTrailingAdornment}</span>
      ) : null}
    </div>
  );
}
