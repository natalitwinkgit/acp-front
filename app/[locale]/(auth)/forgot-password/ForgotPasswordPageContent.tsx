"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { closeAuthRoute } from "@/src/shared/auth-flow";
import { useI18n, useLocalizedHref } from "@/src/shared/i18n/I18nProvider";
import Button from "@/src/widgets/Button/Button";
import styles from "./forgot-password.module.css";
import ModalCloseButton from "@/src/shared/ui/ModalCloseButton/ModalCloseButton";

type ForgotPasswordPageContentProps = {
  onClose?: () => void;
};

type StatusState =
  | { type: "info"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

export default function ForgotPasswordPageContent({
  onClose,
}: ForgotPasswordPageContentProps) {
  const router = useRouter();
  const { t } = useI18n();
  const resolveHref = useLocalizedHref();
  const isForgotPasswordAvailable = false;
  const unavailableMessage = t("auth.forgotPassword.unavailableMessage");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sendToEmail, setSendToEmail] = useState(false);
  const [sendToPhone, setSendToPhone] = useState(false);
  const [status, setStatus] = useState<StatusState>({
    type: "info",
    message: unavailableMessage,
  });

  const handleCloseAuthFlow = () => {
    if (onClose) {
      onClose();
      return;
    }

    closeAuthRoute(router);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({
      type: "info",
      message: unavailableMessage,
    });
  };

  return (
    <div
      className={styles.shell}
      style={{ backgroundImage: "url('/(auth)/forgot-pass/forgot-bus.jpg')" }}
    >
      <ModalCloseButton
        className={styles.close}
        ariaLabel={t("common.close")}
        onClose={handleCloseAuthFlow}
      />

      <div className={styles.content}>
        <aside className={styles.aside}>
          <div className={styles.brand}>
            <Image
              src="/logo-sprinter.svg"
              alt={t("header.logoAlt")}
              className={styles.brandLogo}
              width={213}
              height={50}
            />
            <p className={styles.brandDesc}>{t("auth.common.brandDesc")}</p>
          </div>

          <div className={styles.infoBlock}>
            <p className={styles.infoLine}>{t("auth.common.promo.one")}</p>
            <p className={styles.infoLine}>{t("auth.common.promo.two")}</p>
            <p className={styles.infoLine}>{t("auth.common.promo.three")}</p>
          </div>
        </aside>

        <section className={styles.card} aria-labelledby="forgot-password-title">
          <h1 id="forgot-password-title" className={styles.title}>
            {t("auth.forgotPassword.title")}
          </h1>
          <p className={styles.subtitle}>{t("auth.forgotPassword.subtitle")}</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span className={styles.label}>{t("auth.forgotPassword.phoneLabel")}</span>
              <div className={styles.inputWrap}>
                <input
                  className={styles.input}
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                  autoComplete="tel"
                  inputMode="tel"
                  disabled={!isForgotPasswordAvailable}
                />
                <Image
                  src="/icons/eye-off-light.svg"
                  alt=""
                  className={styles.inputIcon}
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>{t("auth.forgotPassword.emailLabel")}</span>
              <div className={styles.inputWrap}>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  autoComplete="email"
                  disabled={!isForgotPasswordAvailable}
                />
                <Image
                  src="/icons/eye-off-light.svg"
                  alt=""
                  className={styles.inputIcon}
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </div>
            </label>

            <label
              className={`${styles.optionRow} ${
                !isForgotPasswordAvailable ? styles.optionRowDisabled : ""
              }`.trim()}
            >
              <input
                className={styles.optionInput}
                type="checkbox"
                checked={sendToEmail}
                onChange={(event) => {
                  setSendToEmail(event.target.checked);
                }}
                disabled={!isForgotPasswordAvailable}
              />
              <span
                className={`${styles.checkboxUi} ${
                  !isForgotPasswordAvailable ? styles.checkboxUiDisabled : ""
                }`.trim()}
                aria-hidden="true"
              />
              <span
                className={`${styles.optionText} ${
                  !isForgotPasswordAvailable ? styles.optionTextMuted : ""
                }`.trim()}
              >
                {t("auth.forgotPassword.sendToEmail")}
              </span>
            </label>

            <label
              className={`${styles.optionRow} ${
                !isForgotPasswordAvailable ? styles.optionRowDisabled : ""
              }`.trim()}
            >
              <input
                className={styles.optionInput}
                type="checkbox"
                checked={sendToPhone}
                onChange={(event) => {
                  setSendToPhone(event.target.checked);
                }}
                disabled={!isForgotPasswordAvailable}
              />
              <span
                className={`${styles.checkboxUi} ${
                  !isForgotPasswordAvailable ? styles.checkboxUiDisabled : ""
                }`.trim()}
                aria-hidden="true"
              />
              <span
                className={`${styles.optionText} ${
                  !isForgotPasswordAvailable ? styles.optionTextMuted : ""
                }`.trim()}
              >
                {t("auth.forgotPassword.sendToPhone")}
              </span>
            </label>

            <div
              className={`${styles.status} ${status?.type === "info" ? styles.statusInfo : ""} ${
                status?.type === "success" ? styles.statusSuccess : ""
              } ${status?.type === "error" ? styles.statusError : ""
              }`.trim()}
              aria-live="polite"
            >
              {status?.message ?? ""}
            </div>

            <div className={styles.actions}>
              <Button
                text={t("auth.forgotPassword.unavailableButton")}
                variant="primary"
                type="submit"
                onClick={() => {}}
                disabled={!isForgotPasswordAvailable}
              />

              <div className={styles.bottomRow}>
                <button
                  type="button"
                  className={styles.googleLink}
                  onClick={() => router.replace(resolveHref("/login"))}
                >
                  <span>{t("auth.forgotPassword.loginVia")}</span>
                  <Image
                    src="/(auth)/flat-color-icons_google.svg"
                    alt=""
                    className={styles.googleIcon}
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                </button>

                <button
                  type="button"
                  className={styles.backLink}
                  onClick={() => router.replace(resolveHref("/login"))}
                >
                  {t("auth.forgotPassword.existingAccount")}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
