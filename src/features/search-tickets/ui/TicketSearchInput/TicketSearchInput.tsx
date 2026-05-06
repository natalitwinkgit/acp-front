"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";
import styles from "./TicketSearchInput.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function TicketSearchInput({
  value,
  onChange,
  placeholder,
}: Props) {
  const { t } = useI18n();
  const resolvedPlaceholder =
    placeholder ?? t("dispatcherArea.tickets.search.placeholder");

  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true" />
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={resolvedPlaceholder}
        aria-label={resolvedPlaceholder}
      />
      {value && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => onChange("")}
          aria-label={t("dispatcherArea.tickets.search.clearAria")}
        />
      )}
    </div>
  );
}
