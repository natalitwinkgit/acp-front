"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "../BookingForm.module.css";
import type { RouteOption } from "../../model/types";

type RouteDropdownProps = {
  value: string;
  options: RouteOption[];
  selectedOption: RouteOption | null;
  placeholder: string;
  disabled: boolean;
  onChange: (value: string) => void;
};

export default function RouteDropdown({
  value,
  options,
  selectedOption,
  placeholder,
  disabled,
  onChange,
}: RouteDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!dropdownRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={styles.routeDropdown} ref={dropdownRef}>
      <button
        type="button"
        className={styles.routeDropdownTrigger}
        onClick={() => {
          if (!disabled) {
            setIsOpen((currentValue) => !currentValue);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="booking-form-route-listbox"
        disabled={disabled}
      >
        <span className={styles.routeDropdownValue}>{selectedOption?.label ?? placeholder}</span>
        <span
          className={`${styles.routeDropdownChevron} ${
            isOpen ? styles.routeDropdownChevronOpen : ""
          }`}
          aria-hidden="true"
        >
          <Image
            src={isOpen ? "/icons/arrow-up.svg" : "/icons/down-arrow.svg"}
            alt=""
            width={12}
            height={7}
          />
        </span>
      </button>

      {isOpen ? (
        <div className={styles.routeDropdownMenu}>
          <div
            id="booking-form-route-listbox"
            className={styles.routeDropdownList}
            role="listbox"
            aria-label={placeholder}
          >
            {options.map((routeOption) => {
              const isSelected = routeOption.value === value;

              return (
                <button
                  key={routeOption.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.routeDropdownOption} ${
                    isSelected ? styles.routeDropdownOptionSelected : ""
                  }`}
                  onClick={() => {
                    onChange(routeOption.value);
                    setIsOpen(false);
                  }}
                >
                  <span className={styles.routeDropdownOptionLabel}>{routeOption.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
