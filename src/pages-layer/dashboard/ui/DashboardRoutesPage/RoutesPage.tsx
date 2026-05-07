import RoutesPageHeader from "@/src/widgets/AdminComp/ui/Header/RoutesPageHeader";
import RoutesStats from "@/src/widgets/AdminComp/ui/Header/RoutesStats";
import styles from "./routes.module.css";
import RoutesTable from "@/src/widgets/AdminComp/ui/RoutesTable";

export default function DashboardRoutesPage() {
  return (
    <div className={styles.mainContainer}>
      <RoutesPageHeader />
      <RoutesStats total={11} boarding={2} departed={4} cancelled={1} />
      <RoutesTable />
    </div>
  );
}
