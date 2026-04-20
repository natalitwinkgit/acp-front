"use client";

import AnalyticsPageHeader from "@/src/widgets/AdminComp/ui/Header/AnalyticsPageHeader";
import NoShowReport from "@/src/widgets/AdminComp/ui/NoShowReport";
import FinanceCard from "@/src/widgets/AdminComp/ui/FinanceCard";
import LoadChart from "@/src/widgets/AdminComp/ui/LoadChart";
import PopularRoutesCard from "@/src/widgets/AdminComp/ui/PopularRoutesCard";
import styles from "./admin-analytics.module.css";

export default function AdminAnalyticsPage() {
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
