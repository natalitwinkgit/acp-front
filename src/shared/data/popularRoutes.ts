import type { Locale } from "@/src/shared/i18n/config";
import type { Trip } from "@/src/shared/api/trips";

export type LocalizedValue<T> = Record<Locale, T>;

export type PopularRoute = {
  id: string;
  slug: string;
  title: LocalizedValue<string>;
  imageSrc: string;
  imageAlt: LocalizedValue<string>;
  nearestTripLabel: LocalizedValue<string>;
  price: number;
  maxSeats: number;
};

export const popularRoutes: PopularRoute[] = [
  {
    id: "1",
    slug: "cherkasy-kyiv-kharkivska",
    title: {
      uk: "Черкаси-Київ (ст.м. Харківська)",
      en: "Cherkasy-Kyiv (Kharkivska metro)",
    },
    imageSrc: "/Routes/cherkasy-kyiv-kharkivska.jpg",
    imageAlt: {
      uk: "Рейс Черкаси-Київ Харківська",
      en: "Cherkasy-Kyiv Kharkivska route",
    },
    nearestTripLabel: {
      uk: "Найближчий рейс: сьогодні о 10:30",
      en: "Nearest trip: today at 10:30",
    },
    price: 500,
    maxSeats: 7,
  },
  {
    id: "2",
    slug: "cherkasy-kyiv-chernihivska",
    title: {
      uk: "Черкаси-Київ (ст.м. Чернігівська)",
      en: "Cherkasy-Kyiv (Chernihivska metro)",
    },
    imageSrc: "/Routes/cherkasy-kyiv-chernihivska.png",
    imageAlt: {
      uk: "Рейс Черкаси-Київ Чернігівська",
      en: "Cherkasy-Kyiv Chernihivska route",
    },
    nearestTripLabel: {
      uk: "Найближчий рейс: сьогодні о 11:00",
      en: "Nearest trip: today at 11:00",
    },
    price: 500,
    maxSeats: 7,
  },
  {
    id: "3",
    slug: "kyiv-kharkivska-cherkasy",
    title: {
      uk: "Київ (ст.м. Харківська)-Черкаси",
      en: "Kyiv (Kharkivska metro)-Cherkasy",
    },
    imageSrc: "/Routes/kyiv-kharkivska-cherkasy.png",
    imageAlt: {
      uk: "Рейс Київ Харківська-Черкаси",
      en: "Kyiv Kharkivska-Cherkasy route",
    },
    nearestTripLabel: {
      uk: "Найближчий рейс: сьогодні о 08:00",
      en: "Nearest trip: today at 08:00",
    },
    price: 500,
    maxSeats: 7,
  },
  {
    id: "4",
    slug: "kyiv-chernihivska-cherkasy",
    title: {
      uk: "Київ (ст.м. Чернігівська)-Черкаси",
      en: "Kyiv (Chernihivska metro)-Cherkasy",
    },
    imageSrc: "/Routes/kyiv-chernihivska-cherkasy.jpg",
    imageAlt: {
      uk: "Рейс Київ Чернігівська-Черкаси",
      en: "Kyiv Chernihivska-Cherkasy route",
    },
    nearestTripLabel: {
      uk: "Найближчий рейс: сьогодні о 08:15",
      en: "Nearest trip: today at 08:15",
    },
    price: 500,
    maxSeats: 7,
  },
  {
    id: "5",
    slug: "cherkasy-kharkiv",
    title: {
      uk: "Черкаси-Харків",
      en: "Cherkasy-Kharkiv",
    },
    imageSrc: "/Routes/cherkasy-kharkiv.png",
    imageAlt: {
      uk: "Рейс Черкаси-Харків",
      en: "Cherkasy-Kharkiv route",
    },
    nearestTripLabel: {
      uk: "Найближчий рейс: сьогодні о 07:00",
      en: "Nearest trip: today at 07:00",
    },
    price: 950,
    maxSeats: 7,
  },
  {
    id: "6",
    slug: "cherkasy-poltava",
    title: {
      uk: "Черкаси-Полтава",
      en: "Cherkasy-Poltava",
    },
    imageSrc: "/Routes/cherkasy-poltava.png",
    imageAlt: {
      uk: "Рейс Черкаси-Полтава",
      en: "Cherkasy-Poltava route",
    },
    nearestTripLabel: {
      uk: "Найближчий рейс: сьогодні о 09:00",
      en: "Nearest trip: today at 09:00",
    },
    price: 667,
    maxSeats: 7,
  },
  {
    id: "7",
    slug: "cherkasy-kremenchuk",
    title: {
      uk: "Черкаси-Кременчук",
      en: "Cherkasy-Kremenchuk",
    },
    imageSrc: "/Routes/cherkasy-kremenchuk.jpg",
    imageAlt: {
      uk: "Рейс Черкаси-Кременчук",
      en: "Cherkasy-Kremenchuk route",
    },
    nearestTripLabel: {
      uk: "Найближчий рейс: сьогодні о 08:20",
      en: "Nearest trip: today at 08:20",
    },
    price: 400,
    maxSeats: 7,
  },
  {
    id: "8",
    slug: "zolotonosha-kyiv",
    title: {
      uk: "Золотоноша-Київ",
      en: "Zolotonosha-Kyiv",
    },
    imageSrc: "/Routes/zolotonosha-kyiv.png",
    imageAlt: {
      uk: "Рейс Золотоноша-Київ",
      en: "Zolotonosha-Kyiv route",
    },
    nearestTripLabel: {
      uk: "Найближчий рейс: сьогодні о 06:45",
      en: "Nearest trip: today at 06:45",
    },
    price: 450,
    maxSeats: 7,
  },
];

export function getLocalizedRouteValue<T>(
  value: LocalizedValue<T>,
  locale: Locale
) {
  return value[locale];
}

export function getPopularRouteHref(slug: string) {
  return `/tickets/${slug}`;
}

export function getPopularRouteBySlug(slug: string) {
  return popularRoutes.find((route) => route.slug === slug);
}

function formatTripDateLabel(date: string | null, locale: Locale) {
  if (!date) {
    return locale === "en" ? "date to be confirmed" : "дату уточнюйте";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);
}

function formatTripTimeLabel(trip: Trip, locale: Locale) {
  const dateLabel = formatTripDateLabel(trip.date, locale);
  const timeLabel = formatTripTimeValue(trip.departureTime, locale);

  return locale === "en"
    ? `Nearest trip: ${dateLabel} at ${timeLabel}`
    : `Найближчий рейс: ${dateLabel} о ${timeLabel}`;
}

function formatTripTimeValue(value: string | null, locale: Locale) {
  if (!value) {
    return locale === "en" ? "time to be confirmed" : "час уточнюйте";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    const timeMatch = value.match(/(\d{2}:\d{2})/);
    return timeMatch?.[1] ?? value;
  }

  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(parsedDate);
}

export function mapTripToPopularRoute(trip: Trip): PopularRoute {
  const title = `${trip.from} — ${trip.to}`;
  const imageSrc = trip.imageSrc ?? "/BookingHero/main_photo_bus.png";
  const maxSeatsCandidate = trip.availableSeats ?? trip.totalSeats ?? 1;

  return {
    id: trip.id,
    slug: trip.slug ?? trip.id,
    title: {
      uk: title,
      en: title,
    },
    imageSrc,
    imageAlt: {
      uk: `Рейс ${title}`,
      en: `${title} route`,
    },
    nearestTripLabel: {
      uk: formatTripTimeLabel(trip, "uk"),
      en: formatTripTimeLabel(trip, "en"),
    },
    price: trip.price ?? 0,
    maxSeats: Math.max(1, maxSeatsCandidate),
  };
}
