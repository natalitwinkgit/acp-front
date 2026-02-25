import styles from "./PopularRoutesTitle.module.css";

type Props = {
  children: string;
};

export default function PopularRoutesTitle({ children }: Props) {
  return <h2 className={styles.title}>{children}</h2>;
}
