"use client";

import Image from "next/image";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { useState } from "react";

import styles from "./TextField.module.css";

type TextFieldProps = ComponentPropsWithoutRef<"input"> & {
  leadingAdornment?: string;
  trailingAdornment?: string;
  className?: string;
  passwordToggle?: boolean;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
};

function renderAdornment(adornment: string) {
  return (
    <span
      className={styles.adornmentImage}
      style={
        {
          "--adornment-icon": `url("${adornment}")`,
        } as CSSProperties
      }
      aria-hidden="true"
    />
  );
}

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
        src={
          isPasswordVisible ? "/icons/eye-open.svg" : "/icons/eye-off-light.svg"
        }
        alt=""
        aria-hidden="true"
        width={24}
        height={24}
      />
    </button>
  ) : trailingAdornment ? (
    renderAdornment(trailingAdornment)
  ) : undefined;
  const resolvedLeadingAdornment = leadingAdornment
    ? renderAdornment(leadingAdornment)
    : undefined;

  return (
    <div className={styles.field}>
      {resolvedLeadingAdornment ? (
        <span className={styles.leadingAdornment}>
          {resolvedLeadingAdornment}
        </span>
      ) : null}
      <input
        {...props}
        type={resolvedType}
        disabled={disabled}
        className={[
          styles.control,
          resolvedLeadingAdornment ? styles.withLeading : "",
          resolvedTrailingAdornment ? styles.withTrailing : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
      {resolvedTrailingAdornment ? (
        <span className={styles.trailingAdornment}>
          {resolvedTrailingAdornment}
        </span>
      ) : null}
    </div>
  );
}
