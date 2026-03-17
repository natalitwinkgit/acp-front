export type RouteLocale = "UA" | "EN";

export type LocalizedValue<T> = Record<RouteLocale, T>;

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
      UA: "Черкаси-Київ (ст.м. Харківська)",
      EN: "Cherkasy-Kyiv (Kharkivska metro)",
    },
    imageSrc: "/Routes/cherkasy-kyiv-kharkivska.jpg",
    imageAlt: {
      UA: "Рейс Черкаси-Київ Харківська",
      EN: "Cherkasy-Kyiv Kharkivska route",
    },
    nearestTripLabel: {
      UA: "Найближчий рейс: сьогодні о 10:30",
      EN: "Nearest trip: today at 10:30",
    },
    price: 500,
    maxSeats: 7,
  },
  {
    id: "2",
    slug: "cherkasy-kyiv-chernihivska",
    title: {
      UA: "Черкаси-Київ (ст.м. Чернігівська)",
      EN: "Cherkasy-Kyiv (Chernihivska metro)",
    },
    imageSrc: "/Routes/cherkasy-kyiv-chernihivska.png",
    imageAlt: {
      UA: "Рейс Черкаси-Київ Чернігівська",
      EN: "Cherkasy-Kyiv Chernihivska route",
    },
    nearestTripLabel: {
      UA: "Найближчий рейс: сьогодні о 11:00",
      EN: "Nearest trip: today at 11:00",
    },
    price: 500,
    maxSeats: 7,
  },
  {
    id: "3",
    slug: "kyiv-kharkivska-cherkasy",
    title: {
      UA: "Київ (ст.м. Харківська)-Черкаси",
      EN: "Kyiv (Kharkivska metro)-Cherkasy",
    },
    imageSrc: "/Routes/kyiv-kharkivska-cherkasy.png",
    imageAlt: {
      UA: "Рейс Київ Харківська-Черкаси",
      EN: "Kyiv Kharkivska-Cherkasy route",
    },
    nearestTripLabel: {
      UA: "Найближчий рейс: сьогодні о 08:00",
      EN: "Nearest trip: today at 08:00",
    },
    price: 500,
    maxSeats: 7,
  },
  {
    id: "4",
    slug: "kyiv-chernihivska-cherkasy",
    title: {
      UA: "Київ (ст.м. Чернігівська)-Черкаси",
      EN: "Kyiv (Chernihivska metro)-Cherkasy",
    },
    imageSrc: "/Routes/kyiv-chernihivska-cherkasy.jpg",
    imageAlt: {
      UA: "Рейс Київ Чернігівська-Черкаси",
      EN: "Kyiv Chernihivska-Cherkasy route",
    },
    nearestTripLabel: {
      UA: "Найближчий рейс: сьогодні о 08:15",
      EN: "Nearest trip: today at 08:15",
    },
    price: 500,
    maxSeats: 7,
  },
  {
    id: "5",
    slug: "cherkasy-kharkiv",
    title: {
      UA: "Черкаси-Харків",
      EN: "Cherkasy-Kharkiv",
    },
    imageSrc: "/Routes/cherkasy-kharkiv.png",
    imageAlt: {
      UA: "Рейс Черкаси-Харків",
      EN: "Cherkasy-Kharkiv route",
    },
    nearestTripLabel: {
      UA: "Найближчий рейс: сьогодні о 07:00",
      EN: "Nearest trip: today at 07:00",
    },
    price: 950,
    maxSeats: 7,
  },
  {
    id: "6",
    slug: "cherkasy-poltava",
    title: {
      UA: "Черкаси-Полтава",
      EN: "Cherkasy-Poltava",
    },
    imageSrc: "/Routes/cherkasy-poltava.png",
    imageAlt: {
      UA: "Рейс Черкаси-Полтава",
      EN: "Cherkasy-Poltava route",
    },
    nearestTripLabel: {
      UA: "Найближчий рейс: сьогодні о 09:00",
      EN: "Nearest trip: today at 09:00",
    },
    price: 667,
    maxSeats: 7,
  },
  {
    id: "7",
    slug: "cherkasy-kremenchuk",
    title: {
      UA: "Черкаси-Кременчук",
      EN: "Cherkasy-Kremenchuk",
    },
    imageSrc: "/Routes/cherkasy-kremenchuk.jpg",
    imageAlt: {
      UA: "Рейс Черкаси-Кременчук",
      EN: "Cherkasy-Kremenchuk route",
    },
    nearestTripLabel: {
      UA: "Найближчий рейс: сьогодні о 08:20",
      EN: "Nearest trip: today at 08:20",
    },
    price: 400,
    maxSeats: 7,
  },
  {
    id: "8",
    slug: "zolotonosha-kyiv",
    title: {
      UA: "Золотоноша-Київ",
      EN: "Zolotonosha-Kyiv",
    },
    imageSrc: "/Routes/zolotonosha-kyiv.png",
    imageAlt: {
      UA: "Рейс Золотоноша-Київ",
      EN: "Zolotonosha-Kyiv route",
    },
    nearestTripLabel: {
      UA: "Найближчий рейс: сьогодні о 06:45",
      EN: "Nearest trip: today at 06:45",
    },
    price: 450,
    maxSeats: 7,
  },
];

export function getLocalizedRouteValue<T>(
  value: LocalizedValue<T>,
  lang: RouteLocale
) {
  return value[lang];
}

export function getPopularRouteHref(slug: string) {
  return `/tickets/${slug}`;
}

export function getPopularRouteBySlug(slug: string) {
  return popularRoutes.find((route) => route.slug === slug);
}
