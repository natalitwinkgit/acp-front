"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../auth.module.css";
import { closeAuthRoute } from "@/src/shared/auth-flow";
import { register } from "@/src/shared/api";
import { useI18n, useLocalizedHref } from "@/src/shared/i18n/I18nProvider";
import Button from "@/src/widgets/Button/Button";
import AuthPromoList from "../AuthPromoList";
import GoogleAuthButton from "@/src/shared/ui/GoogleAuthButton/GoogleAuthButton";
import ModalCloseButton from "@/src/shared/ui/ModalCloseButton/ModalCloseButton";
import Notification from "@/src/shared/ui/Notification/Notification";

type RegisterFormData = {
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterPageContentProps = {
  onClose?: () => void;
};

export default function RegisterPageContent({ onClose }: RegisterPageContentProps) {
  const router = useRouter();
  const { t } = useI18n();
  const resolveHref = useLocalizedHref();

  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [formData, setFormData] = useState<RegisterFormData>({
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

    setError("");

    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.register.errors.passwordMismatch"));
      return;
    }

    if (!phone) {
      setError(t("auth.register.errors.phoneRequired"));
      return;
    }

    if (!/^\+380\d{9}$/.test(phone)) {
      setError(t("auth.register.errors.phoneFormat"));
      return;
    }

    setIsLoading(true);

    try {
      await register({
        email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phone,
      });

      router.replace(resolveHref("/login"));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("auth.register.errors.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  const isBusy = isLoading || isGoogleLoading;
  const promoItems = [
    t("auth.common.promo.one"),
    t("auth.common.promo.two"),
    t("auth.common.promo.three"),
  ];

  return (
    <div
      className={styles.shellRegister}
      style={{ backgroundImage: "url('/(auth)/register/register-bus.jpg')" }}
    >
      <ModalCloseButton
        className={`${styles.close} ${styles.closeRegister}`}
        ariaLabel={t("common.close")}
        onClose={onClose}
      />

      <div className={styles.registerContent}>
        <div className={styles.registerBrand}>
          <Image
            src="/logo-sprinter.svg"
            alt={t("header.logoAlt")}
            className={styles.brandLogo}
            width={213}
            height={50}
            priority
          />
          <div className={styles.registerBrandDesc}>{t("auth.common.brandDesc")}</div>
        </div>

        <AuthPromoList
          items={promoItems}
          listClassName={styles.registerTextBlock}
          itemClassName={styles.registerTextLine}
        />

        <div className={styles.registerCard}>
          <h1 className={styles.registerTitle}>{t("auth.register.title")}</h1>

          {error ? (
            <Notification
              variant="error"
              size="small"
              message={error}
              onClose={() => setError("")}
              closeLabel={t("common.close")}
              className={styles.registerInlineToast}
            />
          ) : null}

          <form className={styles.registerBlock} onSubmit={handleSubmit}>

            <label className={styles.field}>
              <span className={styles.label}>{t("auth.register.phoneLabel")}</span>
              <input
                className={styles.input}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+380991234567"
                autoComplete="tel"
                inputMode="tel"
                pattern="^\+380\d{9}$"
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>{t("auth.register.emailLabel")}</span>
              <input
                className={styles.input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>

            <div className={styles.field}>
              <span className={styles.label}>{t("auth.register.passwordLabel")}</span>

              <div className={styles.inputWithIcon}>
                <input
                  className={styles.inputInner}
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
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

            <div className={styles.passwordBlock}>
              <div className={styles.field}>
                <span className={styles.label}>{t("auth.register.confirmPasswordLabel")}</span>

                <div className={styles.inputWithIcon}>
                  <input
                    className={styles.inputInner}
                    type={showPass2 ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => setShowPass2((v) => !v)}
                    aria-label={showPass2 ? t("common.password.hide") : t("common.password.show")}
                  >
                    <Image
                      className={styles.icon24}
                      src={showPass2 ? "/icons/eye-open.svg" : "/icons/eye-off-light.svg"}
                      alt=""
                      aria-hidden="true"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>

              <div className={styles.hint}>
                {t("auth.register.passwordHint")}
              </div>
            </div>

            <div className={styles.socialRowRegister}>
              <GoogleAuthButton
                intent="register"
                disabled={isLoading}
                onBusyChange={setIsGoogleLoading}
                onSuccess={handleCloseAuthFlow}
              />
            </div>

            <div className={styles.buttonRegister}>
              <Button
                text={isLoading ? t("auth.register.submitLoading") : t("auth.register.submit")}
                variant="primary"
                type="submit"
                disabled={isBusy}
                onClick={() => {}}
              />
            </div>

              <button
                className={styles.underLink}
                type="button"
                onClick={() => router.replace(resolveHref("/login"))}
              >
                {t("auth.register.existingAccount")}
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}
