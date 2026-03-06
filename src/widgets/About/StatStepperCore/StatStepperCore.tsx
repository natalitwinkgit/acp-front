"use client";

import sectionStyles from "./StatStepperCore.module.css";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import StatStepper, { type StepperStat } from "./StatStepper";

export default function AboutCompany() {
  const { t } = useI18n();

  const yearValues = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  ];

  const passengerValues = [
    1000, 5892, 12431, 25700, 48115, 73954, 99001, 125600, 189432, 231777, 298000,
    354123, 412888, 476543, 532901, 605222, 687444, 741000, 812333, 865789, 910500,
    932111, 958005, 982432, 990777, 1000000,
  ];

  const kmValues = [
    1000000, 1560000, 2123456, 2890111, 3335280, 3750000, 4200800, 4912345, 5555555,
    6120444, 6789000, 7450123, 8000000, 8654321, 9111222, 9989786, 10500000, 11234567,
    11888999, 12345678, 13000500, 13678910, 14120000, 14555666, 14890000, 15000000,
  ];

  const yearsTarget = yearValues.length - 1;
  const passengersTarget = passengerValues.length - 1;
  const kmTarget = kmValues.length - 1;

  const stepperStats: StepperStat[] = [
    { key: "years", values: yearValues, delayMs: 800, durationMs: 1, stepDelayMs: 70, targetIndex: yearsTarget },
    { key: "passengers", values: passengerValues, delayMs: 800, durationMs: 1, stepDelayMs: 70, targetIndex: passengersTarget },
    { key: "km", values: kmValues, delayMs: 800, durationMs: 1, stepDelayMs: 70, targetIndex: kmTarget },
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
