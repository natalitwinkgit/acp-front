"use client";

import { useCountdown } from "../../model/useCountdown";
import styles from "./TicketTimer.module.css";

/** Timers at or below this threshold are shown in red */
const URGENT_THRESHOLD_SECONDS = 360; // 6 minutes

type Props = {
  initialSeconds: number | null;
};

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function TicketTimer({ initialSeconds }: Props) {
  const seconds = useCountdown(initialSeconds);

  if (seconds === null) {
    return <span className={styles.none} aria-label="Таймер відсутній">—</span>;
  }

  const isUrgent = seconds <= URGENT_THRESHOLD_SECONDS;

  return (
    <span
      className={[styles.timer, isUrgent ? styles.urgent : styles.normal].join(" ")}
      role="timer"
      aria-live="off"
    >
      {formatTime(seconds)}
    </span>
  );
}
