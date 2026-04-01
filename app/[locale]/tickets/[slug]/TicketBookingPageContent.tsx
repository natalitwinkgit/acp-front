"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import BreadcrumbChips from "@/src/shared/ui/BreadcrumbChips/BreadcrumbChips";
import { type PopularRoute, getLocalizedRouteValue } from "@/src/shared/data/popularRoutes";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import Button from "@/src/widgets/Button/Button";
import styles from "./ticket-booking.module.css";

type TicketBookingPageContentProps = {
  route: PopularRoute;
  initialSeats: number;
};

function formatDisplayDate(value: string | null, locale: string) {
  if (!value) {
    return "";
  }

  const parsedDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
  }).format(parsedDate);
}

function formatDisplayTime(value: string | null) {
  if (!value) {
    return "--:--";
  }

  const timeMatch = value.match(/(\d{2}:\d{2})/);
  return timeMatch?.[1] ?? value;
}

export default function TicketBookingPageContent({
  route,
  initialSeats,
}: TicketBookingPageContentProps) {
  const { lang, t } = useI18n();
  const locale = lang === "en" ? "en-GB" : "uk-UA";
  const safeInitialSeats = Math.min(Math.max(initialSeats, 1), route.maxSeats);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [seats, setSeats] = useState(safeInitialSeats);

  const routeTitle = getLocalizedRouteValue(route.title, lang);
  const nearestTripLabel = getLocalizedRouteValue(route.nearestTripLabel, lang);
  const departureCity = getLocalizedRouteValue(route.departureCity, lang);
  const departureStop = getLocalizedRouteValue(route.departureStop, lang);
  const arrivalCity = getLocalizedRouteValue(route.arrivalCity, lang);
  const arrivalStop = getLocalizedRouteValue(route.arrivalStop, lang);

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat(lang === "en" ? "en-US" : "uk-UA", {
        maximumFractionDigits: 0,
      }),
    [lang],
  );

  const totalPrice = route.price * seats;
  const formattedDate = formatDisplayDate(route.tripDate, locale);
  const departureTime = formatDisplayTime(route.departureTime);
  const arrivalTime = formatDisplayTime(route.arrivalTime);
  const heroMeta = formattedDate
    ? `${formattedDate}${route.departureTime ? ` • ${departureTime}` : ""} • ${seats}`
    : `${nearestTripLabel} • ${seats}`;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.headBlock}>
          <BreadcrumbChips
            className={styles.breadcrumbs}
            ariaLabel={t("ticketBooking.breadcrumbsAria")}
            items={[
              { label: t("ticketBooking.breadcrumbs.home"), href: "/#home" },
              { label: t("ticketBooking.breadcrumbs.routes"), href: "/#routes" },
              { label: t("ticketBooking.breadcrumbs.current"), current: true },
            ]}
          />

          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>
              {t("ticketBooking.routePrefix")}: {routeTitle}
            </h1>
            <p className={styles.heroMeta}>{heroMeta}</p>
          </div>
        </section>

        <section className={styles.layout}>
          <section className={styles.formCard} aria-labelledby="ticket-booking-form-title">
            <h2 id="ticket-booking-form-title" className={styles.formTitle}>
              {t("ticketBooking.form.title")}
            </h2>

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

                <div className={styles.field}>
                  <span className={styles.label}>
                    {t("ticketBooking.form.seatsLabel")} (Макс. {route.maxSeats})*
                  </span>

                  <div className={styles.seatsRow}>
                    <div className={styles.stepper}>
                      <button
                        type="button"
                        className={styles.stepperButton}
                        aria-label={t("ticketBooking.controls.decreaseSeats")}
                        onClick={() => setSeats((current) => Math.max(1, current - 1))}
                        disabled={seats <= 1}
                      >
                        -
                      </button>

                      <span className={styles.stepperValue}>{seats}</span>

                      <button
                        type="button"
                        className={styles.stepperButton}
                        aria-label={t("ticketBooking.controls.increaseSeats")}
                        onClick={() => setSeats((current) => Math.min(route.maxSeats, current + 1))}
                        disabled={seats >= route.maxSeats}
                      >
                        +
                      </button>
                    </div>

                    <span className={styles.seatsHint}>{t("ticketBooking.form.seatsHint")}</span>
                  </div>
                </div>
              </div>

              <div className={styles.identityNote}>
                <p>{t("ticketBooking.form.identityNote")}</p>
              </div>
            </form>
          </section>

          <aside className={styles.sidebarCard}>
            <section className={styles.sidebarSection}>
              <h2 className={styles.sidebarTitle}>{t("ticketBooking.routeCard.aboutTitle")}</h2>

              <div className={styles.routeInfo}>
                <div className={styles.routeTimes}>
                  <span>{departureTime}</span>
                  <span>{arrivalTime}</span>
                </div>

                <div className={styles.routeTimeline} aria-hidden="true">
                  <span className={styles.timelineStart} />
                  <span className={styles.timelineDots} />
                  <span className={styles.timelineEnd} />
                </div>

                <div className={styles.routeStops}>
                  <div className={styles.routeStop}>
                    <strong>{departureCity}</strong>
                    {departureStop ? <span>{departureStop}</span> : null}
                  </div>

                  <div className={styles.routeStop}>
                    <strong>{arrivalCity}</strong>
                    {arrivalStop ? <span>{arrivalStop}</span> : null}
                  </div>
                </div>
              </div>
            </section>

            <div className={styles.sidebarDivider} />

            <section className={styles.sidebarSection}>
              <h2 className={styles.sidebarTitle}>{t("ticketBooking.routeCard.title")}</h2>

              <div className={styles.summaryRow}>
                <span>{t("ticketBooking.routeCard.passengers")}</span>
                <strong>{seats}</strong>
              </div>

              <div className={styles.summaryRow}>
                <span>{t("ticketBooking.routeCard.total")}</span>
                <strong>{priceFormatter.format(totalPrice)} ₴</strong>
              </div>
            </section>
          </aside>

          <div className={styles.actionBlock}>
            <div className={styles.paymentSecurity}>
              <span className={styles.paymentText}>{t("ticketBooking.payment.secure")}</span>

              <div className={styles.paymentMarks} aria-hidden="true">
                <Image
                  src="/icons/tickets/logos_visa.svg"
                  alt=""
                  width={68}
                  height={22}
                  className={styles.paymentLogoVisa}
                />
                <Image
                  src="/icons/tickets/logos_mastercard.svg"
                  alt=""
                  width={31}
                  height={24}
                  className={styles.paymentLogoMastercard}
                />
                <Image
                  src="/icons/tickets/logos_maestro.svg"
                  alt=""
                  width={31}
                  height={24}
                  className={styles.paymentLogoMaestro}
                />
              </div>
            </div>

            <div className={styles.actions}>
              <Button
                text={t("ticketBooking.form.pay")}
                fullWidth={false}
                onClick={() => {}}
              />
              <Button
                text={t("ticketBooking.form.reserve")}
                variant="secondary"
                fullWidth={false}
                onClick={() => {}}
              />
            </div>

            <p className={styles.termsText}>{t("ticketBooking.payment.terms")}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
