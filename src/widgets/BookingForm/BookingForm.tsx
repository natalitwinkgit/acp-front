"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { getTripAvailability, getTrips, type Trip } from "@/src/shared/api";
import { useI18n, useLocalizedHref } from "@/src/shared/i18n/I18nProvider";
import styles from "./BookingForm.module.css";
import Button from "../Button/Button";
import MiniCalendar from "../MiniCalendar/MiniCalendar";

function formatDDMMYYYY(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

function formatISODate(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

type RouteOption = {
  value: string;
  from: string;
  to: string;
  label: string;
};

function buildRouteValue(from: string, to: string) {
  return `${from}__${to}`;
}

function parseRouteValue(value: string) {
  const separatorIndex = value.indexOf("__");

  if (separatorIndex === -1) {
    return { from: value, to: "" };
  }

  return {
    from: value.slice(0, separatorIndex),
    to: value.slice(separatorIndex + 2),
  };
}

function buildRouteOptions(trips: Trip[]) {
  const optionsMap = new Map<string, RouteOption>();

  for (const trip of trips) {
    const from = trip.from.trim();
    const to = trip.to.trim();

    if (!from || !to) {
      continue;
    }

    const value = buildRouteValue(from, to);

    if (!optionsMap.has(value)) {
      optionsMap.set(value, {
        value,
        from,
        to,
        label: `${from} — ${to}`,
      });
    }
  }

  return [...optionsMap.values()].sort((left, right) => left.label.localeCompare(right.label));
}

function sortTripsByTime(trips: Trip[]) {
  return [...trips].sort((left, right) => {
    const leftTime = left.departureTime ?? "99:99";
    const rightTime = right.departureTime ?? "99:99";

    return leftTime.localeCompare(rightTime);
  });
}

function formatTripTime(trip: Trip) {
  return trip.departureTime ?? "--:--";
}

type BookingFormProps = {
  initialTrips?: Trip[];
};

export default function BookingForm({ initialTrips = [] }: BookingFormProps) {
  const router = useRouter();
  const resolveHref = useLocalizedHref();
  const { lang, t, raw } = useI18n();

  const [date, setDate] = useState<Date | null>(null);
  const [openCal, setOpenCal] = useState(false);
  const [allTrips, setAllTrips] = useState<Trip[]>(initialTrips);
  const [matchingTrips, setMatchingTrips] = useState<Trip[]>([]);
  const [selectedRouteValue, setSelectedRouteValue] = useState("");
  const [selectedTripId, setSelectedTripId] = useState("");
  const [seatsValue, setSeatsValue] = useState("1");
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(initialTrips.length === 0);
  const [isSearchingTrips, setIsSearchingTrips] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isPendingNavigation, startNavigation] = useTransition();

  const dateText = useMemo(() => (date ? formatDDMMYYYY(date) : ""), [date]);
  const seats = useMemo(() => {
    const parsedSeats = Number(seatsValue);
    return Number.isFinite(parsedSeats) && parsedSeats > 0 ? parsedSeats : 1;
  }, [seatsValue]);

  const months = raw("bookingForm.calendar.months") as string[];
  const weekdays = raw("bookingForm.calendar.weekdays") as string[];
  const routeOptions = useMemo(() => buildRouteOptions(allTrips), [allTrips]);
  const timeOptions = useMemo(() => sortTripsByTime(matchingTrips), [matchingTrips]);
  const selectedTrip = useMemo(
    () => timeOptions.find((trip) => trip.id === selectedTripId) ?? null,
    [selectedTripId, timeOptions],
  );
  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat(lang === "en" ? "en-US" : "uk-UA", {
        maximumFractionDigits: 0,
      }),
    [lang],
  );
  const priceText = selectedTrip?.price != null
    ? priceFormatter.format(selectedTrip.price)
    : "";
  const isBusy = isBootstrapping || isSearchingTrips || isCheckingAvailability || isPendingNavigation;

  useEffect(() => {
    if (initialTrips.length > 0) {
      setAllTrips(initialTrips);
      setIsBootstrapping(false);
      return;
    }

    let isCancelled = false;

    const loadTrips = async () => {
      setIsBootstrapping(true);
      setStatusMessage("");
      setIsError(false);

      try {
        const trips = await getTrips();

        if (isCancelled) {
          return;
        }

        setAllTrips(trips);

        if (trips.length === 0) {
          setStatusMessage(t("bookingForm.status.empty"));
        }
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setStatusMessage(
          error instanceof Error && error.message
            ? error.message
            : t("bookingForm.status.loadError"),
        );
        setIsError(true);
      } finally {
        if (!isCancelled) {
          setIsBootstrapping(false);
        }
      }
    };

    void loadTrips();

    return () => {
      isCancelled = true;
    };
  }, [initialTrips, t]);

  useEffect(() => {
    if (!selectedRouteValue) {
      setMatchingTrips([]);
      setSelectedTripId("");
      if (!isBootstrapping && routeOptions.length > 0) {
        setStatusMessage("");
        setIsError(false);
      }

      return;
    }

    let isCancelled = false;
    const { from, to } = parseRouteValue(selectedRouteValue);

    const loadMatchingTrips = async () => {
      setIsSearchingTrips(true);
      setStatusMessage("");
      setIsError(false);

      try {
        const trips = await getTrips({
          from,
          to,
          date: date ? formatISODate(date) : undefined,
          seats,
        });

        if (isCancelled) {
          return;
        }

        const sortedTrips = sortTripsByTime(trips);
        setMatchingTrips(sortedTrips);
        setSelectedTripId((currentTripId) => (
          sortedTrips.some((trip) => trip.id === currentTripId)
            ? currentTripId
            : (sortedTrips[0]?.id ?? "")
        ));

        if (sortedTrips.length === 0) {
          setStatusMessage(t("bookingForm.status.noTrips"));
        }
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setMatchingTrips([]);
        setSelectedTripId("");
        setStatusMessage(
          error instanceof Error && error.message
            ? error.message
            : t("bookingForm.status.searchError"),
        );
        setIsError(true);
      } finally {
        if (!isCancelled) {
          setIsSearchingTrips(false);
        }
      }
    };

    void loadMatchingTrips();

    return () => {
      isCancelled = true;
    };
  }, [date, isBootstrapping, routeOptions.length, seats, selectedRouteValue, t]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedTrip) {
      setStatusMessage(t("bookingForm.status.selectTrip"));
      setIsError(true);
      return;
    }

    setIsCheckingAvailability(true);
    setStatusMessage("");
    setIsError(false);

    try {
      const availability = await getTripAvailability(selectedTrip.id, seats);

      const hasEnoughSeats = availability.available === false
        ? false
        : availability.availableSeats == null || availability.availableSeats >= seats;

      if (!hasEnoughSeats) {
        setStatusMessage(t("bookingForm.status.seatsUnavailable"));
        setIsError(true);
        return;
      }

      startNavigation(() => {
        router.push(resolveHref(`/tickets/${selectedTrip.id}`));
      });
    } catch (error) {
      setStatusMessage(
        error instanceof Error && error.message
          ? error.message
          : t("bookingForm.status.availabilityError"),
      );
      setIsError(true);
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{t("bookingForm.title")}</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputBlock}>
          <select
            className={`${styles.control} ${styles.select}`}
            value={selectedRouteValue}
            onChange={(event) => setSelectedRouteValue(event.target.value)}
            disabled={isBootstrapping || routeOptions.length === 0}
          >
            <option value="" disabled>
              {t("bookingForm.route.placeholder")}
            </option>
            {routeOptions.map((routeOption) => (
              <option key={routeOption.value} value={routeOption.value}>
                {routeOption.label}
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
            value={selectedTripId}
            onChange={(event) => setSelectedTripId(event.target.value)}
            disabled={!selectedRouteValue || isSearchingTrips || timeOptions.length === 0}
          >
            <option value="" disabled>
              {t("bookingForm.time.placeholder")}
            </option>
            {timeOptions.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {formatTripTime(trip)}
              </option>
            ))}
          </select>

          <div className={styles.row2}>
            <select
              className={`${styles.controlHalf} ${styles.select}`}
              value={seatsValue}
              onChange={(event) => setSeatsValue(event.target.value)}
            >
              <option value="" disabled>
                {t("bookingForm.qty.placeholder")}
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>

            <div className={styles.controlWithIconHalf}>
              <input
                className={styles.controlInner}
                type="text"
                placeholder={t("bookingForm.price.placeholder")}
                value={priceText}
                readOnly
              />
              <span className={styles.iconRight} aria-hidden="true">
                <Image src="/icons/currency-hryvnia.svg" alt="" aria-hidden="true" width={24} height={24} />
              </span>
            </div>
          </div>
        </div>

        {statusMessage ? (
          <div className={`${styles.status} ${isError ? styles.statusError : styles.statusInfo}`}>
            {statusMessage}
          </div>
        ) : null}

        {isBootstrapping ? (
          <div className={styles.status}>{t("bookingForm.status.loading")}</div>
        ) : null}

        <div className={styles.primaryBtnWrap}>
          <Button
            text={isBusy ? t("bookingForm.buttons.loading") : t("bookingForm.buttons.continue")}
            type="submit"
            disabled={isBusy || !selectedTrip}
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
}
