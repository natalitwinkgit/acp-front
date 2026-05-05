"use client";

import { useEffect } from "react";
import ModalCloseButton from "@/src/shared/ui/ModalCloseButton/ModalCloseButton";
import Portal from "@/src/shared/ui/Portal/Portal";
import type { Ticket } from "@/src/entities/ticket";
import { useCountdown } from "@/src/features/ticket-timer";
import styles from "./OrderDetailsModal.module.css";

type Props = {
  ticket: Ticket;
  onClose: () => void;
};

const STATUS_LABEL: Record<Ticket["status"], string> = {
  booked: "Заброньовано",
  paid: "Оплачено",
};

function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function Row({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowIcon}>{icon}</span>
      <span className={styles.rowValue}>{children}</span>
    </div>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11 19.79 19.79 0 0 1 1 2.18 2 2 0 0 1 3 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 15l.92 1.92z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="10" r="3" />
      <path d="M12 2a8 8 0 0 1 8 8c0 5.25-8 13-8 13S4 15.25 4 10a8 8 0 0 1 8-8z" />
    </svg>
  );
}

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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <text x="3" y="18" fontSize="16" fontWeight="600" fill="currentColor" fontFamily="sans-serif">₴</text>
    </svg>
  );
}

export default function OrderDetailsModal({ ticket, onClose }: Props) {
  const remainingSeconds = useCountdown(ticket.timerSeconds);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const bookingNumberStr = ticket.bookingNumber.replace("BR-", "").padStart(6, "0");
  const route = `${ticket.routeFrom} - ${ticket.routeTo}`;

  return (
    <Portal>
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-details-title"
      >
        <div className={styles.header}>
          <h2 className={styles.title} id="order-details-title">
            Дані замовлення №{bookingNumberStr}
          </h2>
          <ModalCloseButton onClose={onClose} ariaLabel="Закрити" />
        </div>

        <div className={styles.body}>
          <Row icon={<UserIcon />}>{ticket.passengerName}</Row>
          <Row icon={<PhoneIcon />}>{ticket.passengerPhone}</Row>
          <Row icon={<LocationIcon />}>{route}</Row>
          <Row icon={<CalendarIcon />}>{ticket.departureDate}</Row>
          <Row icon={<ClockIcon />}>{ticket.departureTime}</Row>
          <Row icon={<TicketIcon />}>{ticket.ticketCount}</Row>
          <Row icon={<HryvniaIcon />}>{ticket.totalPrice}</Row>

          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Статус:</span>
            <span className={styles.metaValue}>{STATUS_LABEL[ticket.status]}</span>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>До кінця бронювання:</span>
            <span className={styles.metaValue}>
              {remainingSeconds !== null ? `${formatSeconds(remainingSeconds)} хв.` : "—"}
            </span>
          </div>

          <hr className={styles.divider} />

          <div className={styles.actions}>
            <button type="button" className={`${styles.btn} ${styles.btnBuy}`}>
              Викупити
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnBook}`}>
              Бронювати
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnEdit}`}>
              Редагувати
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnCancel}`} onClick={onClose}>
              Скасувати
            </button>
          </div>
        </div>
      </div>
    </div>
    </Portal>
  );
}
