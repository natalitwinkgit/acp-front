import styles from "@/src/pages-layer/auth/ui/auth-page.module.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.page}>{children}</div>;
}
