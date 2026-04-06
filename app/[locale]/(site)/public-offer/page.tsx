"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";

export default function PublicOfferPage() {
  const { t } = useI18n();

  return (
    <main style={{ width: "100%", padding: "40px 24px", boxSizing: "border-box" }}>
      <section style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "#11313D" }}>
          {t("publicOffer.title")}
        </h1>
        <p style={{ margin: 0, fontSize: 16, lineHeight: "1.75", color: "#11313D" }}>
          {t("publicOffer.description")}
        </p>
      </section>
    </main>
  );
}
