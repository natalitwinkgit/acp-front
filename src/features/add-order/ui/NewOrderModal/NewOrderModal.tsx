"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import type { TicketStatus } from "@/src/entities/ticket";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import ModalCloseButton from "@/src/shared/ui/ModalCloseButton/ModalCloseButton";
import Portal from "@/src/shared/ui/Portal/Portal";
import TextField from "@/src/shared/ui/TextField/TextField";
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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  );
}

export default function NewOrderModal({ onClose, nextBookingNumber }: Props) {
  const { t } = useI18n();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

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

  function setField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <Portal>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="new-order-title">
          <div className={styles.header}>
            <h2 className={styles.title} id="new-order-title">
              {t("dispatcherArea.tickets.modal.newOrderTitle")} № {bookingNumberStr}
            </h2>
            <ModalCloseButton onClose={onClose} ariaLabel={t("common.close")} />
          </div>

          <div className={styles.body}>
            <Field label={t("profile.fields.name")}>
              <TextField
                placeholder={t("ticketBooking.form.namePlaceholder")}
                value={form.passengerName}
                onChange={(event) => setField("passengerName", event.target.value)}
              />
            </Field>

            <Field label={t("profile.fields.phone")}>
              <TextField
                placeholder={t("profile.placeholders.phone")}
                value={form.passengerPhone}
                onChange={(event) => setField("passengerPhone", event.target.value)}
              />
            </Field>

            <Field label={t("dispatcherArea.analytics.popularRoutes.columns.route")}>
              <TextField
                placeholder={t("dispatcherArea.tickets.modal.routePlaceholder")}
                value={form.route}
                onChange={(event) => setField("route", event.target.value)}
              />
            </Field>

            <div className={styles.row}>
              <Field label={t("bookingForm.date.placeholder")}>
                <TextField
                  placeholder={t("dispatcherArea.tickets.modal.datePlaceholder")}
                  value={form.date}
                  onChange={(event) => setField("date", event.target.value)}
                  trailingAdornment={<CalendarIcon />}
                />
              </Field>
              <Field label={t("dispatcherArea.tickets.modal.departureTime")}>
                <TextField
                  placeholder="00:00"
                  value={form.departureTime}
                  onChange={(event) => setField("departureTime", event.target.value)}
                  trailingAdornment={<ClockIcon />}
                />
              </Field>
            </div>

            <div className={styles.row}>
              <Field label={t("dispatcherArea.tickets.modal.ticketCount")}>
                <TextField
                  type="number"
                  min={0}
                  value={form.ticketCount}
                  onChange={(event) => setField("ticketCount", event.target.value)}
                  trailingAdornment={<TicketIcon />}
                />
              </Field>
              <Field label={t("bookingForm.price.placeholder")}>
                <TextField
                  type="number"
                  min={0}
                  value={form.totalPrice}
                  onChange={(event) => setField("totalPrice", event.target.value)}
                  trailingAdornment={<HryvniaIcon />}
                />
              </Field>
            </div>

            <div className={styles.statusRow}>
              <button
                type="button"
                className={`${styles.statusBtn} ${form.status === "booked" ? styles.statusBtnBooked : styles.statusBtnIdle}`}
                onClick={() => setField("status", "booked")}
              >
                {t("dispatcherArea.tickets.statuses.bookedShort")}
              </button>
              <button
                type="button"
                className={`${styles.statusBtn} ${form.status === "paid" ? styles.statusBtnPaid : styles.statusBtnIdle}`}
                onClick={() => setField("status", "paid")}
              >
                {t("dispatcherArea.tickets.statuses.paid")}
              </button>
            </div>

            <p className={styles.timer}>
              {t("dispatcherArea.tickets.timer.untilBookingEnd")}: 00:00 {t("dispatcherArea.tickets.timer.minutes")}
            </p>
            <hr className={styles.divider} />
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.saveBtn} onClick={onClose}>
              {t("dispatcherArea.tickets.actions.saveChanges")}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
