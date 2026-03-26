"use client";

import styles from "./BookingHero.module.css";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import BookingForm from "../BookingForm/BookingForm";

export default function BookingHero() {
  const { t } = useI18n();

  return (
    <section className={styles.section}>
      <div className={styles.mainBlock}>
        <div className={styles.formBlock}>
          <BookingForm />

          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src="/BookingHero/main_photo_bus.png"
              alt={t("bookingHero.imageAlt")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
