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
  | { type: "info"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

const FORGOT_PASSWORD_UNAVAILABLE_MESSAGE =
  "Відновлення пароля тимчасово недоступне. Бекенд ще не затвердив forgot password flow.";

export default function ForgotPasswordPageContent({
  onClose,
}: ForgotPasswordPageContentProps) {
  const router = useRouter();
  const isForgotPasswordAvailable = false;

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sendToEmail, setSendToEmail] = useState(false);
  const [sendToPhone, setSendToPhone] = useState(false);
  const [status, setStatus] = useState<StatusState>({
    type: "info",
    message: FORGOT_PASSWORD_UNAVAILABLE_MESSAGE,
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
      message: FORGOT_PASSWORD_UNAVAILABLE_MESSAGE,
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
              <span className={styles.label}>Введіть email</span>
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
                Надіслати новий пароль на пошту
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
                Надіслати новий пароль на телефон
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
                text="Тимчасово недоступно"
                variant="primary"
                type="submit"
                onClick={() => {}}
                disabled={!isForgotPasswordAvailable}
              />

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
