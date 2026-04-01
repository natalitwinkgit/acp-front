"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "../BookingForm.module.css";
import { formatDDMMYYYY } from "../../lib/bookingForm.utils";
import MiniCalendar from "../../../MiniCalendar/MiniCalendar";

type DateFieldProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder: string;
  months: string[];
  weekdays: string[];
  availableDateKeys?: string[];
};

export default function DateField({
  value,
  onChange,
  placeholder,
  months,
  weekdays,
  availableDateKeys,
}: DateFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const minDate = useMemo(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }, []);
  const dateText = useMemo(() => (value ? formatDDMMYYYY(value) : ""), [value]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!fieldRef.current?.contains(target)) {
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
    <div className={styles.dateWrap} ref={fieldRef}>
      <button
        type="button"
        className={styles.controlWithIconBtn}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={styles.dateValue}>{dateText || placeholder}</span>

        <span
          className={`${styles.iconRight} ${styles.calendarIcon} ${
            isOpen ? styles.calendarIconActive : ""
          }`}
          aria-hidden="true"
        >
          <Image src="/icons/calendar.svg" alt="" aria-hidden="true" width={24} height={24} />
        </span>
      </button>

      {isOpen ? (
        <div className={styles.calendarPopover}>
          <MiniCalendar
            value={value}
            onChange={onChange}
            onClose={() => setIsOpen(false)}
            minDate={minDate}
            months={months}
            weekdays={weekdays}
            availableDates={availableDateKeys}
          />
        </div>
      ) : null}
    </div>
  );
}
