"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./AboutCompany.module.css";
import { useI18n } from "@/src/shared/i18n/I18nProvider";

type StatKey = "years" | "passengers" | "km";

type Stat = {
  key: StatKey;

  // option A: value + step (uniform list)
  value?: number;
  step?: number;

  // option B: explicit list (non-uniform like km column)
  values?: number[];

  // timing
  delayMs?: number;      // start delay (After delay)
  durationMs?: number;   // 0 => Instant, >0 => step-by-step
  stepDelayMs?: number;  // delay between rows
  targetIndex?: number;  // where to stop (0-based)
};

const ROW_HEIGHT = 47;

function formatValue(v: number, kind: StatKey) {
  if (kind === "years") return String(v).padStart(2, "0");
  return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function buildNumbers(stat: Stat) {
  if (stat.values && stat.values.length) return stat.values;

  const to = Math.max(0, Math.floor(stat.value ?? 0));
  const step = Math.max(1, Math.floor(stat.step ?? 1));

  const arr: number[] = [];
  for (let x = step; x <= to; x += step) arr.push(x);

  if (arr.length === 0) arr.push(to);
  if (arr[arr.length - 1] !== to) arr.push(to);

  return arr;
}

function OdometerList({
  kind,
  stat,
  startOnView = true,
}: {
  kind: StatKey;
  stat: Stat;
  startOnView?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const [started, setStarted] = useState(!startOnView);
  const [index, setIndex] = useState(0);

  const numbers = useMemo(() => buildNumbers(stat), [stat]);
  const items = useMemo(() => numbers.map((n) => formatValue(n, kind)), [numbers, kind]);

  const lastIndex = Math.max(0, items.length - 1);

  const delayMs = stat.delayMs ?? 800;            // default per your figma
  const durationMs = stat.durationMs ?? 1;        // default: step-by-step
  const stepDelayMs = Math.max(1, stat.stepDelayMs ?? 70);
  const targetIndex = Math.min(lastIndex, Math.max(0, stat.targetIndex ?? lastIndex));

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

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    // start at first row
    setIndex(0);

    timeoutRef.current = window.setTimeout(() => {
      // Instant jump
      if (durationMs === 0) {
        setIndex(targetIndex);
        return;
      }

      // Step-by-step to targetIndex with delay between rows
      intervalRef.current = window.setInterval(() => {
        setIndex((prev) => {
          if (prev >= targetIndex) {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, stepDelayMs);
    }, Math.max(0, delayMs));

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [started, delayMs, durationMs, stepDelayMs, targetIndex]);

  const displayStr = items[index] ?? "";

  return (
    <div
      ref={rootRef}
      className={styles.odometerList}
      aria-label={displayStr}
      style={{ height: `${ROW_HEIGHT}px` }}
    >
      <div
        className={styles.odometerTrack}
        style={{ transform: `translateY(-${index * ROW_HEIGHT}px)` }}
        aria-hidden="true"
      >
        {items.map((txt, i) => (
          <div key={i} className={styles.odometerRow}>
            {txt}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutCompany() {
  const { t } = useI18n();

  // non-uniform km list from your screenshot
  const kmValues = [
    1000, 2550, 5100, 8765, 12345, 22000, 35890, 44444, 49999, 50001,
    68200, 75500, 91000, 100000, 115300, 123456, 150000, 179520, 198000,
    200200, 225000, 248700, 275000, 300000, 314159, 333333, 369800,
    390500, 405000, 420100, 450555, 487600, 500000, 515200, 543210,
    575000, 589999, 595500, 600000,
  ];

  // FULL FIGMA-LIKE SETTINGS:
  // After delay: 800ms
  // Animate: step-by-step
  // Delay between numbers (rows): 70ms (tune this)
  const stats: Stat[] = [
    // years: 01..26 => last index 25
    { key: "years", value: 26, step: 1, delayMs: 800, durationMs: 1, stepDelayMs: 70, targetIndex: 25 },

    // passengers: 1 000..39 000 => 39 rows => last index 38
    { key: "passengers", value: 39000, step: 1000, delayMs: 800, durationMs: 1, stepDelayMs: 70, targetIndex: 38 },

    // km: 39 rows => last index 38
    { key: "km", values: kmValues, delayMs: 800, durationMs: 1, stepDelayMs: 70, targetIndex: 38 },
  ];

  const textKeys = ["one", "two", "three", "four"] as const;

  return (
    <section className={styles.section} id="about" aria-label={t("about.ariaLabel")}>
      <h2 className={styles.title}>{t("about.title")}</h2>

      <div className={styles.container}>
        <div className={styles.statsBar}>
          {stats.map((s) => (
            <article key={s.key} className={styles.statCard}>
              <OdometerList kind={s.key} stat={s} />
              <div className={styles.statLabel}>{t(`about.stats.${s.key}.label`)}</div>
            </article>
          ))}
        </div>

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