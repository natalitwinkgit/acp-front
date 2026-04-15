import RoutesPageHeader from "@/src/widgets/AdminComp/ui/RoutesPageHeader";
import RoutesStats from "@/src/widgets/AdminComp/ui/RoutesStats";
import styles from "./admin-routes.module.css";

export default function AdminRoutesPage() {
  return (
    <div className={styles.mainContainer}>
      <RoutesPageHeader />
      <RoutesStats total={11} boarding={2} departed={4} cancelled={1} />
    </div>
  );
}
