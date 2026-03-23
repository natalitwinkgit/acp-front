"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import BreadcrumbChips from "@/src/shared/ui/BreadcrumbChips/BreadcrumbChips";
import { type PopularRoute, getLocalizedRouteValue } from "@/src/shared/data/popularRoutes";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import Button from "@/src/widgets/Button/Button";
import styles from "./ticket-booking.module.css";

type TicketBookingPageContentProps = {
  route: PopularRoute;
};

export default function TicketBookingPageContent({ route }: TicketBookingPageContentProps) {
  const { lang, t } = useI18n();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [seats, setSeats] = useState(1);

  const routeTitle = getLocalizedRouteValue(route.title, lang);
  const routeAlt = getLocalizedRouteValue(route.imageAlt, lang);
  const nearestTripLabel = getLocalizedRouteValue(route.nearestTripLabel, lang);

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat(lang === "EN" ? "en-US" : "uk-UA", {
        maximumFractionDigits: 0,
      }),
    [lang]
  );

  const totalPrice = route.price * seats;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <BreadcrumbChips
          ariaLabel={t("ticketBooking.breadcrumbsAria")}
          items={[
            { label: t("ticketBooking.breadcrumbs.home"), href: "/#home" },
            { label: t("ticketBooking.breadcrumbs.routes"), href: "/#routes" },
            { label: routeTitle, current: true },
          ]}
        />

        <section className={styles.hero}>
          <p className={styles.kicker}>{t("ticketBooking.routePrefix")}</p>
          <h1 className={styles.title}>{routeTitle}</h1>
          <p className={styles.tripLabel}>{nearestTripLabel}</p>
        </section>

        <section className={styles.layout}>
          <section className={styles.formCard} aria-labelledby="ticket-booking-form-title">
            <div className={styles.cardHeader}>
              <h2 id="ticket-booking-form-title" className={styles.cardTitle}>
                {t("ticketBooking.form.title")}
              </h2>
              <p className={styles.cardNote}>{t("ticketBooking.form.note")}</p>
            </div>

            <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span className={styles.label}>{t("ticketBooking.form.nameLabel")}</span>
                  <input
                    className={styles.input}
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder={t("ticketBooking.form.namePlaceholder")}
                    autoComplete="name"
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>{t("ticketBooking.form.emailLabel")}</span>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={t("ticketBooking.form.emailPlaceholder")}
                    autoComplete="email"
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>{t("ticketBooking.form.phoneLabel")}</span>
                  <input
                    className={styles.input}
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder={t("ticketBooking.form.phonePlaceholder")}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </label>

                <div className={`${styles.field} ${styles.fieldSeats}`}>
                  <span className={styles.label}>{t("ticketBooking.form.seatsLabel")}</span>

                  <div className={styles.seatsControl}>
                    <button
                      className={styles.seatButton}
                      type="button"
                      aria-label={t("ticketBooking.controls.decreaseSeats")}
                      onClick={() => setSeats((current) => Math.max(1, current - 1))}
                      disabled={seats <= 1}
                    >
                      -
                    </button>

                    <span className={styles.seatValue}>{seats}</span>

                    <button
                      className={styles.seatButton}
                      type="button"
                      aria-label={t("ticketBooking.controls.increaseSeats")}
                      onClick={() => setSeats((current) => Math.min(route.maxSeats, current + 1))}
                      disabled={seats >= route.maxSeats}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <Button
                  text={t("ticketBooking.form.reserve")}
                  variant="secondary"
                  fullWidth={false}
                  onClick={() => {}}
                />
                <Button
                  text={t("ticketBooking.form.pay")}
                  fullWidth={false}
                  onClick={() => {}}
                />
              </div>
            </form>
          </section>

          <aside className={styles.summaryCard} aria-labelledby="ticket-booking-summary-title">
            <div className={styles.imageWrap}>
              <Image
                src={route.imageSrc}
                alt={routeAlt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 420px"
                className={styles.image}
              />
            </div>

            <div className={styles.summaryBody}>
              <h2 id="ticket-booking-summary-title" className={styles.summaryTitle}>
                {t("ticketBooking.routeCard.title")}
              </h2>

              <div className={styles.summaryRoute}>{routeTitle}</div>
              <div className={styles.summaryTrip}>{nearestTripLabel}</div>

              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>{t("ticketBooking.routeCard.passengers")}</span>
                  <strong>{seats}</strong>
                </div>

                <div className={styles.summaryRow}>
                  <span>{t("ticketBooking.routeCard.total")}</span>
                  <strong>{priceFormatter.format(totalPrice)} ₴</strong>
                </div>
              </div>

              <div className={styles.summaryFoot}>
                {priceFormatter.format(route.price)} ₴ x {seats}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
