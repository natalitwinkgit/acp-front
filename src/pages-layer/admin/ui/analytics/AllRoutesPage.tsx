"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AdminCard,
  AdminTable,
  AdminThead,
  AdminTr,
  adminTableStyles,
  DEFAULT_TABLE_PAGE_SIZE,
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

  return (
    <div className={styles.mainContainer}>
      <AllRoutesAnalyticsHeader />
      <div ref={cardRef} className={styles.routesCard}>
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
                        className={styles.clickableRow}
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
    </div>
  );
}
