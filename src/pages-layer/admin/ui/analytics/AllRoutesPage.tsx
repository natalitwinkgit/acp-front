"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import RouteAnalyticsDetails from "./RouteAnalyticsDetails";
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

type TrendPoint = {
  dayKey:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  value: number;
};

type TicketStatKey = "reserved" | "purchased" | "cancelled";

type RouteAnalyticsDetail = {
  trend: TrendPoint[];
  ticketStats: Record<TicketStatKey, number>;
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

const ROUTE_ANALYTICS_DETAILS: Record<number, RouteAnalyticsDetail> = {
  1: {
    trend: [
      { dayKey: "monday", value: 10 },
      { dayKey: "tuesday", value: 200 },
      { dayKey: "wednesday", value: 110 },
      { dayKey: "thursday", value: 130 },
      { dayKey: "friday", value: 310 },
      { dayKey: "saturday", value: 75 },
      { dayKey: "sunday", value: 220 },
    ],
    ticketStats: { reserved: 240, purchased: 180, cancelled: 60 },
  },
  2: {
    trend: [
      { dayKey: "monday", value: 25 },
      { dayKey: "tuesday", value: 160 },
      { dayKey: "wednesday", value: 145 },
      { dayKey: "thursday", value: 170 },
      { dayKey: "friday", value: 220 },
      { dayKey: "saturday", value: 95 },
      { dayKey: "sunday", value: 185 },
    ],
    ticketStats: { reserved: 180, purchased: 137, cancelled: 43 },
  },
  3: {
    trend: [
      { dayKey: "monday", value: 15 },
      { dayKey: "tuesday", value: 60 },
      { dayKey: "wednesday", value: 90 },
      { dayKey: "thursday", value: 120 },
      { dayKey: "friday", value: 165 },
      { dayKey: "saturday", value: 75 },
      { dayKey: "sunday", value: 105 },
    ],
    ticketStats: { reserved: 80, purchased: 55, cancelled: 25 },
  },
  4: {
    trend: [
      { dayKey: "monday", value: 8 },
      { dayKey: "tuesday", value: 12 },
      { dayKey: "wednesday", value: 18 },
      { dayKey: "thursday", value: 14 },
      { dayKey: "friday", value: 26 },
      { dayKey: "saturday", value: 9 },
      { dayKey: "sunday", value: 21 },
    ],
    ticketStats: { reserved: 18, purchased: 14, cancelled: 4 },
  },
  5: {
    trend: [
      { dayKey: "monday", value: 7 },
      { dayKey: "tuesday", value: 20 },
      { dayKey: "wednesday", value: 16 },
      { dayKey: "thursday", value: 22 },
      { dayKey: "friday", value: 29 },
      { dayKey: "saturday", value: 10 },
      { dayKey: "sunday", value: 18 },
    ],
    ticketStats: { reserved: 12, purchased: 9, cancelled: 3 },
  },
  6: {
    trend: [
      { dayKey: "monday", value: 2 },
      { dayKey: "tuesday", value: 6 },
      { dayKey: "wednesday", value: 4 },
      { dayKey: "thursday", value: 7 },
      { dayKey: "friday", value: 10 },
      { dayKey: "saturday", value: 3 },
      { dayKey: "sunday", value: 8 },
    ],
    ticketStats: { reserved: 8, purchased: 6, cancelled: 2 },
  },
  7: {
    trend: [
      { dayKey: "monday", value: 1 },
      { dayKey: "tuesday", value: 3 },
      { dayKey: "wednesday", value: 2 },
      { dayKey: "thursday", value: 4 },
      { dayKey: "friday", value: 6 },
      { dayKey: "saturday", value: 3 },
      { dayKey: "sunday", value: 5 },
    ],
    ticketStats: { reserved: 4, purchased: 3, cancelled: 1 },
  },
};

export default function AllRoutesPage() {
  const { t } = useI18n();
  const [page, setPage] = useState(1);
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const tableAreaRef = useRef<HTMLDivElement | null>(null);
  const tableScrollRef = useRef<HTMLDivElement | null>(null);
  const theadRef = useRef<HTMLTableRowElement | null>(null);
  const firstRowRef = useRef<HTMLTableRowElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [availableRowsHeight, setAvailableRowsHeight] = useState()
  const [measurements, setMeasurements] = useState({
    cardHeight: 0,
    headerHeight: 0,
    tableAreaHeight: 0,
    tableScrollHeight: 0,
    theadHeight: 0,
    rowHeight: 0,
    paginationHeight: 0,
  });

  useLayoutEffect(() => {
    const measureTableLayout = () => {
      const tableAreaHeight =
        tableAreaRef.current?.getBoundingClientRect().height ?? 0;
      const theadHeight = theadRef.current?.getBoundingClientRect().height ?? 0;
      const rowHeight =
        firstRowRef.current?.getBoundingClientRect().height ?? 0;

      const availableRowsHeight = Math.max(tableAreaHeight - theadHeight, 0);

      if (rowHeight > 0) {
        const nextRowsPerPage = Math.max(
          1,
          Math.floor(availableRowsHeight / rowHeight),
        );

        setRowsPerPage((prev) =>
          prev === nextRowsPerPage ? prev : nextRowsPerPage,
        );
      }

      setMeasurements({
        cardHeight: cardRef.current?.clientHeight ?? 0,
        headerHeight: headerRef.current?.getBoundingClientRect().height ?? 0,
        tableAreaHeight:
          tableAreaRef.current?.getBoundingClientRect().height ?? 0,
        tableScrollHeight:
          tableScrollRef.current?.getBoundingClientRect().height ?? 0,
        theadHeight: theadRef.current?.getBoundingClientRect().height ?? 0,
        rowHeight: firstRowRef.current?.getBoundingClientRect().height ?? 0,
        paginationHeight:
          paginationRef.current?.getBoundingClientRect().height ?? 0,
      });
    };

    measureTableLayout();

    const observer = new ResizeObserver(() => {
      measureTableLayout();
    });

    if (cardRef.current) observer.observe(cardRef.current);
    if (tableAreaRef.current) observer.observe(tableAreaRef.current);

    return () => observer.disconnect();
    // const totalPages = countPages(mockAllRoutes.length, rowsPerPage);
  }, []);

  useEffect(() => {
    const newTotalPages = Math.max(
      1,
      countPages(mockAllRoutes.length, rowsPerPage),
    );
    const set = () => {
      setPage((prevPage) => Math.min(prevPage, newTotalPages));
    };
    set();
  }, [rowsPerPage]);

  const {
    cardHeight,
    headerHeight,
    tableAreaHeight,
    tableScrollHeight,
    theadHeight,
    rowHeight,
    paginationHeight,
  } = measurements;

  const availableRowsHeight = Math.max(tableAreaHeight - theadHeight, 0);
  const totalPages = countPages(mockAllRoutes.length, rowsPerPage);
  const paginatedRows = paginateItems(mockAllRoutes, page, rowsPerPage);
  const selectedRoute =
    mockAllRoutes.find((route) => route.id === selectedRouteId) ?? null;
  const selectedRouteDetails = selectedRoute
    ? ROUTE_ANALYTICS_DETAILS[selectedRoute.id]
    : null;
  const trendChartData =
    selectedRouteDetails?.trend.map((point) => ({
      dayLabel: t(
        `dispatcherArea.analytics.allRoutesPage.details.days.${point.dayKey}`,
      ),
      value: point.value,
    })) ?? [];
  const ticketStatsData = selectedRouteDetails
    ? (
        Object.entries(selectedRouteDetails.ticketStats) as [
          TicketStatKey,
          number,
        ][]
      ).map(([key, value]) => ({
        key,
        value,
        label: t(`dispatcherArea.analytics.allRoutesPage.details.stats.${key}`),
      }))
    : [];

  return (
    <div className={styles.mainContainer}>
      <AllRoutesAnalyticsHeader />
      <div
        ref={cardRef}
        className={`${styles.routesCard} ${selectedRoute ? styles.routesCardCompact : ""}`}
      >
        <AdminCard className={styles.routesCardInner}>
          <div ref={headerRef} className={styles.header}>
            <span className={styles.title}>
              {t("dispatcherArea.routes.table.title")}
            </span>
          </div>
          <div ref={tableAreaRef} className={styles.tableArea}>
            <div ref={tableScrollRef} className={styles.tableScroll}>
              <AdminTable>
                <AdminThead ref={theadRef}>
                  <th className={adminTableStyles.thNum}>
                    {t("dispatcherArea.analytics.allRoutesPage.columns.number")}
                  </th>
                  <th className={adminTableStyles.thLeft}>
                    {t(
                      "dispatcherArea.analytics.allRoutesPage.columns.direction",
                    )}
                  </th>
                  <th className={adminTableStyles.th}>
                    {t(
                      "dispatcherArea.analytics.allRoutesPage.columns.tripsPerDay",
                    )}
                  </th>
                  <th className={adminTableStyles.th}>
                    {t(
                      "dispatcherArea.analytics.allRoutesPage.columns.ticketsSold",
                    )}
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
                      <AdminTr
                        ref={index === 0 ? firstRowRef : undefined}
                        key={row.id}
                        className={`${styles.clickableRow} ${
                          selectedRouteId === row.id ? styles.selectedRow : ""
                        }`}
                        onClick={() => setSelectedRouteId(row.id)}
                      >
                        <td className={adminTableStyles.tdNum}>
                          {(page - 1) * rowsPerPage + index + 1}
                        </td>
                        <td
                          className={`${adminTableStyles.td} ${adminTableStyles.tdLeft}`}
                        >
                          {row.direction}
                        </td>
                        <td className={adminTableStyles.td}>
                          {row.tripsPerDay}
                        </td>
                        <td className={adminTableStyles.td}>
                          {row.ticketsSold}
                        </td>
                        <td className={adminTableStyles.td}>{row.load}</td>
                        <td className={adminTableStyles.td}>{row.income}</td>
                        <td className={adminTableStyles.td}>
                          {row.redemptionRate}
                        </td>
                      </AdminTr>
                    );
                  })}
                </tbody>
              </AdminTable>
            </div>
          </div>
          <div ref={paginationRef}>
            <TablePagination
              className={styles.pagination}
              data-card-height={cardHeight}
              data-header-height={headerHeight}
              data-table-area-height={tableAreaHeight}
              data-table-scroll-height={tableScrollHeight}
              data-thead-height={theadHeight}
              data-row-height={rowHeight}
              data-pagination-height={paginationHeight}
              data-available-rows-height={availableRowsHeight}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              prevAriaLabel={t("dispatcherArea.routes.table.pagination.prev")}
              nextAriaLabel={t("dispatcherArea.routes.table.pagination.next")}
            />
          </div>
        </AdminCard>
      </div>
      {selectedRoute && selectedRouteDetails && (
        <div className={styles.grid}>
          <RouteAnalyticsDetails
            routeTitle={selectedRoute.direction}
            statisticsTitle={t(
              "dispatcherArea.analytics.allRoutesPage.details.statisticsTitle",
            )}
            trendTitle={t(
              "dispatcherArea.analytics.allRoutesPage.details.dynamicsTitle",
            )}
            trendChartData={trendChartData}
            ticketStatsData={ticketStatsData}
          />
        </div>
      )}
    </div>
  );
}
