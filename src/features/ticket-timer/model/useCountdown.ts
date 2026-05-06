import { useEffect, useState } from "react";

/**
 * Counts down from `initialSeconds`. Returns current remaining seconds.
 * Returns null if no timer is needed (initialSeconds is null).
 */
export function useCountdown(initialSeconds: number | null): number | null {
  const [seconds, setSeconds] = useState<number | null>(initialSeconds);

  useEffect(() => {
    const set = () => {
      setSeconds(initialSeconds);
    };

    set();
    if (initialSeconds === null || initialSeconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialSeconds]);

  return seconds;
}
