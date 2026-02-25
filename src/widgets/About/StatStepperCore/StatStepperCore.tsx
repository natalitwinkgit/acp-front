"use client";

import sectionStyles from "./StatStepperCore.module.css";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import StatStepper, { type StepperStat } from "./StatStepper";

export default function AboutCompany() {
  const { t } = useI18n();

  const kmValues = [
    1000, 2550, 5100, 8765, 12345, 22000, 35890, 44444, 49999, 50001,
    68200, 75500, 91000, 100000, 115300, 123456, 150000, 179520, 198000,
    200200, 225000, 248700, 275000, 300000, 314159, 333333, 369800,
    390500, 405000, 420100, 450555, 487600, 500000, 515200, 543210,
    575000, 589999, 595500, 600000,
  ];

  const stepperStats: StepperStat[] = [
    { key: "years", value: 26, step: 1, delayMs: 800, durationMs: 1, stepDelayMs: 70, targetIndex: 25 },
    { key: "passengers", value: 39000, step: 1000, delayMs: 800, durationMs: 1, stepDelayMs: 70, targetIndex: 38 },
    { key: "km", values: kmValues, delayMs: 800, durationMs: 1, stepDelayMs: 70, targetIndex: 38 },
  ];

  const textKeys = ["one", "two", "three", "four"] as const;

  return (
    <section className={sectionStyles.section} aria-label={t("about.ariaLabel")}>
      <div className={sectionStyles.container}>
        <div className={sectionStyles.statsBar}>
          <div className={sectionStyles.statsInner}>
            {stepperStats.map((stat) => (
              <article key={stat.key} className={sectionStyles.statCard}>
                <StatStepper metricKey={stat.key} stat={stat} />
                <div className={sectionStyles.statLabel}>
                  {t(`about.stats.${stat.key}.label`)}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={sectionStyles.textGrid}>
          {textKeys.map((key) => (
            <div key={key} className={sectionStyles.textCard}>
              <p className={sectionStyles.text}>{t(`about.text.${key}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}