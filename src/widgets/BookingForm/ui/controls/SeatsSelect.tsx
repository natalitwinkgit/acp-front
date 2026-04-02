"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useI18n } from "@/src/shared/i18n/I18nProvider";
import Notification from "@/src/shared/ui/Notification/Notification";

import styles from "../BookingForm.module.css";
import { SEAT_OPTIONS } from "../../model/types";

type SeatsSelectProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export default function SeatsSelect({ value, placeholder, onChange }: SeatsSelectProps) {
  const { t } = useI18n();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toastMessage]);

  return (
    <div className={styles.seatsDropdown} ref={dropdownRef}>
      <button
        type="button"
        className={styles.seatsDropdownTrigger}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="booking-form-seats-listbox"
      >
        <span className={styles.seatsDropdownValue}>{value || placeholder}</span>
        <span
          className={`${styles.seatsDropdownChevron} ${
            isOpen ? styles.seatsDropdownChevronOpen : ""
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
        <div className={styles.seatsDropdownMenu}>
          <div
            id="booking-form-seats-listbox"
            className={styles.seatsDropdownList}
            role="listbox"
            aria-label={placeholder}
          >
            {SEAT_OPTIONS.map((seatOption) => {
              const isSelected = seatOption === value;

              return (
                <button
                  key={seatOption}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.seatsDropdownOption} ${
                    isSelected ? styles.seatsDropdownOptionSelected : ""
                  }`}
                  onClick={() => {
                    onChange(seatOption);
                    setIsOpen(false);
                  }}
                >
                  <span className={styles.seatsDropdownOptionLabel}>{seatOption}</span>
                </button>
              );
            })}

            <button
              type="button"
              className={`${styles.seatsDropdownOption} ${styles.seatsDropdownOptionIconCell}`}
              onClick={() => {
                setToastMessage(t("bookingForm.qty.toast"));
                setIsOpen(false);
              }}
            >
              <span className={styles.seatsDropdownOptionIcon} aria-hidden="true">
                <Image src="/icons/chevrons-right.svg" alt="" width={12} height={10} />
              </span>
            </button>
          </div>
        </div>
      ) : null}

      {toastMessage ? (
        <Notification
          variant="info"
          size="small"
          message={toastMessage}
          onClose={() => setToastMessage("")}
          closeLabel={t("common.close")}
          className={styles.seatsNotification}
        />
      ) : null}
    </div>
  );
}
