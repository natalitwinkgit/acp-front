import styles from "../BookingForm.module.css";
import { SEAT_OPTIONS } from "../../model/types";

type SeatsSelectProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export default function SeatsSelect({ value, placeholder, onChange }: SeatsSelectProps) {
  return (
    <select
      className={`${styles.controlHalf} ${styles.select}`}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {SEAT_OPTIONS.map((seatOption) => (
        <option key={seatOption} value={seatOption}>
          {seatOption}
        </option>
      ))}
    </select>
  );
}
