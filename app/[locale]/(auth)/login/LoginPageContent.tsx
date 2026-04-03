"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../auth.module.css";
import { closeAuthRoute } from "@/src/shared/auth-flow";
import { login, setAccessToken } from "@/src/shared/api";
import LocaleLink from "@/src/shared/i18n/Link";
import { useI18n, useLocalizedHref } from "@/src/shared/i18n/I18nProvider";
import Button from "@/src/widgets/Button/Button";
import GoogleAuthButton from "@/src/shared/ui/GoogleAuthButton/GoogleAuthButton";
import ModalCloseButton from "@/src/shared/ui/ModalCloseButton/ModalCloseButton";

type LoginFormData = {
  identifier: string;
  password: string;
};

type LoginPageContentProps = {
  onClose?: () => void;
};

export default function LoginPageContent({ onClose }: LoginPageContentProps) {
  const router = useRouter();
  const { t } = useI18n();
  const resolveHref = useLocalizedHref();

  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleCloseAuthFlow = () => {
    if (onClose) {
      onClose();
      return;
    }

    closeAuthRoute(router);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const data = await login(formData);
      if (!data?.access_token) {
        throw new Error(t("auth.login.errors.missingToken"));
      }

      setAccessToken(data.access_token);
      handleCloseAuthFlow();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("auth.login.errors.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  const isBusy = isLoading || isGoogleLoading;

  return (
    <div
      className={styles.shellLogin}
      style={{ backgroundImage: "url('/(auth)/login/login-bus.png')" }}
    >
      <ModalCloseButton
        className={`${styles.close} ${styles.closeLogin}`}
        ariaLabel={t("common.close")}
        onClose={onClose}
      />

      <div className={styles.loginContent}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>{t("auth.login.title")}</h1>

          <form className={styles.loginBlock} onSubmit={handleSubmit}>
            {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

            <label className={styles.field}>
              <span className={styles.label}>{t("auth.login.identifierLabel")}</span>
              <input
                className={styles.input}
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </label>

            <div className={styles.loginPasswordGroup}>
              <div className={styles.field}>
                <span className={styles.label}>{t("auth.login.passwordLabel")}</span>

                <div className={styles.inputWithIcon}>
                  <input
                    className={styles.inputInner}
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? t("common.password.hide") : t("common.password.show")}
                  >
                    <Image
                      className={styles.icon24}
                      src={showPass ? "/icons/eye-open.svg" : "/icons/eye-off-light.svg"}
                      alt=""
                      aria-hidden="true"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>

              <div className={styles.rowBetween}>
                <label className={styles.remember}>
                  <input className={styles.rememberInput} type="checkbox" />
                  <span className={styles.checkboxUi} aria-hidden="true" />
                  <span className={styles.rememberText}>{t("auth.login.remember")}</span>
                </label>

                <LocaleLink className={styles.forgot} href="/forgot-password">
                  {t("auth.login.forgotPassword")}
                </LocaleLink>
              </div>
            </div>

            <div className={styles.socialRow}>
              <GoogleAuthButton
                intent="login"
                disabled={isLoading}
                onBusyChange={setIsGoogleLoading}
                onSuccess={handleCloseAuthFlow}
              />
            </div>

            <div className={styles.buttonContainer}>
              <Button
                text={isLoading ? t("auth.login.submitLoading") : t("auth.login.submit")}
                variant="primary"
                type="submit"
                disabled={isBusy}
                onClick={() => {}}
              />

              <Button
                text={t("auth.login.register")}
                variant="secondary"
                type="button"
                disabled={isBusy}
                onClick={() => router.replace(resolveHref("/register"))}
              />
            </div>
          </form>
        </div>

        <div className={styles.loginAside}>
          <div className={styles.loginBrand}>
            <Image
              src="/logo-sprinter.svg"
              alt={t("header.logoAlt")}
              className={styles.brandLogo}
              width={213}
              height={50}
              priority
            />
            <div className={styles.loginBrandDesc}>{t("auth.common.brandDesc")}</div>
          </div>

          <div className={styles.loginTextBlock}>
            <p className={styles.loginTextLine}>{t("auth.login.benefits.reserve")}</p>
            <p className={styles.loginTextLine}>{t("auth.login.benefits.buy")}</p>
            <p className={styles.loginTextLine}>{t("auth.login.benefits.manage")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
