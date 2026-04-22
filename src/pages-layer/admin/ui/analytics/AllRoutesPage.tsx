"use client";

import { useState } from "react";
import {
  AdminCard,
  AdminTable,
  AdminThead,
  AdminTr,
  adminTableStyles,
  countPages,
  paginateItems,
  TablePagination,
  useI18n,
} from "@/src/shared";
import AllRoutesAnalyticsHeader from "@/src/widgets/AdminComp/ui/Header/AllRoutesAnalyticsHeader";
import styles from "./admin-analytics.module.css";

type AllRouteRow = {
  id: number;
  direction: string;
  tripsPerDay: number;
  ticketsSold: number;
  load: string;
  income: string;
  redemptionRate: string;
};

const mockAllRoutes: AllRouteRow[] = [
  {
    id: 1,
    direction: "м.Черкаси - м.Київ (ст.м.Харківська)",
    tripsPerDay: 16,
    ticketsSold: 240,
    load: "82%",
    income: "120 000 ₴",
    redemptionRate: "92%",
  },
  {
    id: 2,
    direction: "м.Черкаси - м.Київ (ст.м.Чернігівська)",
    tripsPerDay: 16,
    ticketsSold: 180,
    load: "70%",
    income: "90 000 ₴",
    redemptionRate: "76%",
  },
  {
    id: 3,
    direction: "м.Золотоноша - м.Київ",
    tripsPerDay: 16,
    ticketsSold: 80,
    load: "52%",
    income: "32 000 ₴",
    redemptionRate: "42%",
  },
  {
    id: 4,
    direction: "м.Кременчук - м.Черкаси",
    tripsPerDay: 2,
    ticketsSold: 18,
    load: "68%",
    income: "17 100 ₴",
    redemptionRate: "96%",
  },
  {
    id: 5,
    direction: "м.Черкаси - м.Харків",
    tripsPerDay: 2,
    ticketsSold: 12,
    load: "40%",
    income: "11 400 ₴",
    redemptionRate: "81%",
  },
  {
    id: 6,
    direction: "м.Градизьк - м.Черкаси",
    tripsPerDay: 2,
    ticketsSold: 8,
    load: "12%",
    income: "1 600 ₴",
    redemptionRate: "76%",
  },
  {
    id: 7,
    direction: "м.Черкаси - с.Софіївка",
    tripsPerDay: 2,
    ticketsSold: 4,
    load: "8%",
    income: "11 400 ₴",
    redemptionRate: "65%",
  },
];

export default function AllRoutesPage() {
  const { t } = useI18n();
  const [page, setPage] = useState(1);
  const totalPages = countPages(mockAllRoutes.length, 15);
  const paginatedRows = paginateItems(mockAllRoutes, page);

  return (
    <div className={styles.mainContainer}>
      <AllRoutesAnalyticsHeader />
      <AdminCard>
        <div className={styles.header}>
          <span className={styles.title}>
            {t("dispatcherArea.routes.table.title")}
          </span>
        </div>
        <AdminTable>
          <AdminThead>
            <th className={adminTableStyles.thNum}>
              {t("dispatcherArea.analytics.allRoutesPage.columns.number")}
            </th>
            <th className={adminTableStyles.thLeft}>
              {t("dispatcherArea.analytics.allRoutesPage.columns.direction")}
            </th>
            <th className={adminTableStyles.th}>
              {t("dispatcherArea.analytics.allRoutesPage.columns.tripsPerDay")}
            </th>
            <th className={adminTableStyles.th}>
              {t("dispatcherArea.analytics.allRoutesPage.columns.ticketsSold")}
            </th>
            <th className={adminTableStyles.th}>
              {t("dispatcherArea.analytics.allRoutesPage.columns.load")}
            </th>
            <th className={adminTableStyles.th}>
              {t("dispatcherArea.analytics.allRoutesPage.columns.income")}
            </th>
            <th className={adminTableStyles.th}>
              {t(
                "dispatcherArea.analytics.allRoutesPage.columns.redemptionRate",
              )}
            </th>
          </AdminThead>
          <tbody>
            {paginatedRows.map((row, index) => {
              return (
                <AdminTr key={row.id} className={styles.clickableRow}>
                  <td className={adminTableStyles.tdNum}>
                    {(page - 1) * 10 + index + 1}
                  </td>
                  <td
                    className={`${adminTableStyles.td} ${adminTableStyles.tdLeft}`}
                  >
                    {row.direction}
                  </td>
                  <td className={adminTableStyles.td}>{row.tripsPerDay}</td>
                  <td className={adminTableStyles.td}>{row.ticketsSold}</td>
                  <td className={adminTableStyles.td}>{row.load}</td>
                  <td className={adminTableStyles.td}>{row.income}</td>
                  <td className={adminTableStyles.td}>{row.redemptionRate}</td>
                </AdminTr>
              );
            })}
          </tbody>
        </AdminTable>
        <TablePagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          prevAriaLabel={t("dispatcherArea.routes.table.pagination.prev")}
          nextAriaLabel={t("dispatcherArea.routes.table.pagination.next")}
        />
      </AdminCard>
    </div>
  );
}
