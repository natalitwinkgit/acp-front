"use client";

import styles from "./Button.module.css";

export default function Button({
  text,
  variant = "primary", 
  type = "button",
  onClick,
  leftIcon = null,
  rightIcon = null,
  fullWidth = true,
  disabled = false,
}) {
  const cls = [
    styles.button,
    variant === "secondary" ? styles.secondary : styles.primary,
    fullWidth ? styles.fullWidth : "",
    disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled}>
      <span className={leftIcon ? styles.iconVisible : styles.icon}>{leftIcon}</span>
      <span className={styles.text}>{text}</span>
      <span className={rightIcon ? styles.iconVisible : styles.icon}>{rightIcon}</span>
    </button>
  );
}
