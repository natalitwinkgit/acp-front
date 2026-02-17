// Footer.tsx
"use client";

import styles from "./Footer.module.css";
import { useI18n } from "@/src/shared/i18n/I18nProvider";

const MAP_QUERY = "вулиця Митницька, 7, Черкаси, Черкаська область, 18000";

export default function Footer() {
  const { t } = useI18n();

  const src = `https://www.google.com/maps?q=${encodeURIComponent(
    MAP_QUERY
  )}&output=embed`;

  return (
    <footer
      className={styles.footer}
      id="contacts"
      aria-label={t("footer.ariaLabel")}
    >
      <div className={styles.container}>
        <div className={styles.contacts}>
          {/* Work time */}
          <div className={styles.contactItem}>
            <img
              className={styles.contactIcon}
              src="/icons/Footer/clock.svg"
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
            />
            <div className={styles.contactTextCol}>
              <div className={styles.contactText}>{t("footer.workTime")}</div>
            </div>
          </div>

          {/* Phones */}
          <div className={styles.contactItem}>
            <img
              className={styles.contactIcon}
              src="/icons/Footer/phone.svg"
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
            />
            <div className={styles.contactTextCol}>
              <a className={styles.contactLink} href="tel:+380674651016">
                +38067 465 10 16
              </a>
              <a className={styles.contactLink} href="tel:+380966062200">
                +38096 606 22 00
              </a>
            </div>
          </div>

          {/* Address */}
          <div className={styles.contactItem}>
            <img
              className={styles.contactIcon}
              src="/icons/Footer/map-point.svg"
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
            />
            <div className={styles.contactTextCol}>
              <div className={styles.contactText}>{t("footer.addressLine1")}</div>
              <div className={styles.contactTextMuted}>
                {t("footer.addressLine2")}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className={styles.contactItem}>
            <img
              className={styles.contactIcon}
              src="/icons/Footer/email.svg"
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
            />
            <div className={styles.contactTextCol}>
              <a className={styles.contactLink} href="mailto:info@autolux.ck.ua">
                {t("footer.email")}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.mapWrap}>
          <iframe
            className={styles.map}
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t("footer.mapTitle")}
          />
        </div>

        <div className={styles.copy}>{t("footer.copy")}</div>
      </div>
    </footer>
  );
}
