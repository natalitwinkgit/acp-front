"use client";

import styles from "./PopularRoutes.module.css";
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
  { id: "1", title: "Черкаси–Київ" },
  { id: "2", title: "Київ (ст. м. Харківська)–Черкаси" },
  { id: "3", title: "Київ (ст. м. Чернігівська)–Черкаси" },
  { id: "4", title: "Київ–Черкаси" },
  { id: "5", title: "Київ–Черкаси" },
  { id: "6", title: "Черкаси–Київ–Чернігів" },
  { id: "7", title: "Черкаси–Харків" },
  { id: "8", title: "Черкаси–Полтава–Харків" },
  { id: "9", title: "Черкаси–Полтава–Харків" },
  { id: "10", title: "Черкаси–Полтава–Харків" },
  { id: "11", title: "Черкаси–Полтава–Харків" },
  { id: "12", title: "Черкаси–Полтава–Харків" },
    { id: "13", title: "Черкаси–Полтава–Харків" }
  
];

export default function PopularRoutes({ routes }: Props) {
  const { t } = useI18n();
  const data = routes?.length ? routes : fallbackRoutes;

  return (
    <section className={styles.section} aria-label={t("popularRoutes.aria")}>
      <h2 className={styles.title}>{t("popularRoutes.title")}</h2>

      <div className={styles.grid}>
        {data.map((r, idx) => {
          const src = r.imageSrc ?? "/placeholder.png";

          return (
            <a
              key={r.id}
              href="/routes"
              className={`${styles.card} ${idx === 0 ? styles.featured : ""}`}
            >
              <img className={styles.img} src={src} alt={r.title} />
              <span className={styles.badge}>{r.title}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
