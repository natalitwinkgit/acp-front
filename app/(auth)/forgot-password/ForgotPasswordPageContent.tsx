"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { closeAuthRoute } from "@/src/shared/auth-flow";
import Button from "@/src/widgets/Button/Button";
import styles from "./forgot-password.module.css";
import ModalCloseButton from "@/src/shared/ui/ModalCloseButton/ModalCloseButton";

type ForgotPasswordPageContentProps = {
  onClose?: () => void;
};

type StatusState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

function isEmailValid(value: string) {
  const trimmedValue = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);
}

function isPhoneValid(value: string) {
  const trimmedValue = value.trim();
  const normalizedPhone = trimmedValue.replace(/[\s()-]/g, "");
  return /^\+?\d{10,15}$/.test(normalizedPhone);
}

export default function ForgotPasswordPageContent({
  onClose,
}: ForgotPasswordPageContentProps) {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sendToEmail, setSendToEmail] = useState(false);
  const [sendToPhone, setSendToPhone] = useState(false);
  const [status, setStatus] = useState<StatusState>(null);

  const handleCloseAuthFlow = () => {
    if (onClose) {
      onClose();
      return;
    }

    closeAuthRoute(router);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedPhone && !trimmedEmail) {
      setStatus({
        type: "error",
        message: "Введіть номер телефону або email.",
      });
      return;
    }

    if (trimmedPhone && !isPhoneValid(trimmedPhone)) {
      setStatus({
        type: "error",
        message: "Введіть коректний номер телефону.",
      });
      return;
    }

    if (trimmedEmail && !isEmailValid(trimmedEmail)) {
      setStatus({
        type: "error",
        message: "Введіть коректний email.",
      });
      return;
    }

    if (!sendToEmail && !sendToPhone) {
      setStatus({
        type: "error",
        message: "Оберіть, куди надіслати новий пароль.",
      });
      return;
    }

    if (sendToEmail && !trimmedEmail) {
      setStatus({
        type: "error",
        message: "Введіть email, щоб надіслати новий пароль на пошту.",
      });
      return;
    }

    if (sendToPhone && !trimmedPhone) {
      setStatus({
        type: "error",
        message: "Введіть номер телефону, щоб надіслати новий пароль на телефон.",
      });
      return;
    }

    setStatus({
      type: "success",
      message:
        "Якщо акаунт із такими даними існує, новий пароль буде надіслано на вибрані контакти.",
    });
  };

  return (
    <div
      className={styles.shell}
      style={{ backgroundImage: "url('/(auth)/forgot-pass/forgot-bus.jpg')" }}
    >
      <ModalCloseButton
        className={styles.close}
        ariaLabel="Закрити"
        onClose={handleCloseAuthFlow}
      />

      <div className={styles.content}>
        <aside className={styles.aside}>
          <div className={styles.brand}>
            <Image
              src="/logo-sprinter.svg"
              alt="Автолюкс Черкаси-Плюс"
              className={styles.brandLogo}
              width={213}
              height={50}
            />
            <p className={styles.brandDesc}>Подорожуйте безпечно і з комфотом</p>
          </div>

          <div className={styles.infoBlock}>
            <p className={styles.infoLine}>
              Гнучке керування квитками: Ви можете безкоштовно забронювати місце на потрібний
              рейс або здійснити миттєву купівлю онлайн.
            </p>
            <p className={styles.infoLine}>
              Актуальний час відправлення завжди доступний онлайн у пару кліків.
            </p>
            <p className={styles.infoLine}>Зареєструйтесь і плануйте подорож за хвилину.</p>
          </div>
        </aside>

        <section className={styles.card} aria-labelledby="forgot-password-title">
          <h1 id="forgot-password-title" className={styles.title}>
            Відновлення пароля
          </h1>
          <p className={styles.subtitle}>Введіть електронну пошту або телефон</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span className={styles.label}>Введіть номер телефону +380...</span>
              <div className={styles.inputWrap}>
                <input
                  className={styles.input}
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    if (status) setStatus(null);
                  }}
                  autoComplete="tel"
                  inputMode="tel"
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
              <span className={styles.label}>Введіть email</span>
              <div className={styles.inputWrap}>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status) setStatus(null);
                  }}
                  autoComplete="email"
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

            <label className={styles.optionRow}>
              <input
                className={styles.optionInput}
                type="checkbox"
                checked={sendToEmail}
                onChange={(event) => {
                  setSendToEmail(event.target.checked);
                  if (status) setStatus(null);
                }}
              />
              <span className={styles.checkboxUi} aria-hidden="true" />
              <span className={styles.optionText}>Надіслати новий пароль на пошту</span>
            </label>

            <label className={styles.optionRow}>
              <input
                className={styles.optionInput}
                type="checkbox"
                checked={sendToPhone}
                onChange={(event) => {
                  setSendToPhone(event.target.checked);
                  if (status) setStatus(null);
                }}
              />
              <span className={styles.checkboxUi} aria-hidden="true" />
              <span className={styles.optionText}>Надіслати новий пароль на телефон</span>
            </label>

            <div
              className={`${styles.status} ${status?.type === "success" ? styles.statusSuccess : ""} ${
                status?.type === "error" ? styles.statusError : ""
              }`.trim()}
              aria-live="polite"
            >
              {status?.message ?? ""}
            </div>

            <div className={styles.actions}>
              <Button text="Продовжити" variant="primary" type="submit" onClick={() => {}} />

              <div className={styles.bottomRow}>
                <button
                  type="button"
                  className={styles.googleLink}
                  onClick={() => router.replace("/login")}
                >
                  <span>Вхід через</span>
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
                  onClick={() => router.replace("/login")}
                >
                  У мене вже є акаунт
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
