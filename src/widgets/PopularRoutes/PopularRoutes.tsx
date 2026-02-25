"use client";

import styles from "./PopularRoutes.module.css";
import PopularRoutesTitle from "./PopularRoutesTitle";
import { useI18n } from "@/src/shared/i18n/I18nProvider";

export type PopularRoute = {
  id: string;
  title: string;
  imageSrc?: string;
};

type Props = {
  routes?: PopularRoute[];
};

const fallbackRoutes: PopularRoute[] = [
  {
    id: "1",
    title: "Черкаси-Київ (ст.м.Харківська)",
    imageSrc: "/Routes/cherkasy-kyiv-kharkivska.jpg",
  },
  {
    id: "2",
    title: "Черкаси-Київ (ст.м.Чернігівська)",
    imageSrc: "/Routes/cherkasy-kyiv-chernihivska.png",
  },
  {
    id: "3",
    title: "Київ (ст.м.Харківська)-Черкаси",
    imageSrc: "/Routes/kyiv-kharkivska-cherkasy.png",
  },
  {
    id: "4",
    title: "Київ (ст.м.Чернігівська)-Черкаси",
    imageSrc: "/Routes/kyiv-chernihivska-cherkasy.jpg",
  },
  {
    id: "5",
    title: "Черкаси-Харків",
    imageSrc: "/Routes/cherkasy-kharkiv.png",
  },
  {
    id: "6",
    title: "Черкаси-Полтава",
    imageSrc: "/Routes/cherkasy-poltava.png",
  },
  {
    id: "7",
    title: "Черкаси-Кременчук",
    imageSrc: "/Routes/cherkasy-kremenchuk.jpg",
  },
  {
    id: "8",
    title: "Золотоноша-Київ",
    imageSrc: "/Routes/zolotonosha-kyiv.png",
  },
];

export default function PopularRoutes({ routes }: Props) {
  const { t } = useI18n();
  const data = routes?.length ? routes : fallbackRoutes;
  const topRoutes = data.slice(0, 2);
  const bottomRoutes = data.slice(2);

  return (
    <section className={styles.section} aria-label={t("popularRoutes.aria")}>
      <PopularRoutesTitle>{t("popularRoutes.title")}</PopularRoutesTitle>

      <div className={styles.cards}>
        <div className={styles.topRow}>
          {topRoutes.map((r) => {
            const src = r.imageSrc ?? "/placeholder.png";

            return (
              <div key={r.id} className={`${styles.card} ${styles.cardLarge}`}>
                <img className={styles.img} src={src} alt={r.title} />
                <span className={styles.badge}>{r.title}</span>
              </div>
            );
          })}
        </div>

        <div className={styles.bottomGrid}>
          {bottomRoutes.map((r) => {
          const src = r.imageSrc ?? "/placeholder.png";

          return (
            <div key={r.id} className={`${styles.card} ${styles.cardSmall}`}>
              <img className={styles.img} src={src} alt={r.title} />
              <span className={styles.badge}>{r.title}</span>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
