"use client";

import { useEffect, useRef } from "react";
import styles from "./Services.module.css";
import { useI18n } from "@/src/shared/i18n/I18nProvider";

type Card = {
  key: string;
  icon: string; 
};

const cards: Card[] = [
  { key: "passenger", icon: "/icons/Services/passenger transport icon.svg" },
  { key: "groupTransfer", icon: "/icons/Services/group transfer icon.svg" },
  { key: "excursions", icon: "/icons/Services/bus rental for excursions icon.svg" },
  { key: "seaTours", icon: "/icons/Services/sea __tours icon.svg" },
  { key: "schoolBus", icon: "/icons/Services/school bus Icon.svg" },
  { key: "corporate", icon: "/icons/Services/corporate travel icon.svg" },
  { key: "wedding", icon: "/icons/Services/bus to the wedding icon.svg" },
  { key: "pilgrimage", icon: "/icons/Services/pilgrimage tours icon.svg" },
  { key: "mourning", icon: "/icons/Services/mourning bus rental icon.svg" },
];

export default function Services() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const items = Array.from(
      section.querySelectorAll<HTMLElement>(`[data-service-card="1"]`)
    );

    
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          section.classList.add(styles.inView);
          items.forEach((el, i) => el.style.setProperty("--i", String(i)));
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    io.observe(section);

    if (reduce) return () => io.disconnect();

    
    const onMove = (ev: PointerEvent) => {
      const card = ev.currentTarget as HTMLElement;
      const r = card.getBoundingClientRect();

      const x = (ev.clientX - r.left) / r.width - 0.5; 
      const y = (ev.clientY - r.top) / r.height - 0.5;

      const tx = x * 6; 
      const ty = y * 6;

      card.style.setProperty("--mx", `${tx.toFixed(2)}px`);
      card.style.setProperty("--my", `${ty.toFixed(2)}px`);
    };

    const onEnter = (ev: PointerEvent) => {
      (ev.currentTarget as HTMLElement).classList.add(styles.isHover);
    };

    const onLeave = (ev: PointerEvent) => {
      const card = ev.currentTarget as HTMLElement;
      card.classList.remove(styles.isHover);
      card.style.setProperty("--mx", "0px");
      card.style.setProperty("--my", "0px");
    };

    items.forEach((el) => {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
    });

    return () => {
      io.disconnect();
      items.forEach((el) => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label={t("services.ariaLabel")}>
      <h2 className={styles.title}>{t("services.title")}</h2>

      <div className={styles.grid}>
        {cards.map((c, idx) => (
          <article
            key={c.key}
            className={styles.card}
            data-service-card="1"
            style={{ ["--i" as any]: idx }}
          >
            <div className={styles.iconWrap} aria-hidden="true">
              <img
                className={styles.icon}
                src={encodeURI(c.icon)}
                alt=""
                width={40}
                height={40}
              />
            </div>

            <div className={styles.textCol}>
              <div className={styles.cardTitle}>{t(`services.cards.${c.key}.title`)}</div>
              <div className={styles.cardDesc}>{t(`services.cards.${c.key}.desc`)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
