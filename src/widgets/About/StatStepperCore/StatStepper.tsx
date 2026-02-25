"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./StatStepperCore.module.css";
export type StepperMetricKey = "years" | "passengers" | "km";

export type StepperStat = {
  key: StepperMetricKey;
  value?: number;
  step?: number;
  values?: number[];
  delayMs?: number;
  durationMs?: number;
  stepDelayMs?: number;
  targetIndex?: number;
};

const STEPPER_ROW_HEIGHT = 47;

function formatValue(value: number, metricKey: StepperMetricKey) {
  if (metricKey === "years") return String(value).padStart(2, "0");
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function buildStepValues(stat: StepperStat) {
  if (stat.values && stat.values.length) return stat.values;

  const to = Math.max(0, Math.floor(stat.value ?? 0));
  const step = Math.max(1, Math.floor(stat.step ?? 1));

  const values: number[] = [];
  for (let current = step; current <= to; current += step) values.push(current);

  if (values.length === 0) values.push(to);
  if (values[values.length - 1] !== to) values.push(to);

  return values;
}

type StatStepperProps = {
  metricKey: StepperMetricKey;
  stat: StepperStat;
  startOnView?: boolean;
};

export default function StatStepper({ metricKey, stat, startOnView = true }: StatStepperProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const [started, setStarted] = useState(!startOnView);
  const [index, setIndex] = useState(0);

  const numbers = useMemo(() => buildStepValues(stat), [stat]);
  const labels = useMemo(() => numbers.map((n) => formatValue(n, metricKey)), [numbers, metricKey]);
  const lastIndex = Math.max(0, labels.length - 1);

  const delayMs = stat.delayMs ?? 800;
  const durationMs = stat.durationMs ?? 1;
  const stepDelayMs = Math.max(1, stat.stepDelayMs ?? 70);
  const targetIndex = Math.min(lastIndex, Math.max(0, stat.targetIndex ?? lastIndex));

  useEffect(() => {
    if (!startOnView) return;
    const element = rootRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setIndex(0);

      if (durationMs === 0) {
        setIndex(targetIndex);
        return;
      }

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

  const currentLabel = labels[index] ?? "";

  return (
    <div
      ref={rootRef}
      className={styles.stepperViewport}
      aria-label={currentLabel}
      style={{ height: `${STEPPER_ROW_HEIGHT}px` }}
    >
      <div
        className={styles.stepperTrack}
        style={{ transform: `translateY(-${index * STEPPER_ROW_HEIGHT}px)` }}
        aria-hidden="true"
      >
        {labels.map((text, i) => (
          <div key={i} className={styles.stepperRow}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
