"use client";

import NoShowReport from "@/src/widgets/AdminComp/ui/NoShowReport/NoShowReport";
import FinanceCard from "@/src/widgets/AdminComp/ui/FinanceCard/FinanceCard";
import LoadChart from "@/src/widgets/AdminComp/ui/LoadChart/LoadChart";
import PopularRoutesCard from "@/src/widgets/AdminComp/ui/PopularRoutes/PopularRoutesCard";
import styles from "./admin-analytics.module.css";
import AllRoutesAnalyticsHeader from "@/src/widgets/AdminComp/ui/Header/AllRoutesAnalyticsHeader";

export default function AllRoutesPage() {
  return (
    <div className={styles.mainContainer}>
      <AllRoutesAnalyticsHeader />
      <div className={styles.grid}>
        <NoShowReport />
        <FinanceCard />
        <LoadChart />
        <PopularRoutesCard />
      </div>
    </div>
  );
}
