"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./AboutCompany.module.css";
import { useI18n } from "@/src/shared/i18n/I18nProvider";

type Stat = {
  key: "years" | "passengers" | "km";
  value: number;
  step?: number;
};


function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}


function formatDisplay(value: number, kind: Stat["key"]) {
  if (kind === "years") return String(Math.max(0, Math.round(value))).padStart(2, "0");
  const v = Math.max(0, Math.round(value));
  return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function toChars(str: string) {
  return str.split("");
}


const DIGIT_HEIGHT = 47;

function Odometer({
  value,
  kind,
  step = 1,
  durationMs = 1500,
  startOnView = true,
}: {
  value: number;
  kind: Stat["key"];
  step?: number;
  durationMs?: number;
  startOnView?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [started, setStarted] = useState(!startOnView);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!startOnView) return;
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    const from = 0;
    const to = value;
    const t0 = performance.now();

    const tick = (now: number) => {
      const elapsed = now - t0;
      const t = Math.min(1, elapsed / durationMs);
      
      if (step > 1) {
        // Discrete stepping: calculate which step we're on
        const totalSteps = Math.ceil(to / step);
        const stepDelay = durationMs / totalSteps;
        const currentStep = Math.floor(elapsed / stepDelay);
        let animatedValue = Math.min(currentStep * step, to);
        setCurrent(animatedValue);
      } else {
        // Smooth animation
        const k = easeOutCubic(t);
        let animatedValue = from + (to - from) * k;
        setCurrent(animatedValue);
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCurrent(to); 
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [started, value, durationMs, step]);

  const displayStr = useMemo(() => formatDisplay(current, kind), [current, kind]);
  const chars = useMemo(() => toChars(displayStr), [displayStr]);

  return (
    <div 
      ref={rootRef} 
      className={styles.odometer} 
      aria-label={displayStr}
      style={{ height: `${DIGIT_HEIGHT}px` }}
    >
      {chars.map((ch, idx) => {
        
        if (ch === " ") {
          return <span key={`sp-${idx}`} className={styles.space} aria-hidden="true" />;
        }

        
        const digit = ch >= "0" && ch <= "9" ? Number(ch) : 0;

        return (
          <span key={`d-${idx}`} className={styles.digitCol} aria-hidden="true">
            <span
              className={styles.digitStack}
              
              style={{ transform: `translateY(-${digit * DIGIT_HEIGHT}px)` }}
            >
              {Array.from({ length: 10 }).map((_, n) => (
                <span key={n} className={styles.digit}>
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function AboutCompany() {
  const { t } = useI18n();

  const stats: Stat[] = [
    { key: "years", value: 26, step: 1 },
    { key: "passengers", value: 39000, step: 1000 },
    { key: "km", value: 600000, step: 1000 },
  ];

  
  const textKeys = ["one", "two", "three", "four"] as const;

  return (
    <section className={styles.section} id="about" aria-label={t("about.ariaLabel")}>
      <h2 className={styles.title}>{t("about.title")}</h2>

      <div className={styles.container}>
        {}
        <div className={styles.statsBar}>
          {stats.map((s) => (
            <article key={s.key} className={styles.statCard}>
              <Odometer value={s.value} kind={s.key} step={s.step || 1} />
              <div className={styles.statLabel}>
                {t(`about.stats.${s.key}.label`)}
              </div>
            </article>
          ))}
        </div>

        {}
        <div className={styles.textGrid}>
          {textKeys.map((k) => (
            <div key={k} className={styles.textCard}>
              <p className={styles.text}>{t(`about.text.${k}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
