// Footer.tsx
"use client";

import Image from "next/image";

import styles from "./Footer.module.css";
import { useI18n } from "@/src/shared/i18n/I18nProvider";

const MAP_QUERY = "вулиця Митницька, 7, Черкаси, Черкаська область, 18000";

export default function Footer() {
  const { t } = useI18n();

  const src = `https://www.google.com/maps?q=${encodeURIComponent(
    MAP_QUERY
  )}&output=embed`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={styles.footer}
      id="contacts"
      aria-label={t("footer.ariaLabel")}
    >
      <div className={styles.container}>
        <div className={styles.contacts}>
          {/* Work time */}
          <div className={`${styles.contactItem} ${styles.timeItem}`}>
            <div className={styles.contactIconCol}>
              <Image
                className={styles.contactIcon}
                src="/icons/Footer/clock.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
              />
            </div>
            <div className={styles.contactTextCol}>
              <div className={styles.contactText}>{t("footer.workTime")}</div>
            </div>
          </div>

          {/* Address */}
          <div className={`${styles.contactItem} ${styles.addressItem}`}>
            <div className={styles.contactIconCol}>
              <Image
                className={styles.contactIcon}
                src="/icons/Footer/map-point.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
              />
            </div>
            <div className={styles.contactTextCol}>
              <div className={styles.contactText}>{t("footer.addressLine1")}</div>
              <div className={styles.contactTextMuted}>
                {t("footer.addressLine2")}
              </div>
            </div>
          </div>

          {/* Phones */}
          <div className={`${styles.contactItem} ${styles.phoneItem}`}>
            <div className={styles.contactIconCol}>
              <Image
                className={styles.contactIcon}
                src="/icons/Footer/phone.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
              />
            </div>
            <div className={styles.contactTextCol}>
              <a className={styles.contactLink} href="tel:+380974802428">
                +38097 480 24 28
              </a>
              <a className={styles.contactLink} href="tel:+380939660940">
                +38093 966 09 40
              </a>
              <a className={styles.contactLink} href="tel:+380990782021">
                +38099 078 20 21
              </a>
            </div>
          </div>

          {/* Social */}
          <div className={`${styles.contactItem} ${styles.socialItem}`}>
            <div className={`${styles.contactIconCol} ${styles.socialIconCol}`}>
              <Image
                className={`${styles.contactIcon} ${styles.socialIcon}`}
                src="/icons/Footer/insta.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
              />
              <Image
                className={`${styles.contactIcon} ${styles.socialIcon}`}
                src="/icons/Footer/fs.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
              />
            </div>
            <div className={`${styles.contactTextCol} ${styles.socialTextCol}`}>
              <a
                className={`${styles.contactLink} ${styles.socialLink}`}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                {t("footer.instagram")}
              </a>
              <a
                className={`${styles.contactLink} ${styles.socialLinkSecondary}`}
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                {t("footer.facebook")}
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

        <div className={styles.footerBottom}>
          <div className={styles.copy}>{t("footer.copy")}</div>

          <button
            className={styles.mobileTopBar}
            type="button"
            onClick={scrollToTop}
            aria-label={t("footer.scrollTop")}
          >
            <Image
              className={styles.mobileTopBarIcon}
              src="/icons/Footer/Bar.svg"
              alt=""
              aria-hidden="true"
              width={152}
              height={5}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
