"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { changePassword, getProfile, hasAccessToken, updateProfile } from "@/src/shared/api";
import BreadcrumbChips from "@/src/shared/ui/BreadcrumbChips/BreadcrumbChips";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import ProfileTabsBar from "@/src/shared/ui/ProfileTabsBar/ProfileTabsBar";
import styles from "./profile.module.css";

const PHONE_PATTERN = /^\+380\d{9}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ProfileFormData = {
  name: string;
  phone: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};

type PersistedProfileFields = Pick<ProfileFormData, "name" | "phone" | "email">;

const EMPTY_FORM: ProfileFormData = {
  name: "",
  phone: "",
  email: "",
  currentPassword: "",
  newPassword: "",
};

function shouldRequireLogin(message: string) {
  const normalizedMessage = message.trim().toLowerCase();

  if (
    normalizedMessage.includes("failed to fetch")
    || normalizedMessage.includes("network")
    || normalizedMessage.includes("next_public_api_url")
  ) {
    return false;
  }

  return !hasAccessToken();
}

export default function ProfilePageContent() {
  const { t } = useI18n();
  const [formData, setFormData] = useState<ProfileFormData>(EMPTY_FORM);
  const [initialValues, setInitialValues] = useState<PersistedProfileFields>({
    name: "",
    phone: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [requiresLogin, setRequiresLogin] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const loadProfile = async () => {
      setIsLoading(true);
      setError("");
      setSuccess("");
      setRequiresLogin(false);

      try {
        const profile = await getProfile();

        if (isCancelled) return;

        const nextValues = {
          name: profile.name ?? "",
          phone: profile.phone ?? "",
          email: profile.email ?? "",
        };

        setInitialValues(nextValues);
        setFormData((prev) => ({
          ...prev,
          ...nextValues,
          currentPassword: "",
          newPassword: "",
        }));
      } catch (err) {
        if (isCancelled) return;

        const message = err instanceof Error ? err.message : "Не вдалося завантажити профіль.";
        setError(message);
        setRequiresLogin(shouldRequireLogin(message));
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      isCancelled = true;
    };
  }, [reloadKey]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();
    const wantsPasswordChange = Boolean(formData.currentPassword || formData.newPassword);

    if (!trimmedName || trimmedName.length < 2) {
      setError("Вкажіть ім'я щонайменше з 2 символів.");
      return;
    }

    if (!PHONE_PATTERN.test(trimmedPhone)) {
      setError("Номер телефону має бути у форматі +380XXXXXXXXX.");
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("Вкажіть коректний email.");
      return;
    }

    if (wantsPasswordChange) {
      if (!formData.currentPassword || !formData.newPassword) {
        setError("Щоб змінити пароль, заповніть і поточний, і новий пароль.");
        return;
      }

      if (formData.newPassword.length < 6) {
        setError("Новий пароль має містити щонайменше 6 символів.");
        return;
      }

      if (formData.currentPassword === formData.newPassword) {
        setError("Новий пароль не може співпадати з поточним.");
        return;
      }
    }

    const profilePayload: {
      email?: string;
      name?: string;
      phone?: string;
    } = {};

    if (trimmedName !== initialValues.name) {
      profilePayload.name = trimmedName;
    }

    if (trimmedPhone !== initialValues.phone) {
      profilePayload.phone = trimmedPhone;
    }

    if (trimmedEmail !== initialValues.email) {
      profilePayload.email = trimmedEmail;
    }

    const hasProfileChanges = Object.keys(profilePayload).length > 0;

    if (!hasProfileChanges && !wantsPasswordChange) {
      setSuccess("Змін для збереження немає.");
      return;
    }

    setIsSaving(true);

    const successMessages: string[] = [];
    const failureMessages: string[] = [];

    if (hasProfileChanges) {
      try {
        const response = await updateProfile(profilePayload);
        const nextValues = {
          name: response.user.name ?? "",
          phone: response.user.phone ?? "",
          email: response.user.email ?? "",
        };

        setInitialValues(nextValues);
        setFormData((prev) => ({
          ...prev,
          ...nextValues,
        }));
        successMessages.push(response.message);
      } catch (err) {
        failureMessages.push(
          err instanceof Error ? err.message : "Не вдалося оновити дані профілю.",
        );
      }
    }

    if (wantsPasswordChange) {
      try {
        const response = await changePassword({
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });

        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
        }));
        successMessages.push(response.message);
      } catch (err) {
        failureMessages.push(
          err instanceof Error ? err.message : "Не вдалося змінити пароль.",
        );
      }
    }

    setIsSaving(false);

    if (successMessages.length > 0) {
      setSuccess(successMessages.join(" "));
    }

    if (failureMessages.length > 0) {
      const combinedMessage = failureMessages.join(" ");
      setError(combinedMessage);
      setRequiresLogin(shouldRequireLogin(combinedMessage));
    }
  };

  const retryLoad = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <BreadcrumbChips
          ariaLabel={t("profile.breadcrumbsAria")}
          items={[
            { label: t("menu.home"), href: "/#home" },
            { label: t("profile.cabinet"), current: true },
            { label: t("profile.title"), current: true },
          ]}
        />

        <ProfileTabsBar
          ariaLabel={t("profile.tabsAria")}
          showExitButton
          items={[
            { label: t("profile.tabs.tickets"), href: "/profile/tickets" },
            { label: t("profile.tabs.archive"), href: "/profile" },
            { label: t("profile.tabs.profile"), active: true },
          ]}
        />

        <section className={styles.card} aria-labelledby="profile-title">
          <h1 id="profile-title" className={styles.title}>
            {t("profile.title")}
          </h1>

          <p className={styles.description}>
            Оновіть дані профілю та, за потреби, змініть пароль через чинний бекенд-контракт.
          </p>

          {error ? (
            <div className={`${styles.notice} ${styles.noticeError}`} role="alert">
              <span>{error}</span>

              {!isLoading ? (
                <button type="button" className={styles.noticeAction} onClick={retryLoad}>
                  Повторити
                </button>
              ) : null}
            </div>
          ) : null}

          {success ? (
            <div className={`${styles.notice} ${styles.noticeSuccess}`} role="status">
              {success}
            </div>
          ) : null}

          {requiresLogin && !isLoading ? (
            <div className={styles.loginState}>
              <p className={styles.loginStateText}>
                Сесія неактивна. Увійдіть знову, щоб переглянути й оновити профіль.
              </p>
              <Link href="/login" className={styles.loginStateButton}>
                Увійти
              </Link>
            </div>
          ) : null}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span className={styles.label}>Прізвище та ім&apos;я</span>
                <input
                  className={styles.input}
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Введіть ім'я та прізвище"
                  autoComplete="name"
                  disabled={isLoading || isSaving || requiresLogin}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Номер телефону +380...</span>
                <input
                  className={styles.input}
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+380XXXXXXXXX"
                  autoComplete="tel"
                  disabled={isLoading || isSaving || requiresLogin}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Email (для підтвердження)</span>
                <input
                  className={styles.input}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  autoComplete="email"
                  disabled={isLoading || isSaving || requiresLogin}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Поточний пароль</span>
                <span className={styles.inputWrap}>
                  <input
                    className={`${styles.input} ${styles.inputWithIcon}`}
                    name="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Введіть поточний пароль"
                    autoComplete="current-password"
                    disabled={isLoading || isSaving || requiresLogin}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    aria-label={showCurrentPassword ? "Приховати пароль" : "Показати пароль"}
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    disabled={isLoading || isSaving || requiresLogin}
                  >
                    <Image
                      src={showCurrentPassword ? "/icons/eye-open.svg" : "/icons/eye-off-light.svg"}
                      alt=""
                      width={24}
                      height={24}
                      unoptimized
                    />
                  </button>
                </span>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Новий пароль</span>
                <span className={styles.inputWrap}>
                  <input
                    className={`${styles.input} ${styles.inputWithIcon}`}
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Введіть новий пароль"
                    autoComplete="new-password"
                    disabled={isLoading || isSaving || requiresLogin}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    aria-label={showNewPassword ? "Приховати пароль" : "Показати пароль"}
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    disabled={isLoading || isSaving || requiresLogin}
                  >
                    <Image
                      src={showNewPassword ? "/icons/eye-open.svg" : "/icons/eye-off-light.svg"}
                      alt=""
                      width={24}
                      height={24}
                      unoptimized
                    />
                  </button>
                </span>
              </label>
            </div>

            <p className={styles.helperText}>
              Для зміни пароля існуючий бекенд вимагає поточний і новий пароль, тому форма збереження
              працює саме в цьому форматі.
            </p>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || isSaving || requiresLogin}
            >
              {isLoading ? "Завантаження..." : isSaving ? "Зберігаємо..." : "Зберегти"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
