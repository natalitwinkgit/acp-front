"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import SurfacePanel from "@/src/shared/ui/SurfacePanel/SurfacePanel";
import styles from "./not-found.module.css";

export default function NotFoundPageContent() {
  const { t } = useI18n();

  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <SurfacePanel className={styles.card}>
        <h1 id="not-found-title" className={styles.srOnly}>
          {t("notFound.title")}
        </h1>

        <div className={styles.stack}>
          <div className={styles.figureWrap}>
            <Image
              src="/icons/404_page/Map.svg"
              alt={t("notFound.imageAlt")}
              width={360}
              height={360}
              className={styles.figure}
              unoptimized
              priority
            />
          </div>

          <div className={styles.content}>
            <p className={styles.description}>{t("notFound.description")}</p>

            <Link href="/" className={styles.button}>
              {t("notFound.button")}
            </Link>
          </div>
        </div>
      </SurfacePanel>
    </section>
  );
}