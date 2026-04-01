"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./BookingForm.module.css";
import Button from "../Button/Button";
import MiniCalendar from "../MiniCalendar/MiniCalendar";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { useTrips } from "./useTrips";

function formatDDMMYYYY(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

export default function BookingForm() {
  const { t, raw } = useI18n();
  const { trips, loading, error } = useTrips();

  const [date, setDate] = useState<Date | null>(null);
  const [openCal, setOpenCal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [qty, setQty] = useState("");

  const dateText = useMemo(() => (date ? formatDDMMYYYY(date) : ""), [date]);

  const months = raw("bookingForm.calendar.months") as string[];
  const weekdays = raw("bookingForm.calendar.weekdays") as string[];

  const uniqueRoutes = useMemo(() => {
    const seen = new Set<string>();
    return trips.filter((trip) => {
      const key = `${trip.from}|${trip.to}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [trips]);

  const timesForRoute = useMemo(() => {
    if (!selectedRoute) return [];
    const [from, to] = selectedRoute.split("|");
    return trips.filter((trip) => trip.from === from && trip.to === to);
  }, [trips, selectedRoute]);

  const selectedTrip = useMemo(
    () => timesForRoute.find((trip) => trip.departureTime === selectedTime) ?? null,
    [timesForRoute, selectedTime],
  );

  const priceDisplay = selectedTrip ? String(selectedTrip.price) : "";

  const disabled = loading;

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{t("bookingForm.title")}</div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputBlock}>
          <select
            className={`${styles.control} ${styles.select}`}
            value={selectedRoute}
            disabled={disabled}
            onChange={(e) => {
              setSelectedRoute(e.target.value);
              setSelectedTime("");
            }}
          >
            <option value="" disabled>
              {loading ? t("bookingForm.loading") : t("bookingForm.route.placeholder")}
            </option>
            {uniqueRoutes.map((trip) => (
              <option key={`${trip.from}|${trip.to}`} value={`${trip.from}|${trip.to}`}>
                {trip.from} — {trip.to}
              </option>
            ))}
          </select>

          <div className={styles.dateWrap}>
            <button
              type="button"
              className={styles.controlWithIconBtn}
              onClick={() => setOpenCal((v) => !v)}
              aria-haspopup="dialog"
              aria-expanded={openCal}
              disabled={disabled}
            >
              <span className={styles.dateValue}>{dateText || t("bookingForm.date.placeholder")}</span>

              <span
                className={`${styles.iconRight} ${styles.calendarIcon} ${
                  openCal ? styles.calendarIconActive : ""
                }`}
                aria-hidden="true"
              >
                <Image src="/icons/calendar.svg" alt="" aria-hidden="true" width={24} height={24} />
              </span>
            </button>

            {openCal && (
              <div className={styles.calendarPopover}>
                <MiniCalendar
                  value={date}
                  onChange={(d) => setDate(d)}
                  onClose={() => setOpenCal(false)}
                  months={months}
                  weekdays={weekdays}
                />
              </div>
            )}
          </div>

          <select
            className={`${styles.control} ${styles.select}`}
            value={selectedTime}
            disabled={disabled || !selectedRoute}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="" disabled>
              {t("bookingForm.time.placeholder")}
            </option>
            {timesForRoute.map((trip) => (
              <option key={trip.id} value={trip.departureTime}>
                {trip.departureTime}
              </option>
            ))}
          </select>

          <div className={styles.row2}>
            <select
              className={`${styles.controlHalf} ${styles.select}`}
              value={qty}
              disabled={disabled}
              onChange={(e) => setQty(e.target.value)}
            >
              <option value="" disabled>
                {t("bookingForm.qty.placeholder")}
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>

            <div className={styles.controlWithIconHalf}>
              <input
                className={styles.controlInner}
                type="text"
                placeholder={t("bookingForm.price.placeholder")}
                value={priceDisplay}
                readOnly
              />
              <span className={styles.iconRight} aria-hidden="true">
                <Image src="/icons/currency-hryvnia.svg" alt="" aria-hidden="true" width={24} height={24} />
              </span>
            </div>
          </div>

          {error && <p role="alert" className={styles.errorMessage}>{t("bookingForm.error")}</p>}
        </div>
      </form>

      <div className={styles.primaryBtnWrap}>
        <Button text={loading ? t("bookingForm.loading") : t("bookingForm.buttons.continue")} onClick={() => console.log("buy")} disabled={disabled} />
      </div>
    </div>
  );
}
