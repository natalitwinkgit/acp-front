"use client";

import styles from "./BookingHero.module.css";
import BookingForm from "../BookingForm/BookingForm";

export default function BookingHero() {
  return (
    <section className={styles.section}>
      <div className={styles.mainBlock}>
        <div className={styles.formBlock}>
          <BookingForm />

          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src="/BookingHero/main_photo_bus.png"
              alt="Автобус"
            />
          </div>
        </div>
      </div>
    </section>
  );
}