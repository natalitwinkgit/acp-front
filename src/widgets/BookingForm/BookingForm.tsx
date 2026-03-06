"use client";

import { useMemo, useState } from "react";
import styles from "./BookingForm.module.css";
import Button from "../Button/Button";
import MiniCalendar from "../MiniCalendar/MiniCalendar";
import { useI18n } from "@/src/shared/i18n/I18nProvider";

function formatDDMMYYYY(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

export default function BookingForm() {
  const { t, raw } = useI18n();

  const [date, setDate] = useState<Date | null>(null);
  const [openCal, setOpenCal] = useState(false);

  const dateText = useMemo(() => (date ? formatDDMMYYYY(date) : ""), [date]);

  const months = raw("bookingForm.calendar.months") as string[];
  const weekdays = raw("bookingForm.calendar.weekdays") as string[];

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{t("bookingForm.title")}</div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputBlock}>
          <select className={`${styles.control} ${styles.select}`} defaultValue="">
            <option value="" disabled>
              {t("bookingForm.route.placeholder")}
            </option>
            <option>{t("bookingForm.route.options.kyivLviv")}</option>
            <option>{t("bookingForm.route.options.lvivIvanoFrankivsk")}</option>
            <option>{t("bookingForm.route.options.kyivOdesa")}</option>
          </select>

          <div className={styles.dateWrap}>
            <button
              type="button"
              className={styles.controlWithIconBtn}
              onClick={() => setOpenCal((v) => !v)}
              aria-haspopup="dialog"
              aria-expanded={openCal}
            >
              <span className={styles.dateValue}>{dateText || t("bookingForm.date.placeholder")}</span>

              <span
                className={`${styles.iconRight} ${styles.calendarIcon} ${
                  openCal ? styles.calendarIconActive : ""
                }`}
                aria-hidden="true"
              >
                <img src="/icons/calendar.svg" alt="" />
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

          <select className={`${styles.control} ${styles.select}`} defaultValue="">
            <option value="" disabled>
              {t("bookingForm.time.placeholder")}
            </option>
            <option>08:00</option>
            <option>12:00</option>
            <option>18:00</option>
          </select>

          <div className={styles.row2}>
            <select className={`${styles.controlHalf} ${styles.select}`} defaultValue="">
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
                readOnly
              />
              <span className={styles.iconRight} aria-hidden="true">
                <img src="/icons/currency-hryvnia.svg" alt="" />
              </span>
            </div>
          </div>
        </div>
      </form>

      <div className={styles.primaryBtnWrap}>
        <Button text={t("bookingForm.buttons.continue")} onClick={() => console.log("buy")} />
      </div>
    </div>
  );
}
