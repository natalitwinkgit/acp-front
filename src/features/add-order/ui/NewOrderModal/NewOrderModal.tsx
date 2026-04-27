"use client";

import { useEffect, useState } from "react";
import ModalCloseButton from "@/src/shared/ui/ModalCloseButton/ModalCloseButton";
import Portal from "@/src/shared/ui/Portal/Portal";
import TextField from "@/src/shared/ui/TextField/TextField";
import type { TicketStatus } from "@/src/entities/ticket";
import styles from "./NewOrderModal.module.css";

type Props = {
  onClose: () => void;
  nextBookingNumber: number;
};

type FormState = {
  passengerName: string;
  passengerPhone: string;
  route: string;
  date: string;
  departureTime: string;
  ticketCount: string;
  totalPrice: string;
  status: TicketStatus;
};

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
    </svg>
  );
}

function HryvniaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <text x="5" y="18" fontSize="16" fontWeight="600" fill="currentColor" stroke="none" fontFamily="sans-serif">₴</text>
    </svg>
  );
}

export default function NewOrderModal({ onClose, nextBookingNumber }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const [form, setForm] = useState<FormState>({
    passengerName: "",
    passengerPhone: "",
    route: "",
    date: "",
    departureTime: "",
    ticketCount: "0",
    totalPrice: "0",
    status: "booked",
  });

  const bookingNumberStr = String(nextBookingNumber).padStart(6, "0");

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <Portal>
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="new-order-title">
        <div className={styles.header}>
          <h2 className={styles.title} id="new-order-title">
            Нове замовлення № {bookingNumberStr}
          </h2>
          <ModalCloseButton onClose={onClose} ariaLabel="Закрити" />
        </div>

        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label}>Прізвище та ім&apos;я</label>
            <TextField
              placeholder="Прізвище Ім'я"
              value={form.passengerName}
              onChange={(e) => set("passengerName", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Телефон</label>
            <TextField
              placeholder="+380..."
              value={form.passengerPhone}
              onChange={(e) => set("passengerPhone", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Рейс</label>
            <TextField
              placeholder="м.Кременчук-м.Черкаси"
              value={form.route}
              onChange={(e) => set("route", e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Дата</label>
              <TextField
                placeholder="дд.мм.рррр"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                trailingAdornment={<CalendarIcon />}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Час відправлення</label>
              <TextField
                placeholder="00:00"
                value={form.departureTime}
                onChange={(e) => set("departureTime", e.target.value)}
                trailingAdornment={<ClockIcon />}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>К-сть квитків</label>
              <TextField
                type="number"
                min={0}
                value={form.ticketCount}
                onChange={(e) => set("ticketCount", e.target.value)}
                trailingAdornment={<TicketIcon />}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Вартість</label>
              <TextField
                type="number"
                min={0}
                value={form.totalPrice}
                onChange={(e) => set("totalPrice", e.target.value)}
                trailingAdornment={<HryvniaIcon />}
              />
            </div>
          </div>

          <div className={styles.statusRow}>
            <button
              type="button"
              className={`${styles.statusBtn} ${form.status === "booked" ? styles.statusBtnBooked : styles.statusBtnIdle}`}
              onClick={() => set("status", "booked")}
            >
              Бронь
            </button>
            <button
              type="button"
              className={`${styles.statusBtn} ${form.status === "paid" ? styles.statusBtnPaid : styles.statusBtnIdle}`}
              onClick={() => set("status", "paid")}
            >
              Оплачено
            </button>
          </div>

          <p className={styles.timer}>
            До кінця бронювання:&nbsp;&nbsp;00:00 хв.
          </p>
          <hr className={styles.divider} />
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.saveBtn} onClick={onClose}>
            Зберегти зміни
          </button>
        </div>
      </div>
    </div>
    </Portal>
  );
}
