import type { Trip } from "@/src/shared/api";

import styles from "../BookingForm.module.css";
import { formatTripTime } from "../../lib/bookingForm.utils";

type TripTimeSelectProps = {
  value: string;
  options: Trip[];
  locale: string;
  placeholder: string;
  disabled: boolean;
  onChange: (value: string) => void;
};

export default function TripTimeSelect({
  value,
  options,
  locale,
  placeholder,
  disabled,
  onChange,
}: TripTimeSelectProps) {
  return (
    <select
      className={`${styles.control} ${styles.select}`}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((trip) => (
        <option key={trip.id} value={trip.id}>
          {formatTripTime(trip, locale)}
        </option>
      ))}
    </select>
  );
}
