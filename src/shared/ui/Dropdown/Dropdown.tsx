"use client";

import { useEffect, useRef } from "react";
import styles from "./dropdown.module.css";

export type DropdownItem = {
  label: string;
  onClick: () => void;
};

type DropdownProps = {
  id: string;
  openId: string | null;
  onToggle: (id: string | null) => void;
  items: DropdownItem[];
  hideTrigger?: boolean;
};

export function Dropdown({ id, openId, onToggle, items, hideTrigger }: DropdownProps) {
  const isOpen = openId === id;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onToggle(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div ref={ref} className={styles.dropdownWrapper}>
      {!hideTrigger && (
        <button
          type="button"
          className={styles.chevronBtn}
          onClick={() => onToggle(isOpen ? null : id)}
        >
          <span
            className={`${styles.chevron} ${isOpen ? styles.chevronUp : ""}`}
          />
        </button>
      )}

      {isOpen && (
        <ul className={styles.dropdown}>
          {items.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  item.onClick();
                  onToggle(null);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
