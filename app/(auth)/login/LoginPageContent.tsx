"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "../auth.module.css";
import { closeAuthRoute } from "@/src/shared/auth-flow";
import { consumeGoogleAuthError, login, setAccessToken, startGoogleAuth } from "@/src/shared/api";
import Button from "@/src/widgets/Button/Button";
import ModalCloseButton from "@/src/widgets/ModalCloseButton/ModalCloseButton";

type LoginFormData = {
  identifier: string;
  password: string;
};

type LoginPageContentProps = {
  onClose?: () => void;
};

export default function LoginPageContent({ onClose }: LoginPageContentProps) {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    const authError = consumeGoogleAuthError();
    if (authError) {
      setError(authError);
    }
  }, []);

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
        throw new Error("Відповідь API не містить access token");
      }

      setAccessToken(data.access_token);
      handleCloseAuthFlow();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Сталася помилка. Спробуйте ще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      startGoogleAuth("login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не вдалося почати вхід через Google.");
      setIsGoogleLoading(false);
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
        ariaLabel="Close"
        onClose={onClose}
      />

      <div className={styles.loginContent}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>Особистий кабінет</h1>

          <form className={styles.loginBlock} onSubmit={handleSubmit}>
            {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

            <label className={styles.field}>
              <span className={styles.label}>Email або номер телефону +380…</span>
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
                <span className={styles.label}>Пароль</span>

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
                    aria-label={showPass ? "Сховати пароль" : "Показати пароль"}
                  >
                    <img
                      className={styles.icon24}
                      src={showPass ? "/icons/eye-open.svg" : "/icons/eye-off-light.svg"}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>

              <div className={styles.rowBetween}>
                <label className={styles.remember}>
                  <input className={styles.rememberInput} type="checkbox" />
                  <span className={styles.checkboxUi} aria-hidden="true" />
                  <span className={styles.rememberText}>Запам’ятати</span>
                </label>

                <Link className={styles.forgot} href="/forgot-password">
                  Забули пароль?
                </Link>
              </div>
            </div>

            <div className={styles.socialRow}>
              <button
                className={styles.socialBtn}
                type="button"
                aria-label="Увійти через Google"
                onClick={handleGoogleLogin}
                disabled={isBusy}
              >
                <img src="/icons/icons8-google.svg" alt="" className={styles.icon24} />
              </button>
            </div>

            <div className={styles.buttonContainer}>
              <Button
                text={isLoading ? "Вхід..." : "Увійти"}
                variant="primary"
                type="submit"
                disabled={isBusy}
                onClick={() => {}}
              />

              <Button
                text="Зареєструватись"
                variant="secondary"
                type="button"
                disabled={isBusy}
                onClick={() => router.replace("/register")}
              />
            </div>
          </form>
        </div>

        <div className={styles.loginAside}>
          <div className={styles.loginBrand}>
            <img src="/icons/Text.svg" alt="АВТОЛЮКС" className={styles.brandLogo} />
            <div className={styles.loginBrandDesc}>Подорожуйте безпечно і з комфотом</div>
          </div>

          <div className={styles.loginTextBlock}>
            <p className={styles.loginTextLine}>Бронюйте квитки безкоштовно</p>
            <p className={styles.loginTextLine}>Купуйте квитоки онлайн</p>
            <p className={styles.loginTextLine}>Керуйте квитками та історією замовлень</p>
          </div>
        </div>
      </div>
    </div>
  );
}
