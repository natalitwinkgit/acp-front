import type { CSSProperties } from "react";
import styles from "./Icon.module.css";

type Props = {
  src: string;
  size?: number;
};

export default function Icon({ src, size = 20 }: Props) {
  return (
    <span
      className={styles.icon}
      style={
        {
          "--icon-src": `url("${src}")`,
          width: `${size}px`,
          height: `${size}px`,
        } as CSSProperties
      }
      aria-hidden="true"
    />
  );
}
