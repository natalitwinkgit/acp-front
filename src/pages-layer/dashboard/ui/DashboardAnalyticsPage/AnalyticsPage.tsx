"use client";

import AnalyticsPageHeader from "@/src/widgets/AdminComp/ui/Header/AnalyticsPageHeader";
import NoShowReport from "@/src/widgets/AdminComp/ui/NoShowReport/NoShowReport";
import FinanceCard from "@/src/widgets/AdminComp/ui/FinanceCard/FinanceCard";
import LoadChart from "@/src/widgets/AdminComp/ui/LoadChart/LoadChart";
import PopularRoutesCard from "@/src/widgets/AdminComp/ui/PopularRoutes/PopularRoutesCard";
import styles from "./analytics.module.css";

export default function AnalyticsPage() {
  return (
    <div className={styles.mainContainer}>
      <AnalyticsPageHeader />
      <div className={styles.grid}>
        <NoShowReport />
        <FinanceCard />
        <LoadChart />
        <PopularRoutesCard />
      </div>
    </div>
  );
}
