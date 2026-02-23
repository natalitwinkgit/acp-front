"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "../auth.module.css";
import Button from "@/src/widgets/Button/Button";
import ModalCloseButton from "@/src/widgets/ModalCloseButton/ModalCloseButton";

type LoginFormData = {
  login: string;
  password: string;
};

export default function LoginPageContent() {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({ login: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!API_URL) {
      setError("Не налаштовано NEXT_PUBLIC_API_URL (env).");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({} as any));

      if (!res.ok) {
        throw new Error(data?.message || "Невірний логін або пароль");
      }

      if (data?.token) localStorage.setItem("token", data.token);

      router.push("/profile");
    } catch (err: any) {
      setError(err?.message || "Сталася помилка. Спробуйте ще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.shell}>
      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.formWrap}>
          <h1 className={styles.title}>Особистий кабінет</h1>

          <form className={styles.blockLogin} onSubmit={handleSubmit}>
            {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

            <label className={styles.field}>
              <span className={styles.label}>Email або номер телефону +380…</span>
              <input
                className={styles.input}
                type="text"
                name="login"
                value={formData.login}
                onChange={handleChange}
                required
              />
            </label>

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

            <div className={styles.socialRow}>
              <button className={styles.socialBtn} type="button" aria-label="Увійти через Google">
                <img src="/icons/icons8-google.svg" alt="" className={styles.icon24} />
              </button>
              <button className={styles.socialBtn} type="button" aria-label="Увійти через Apple">
                <img src="/icons/icons8-apple.svg" alt="" className={styles.icon24} />
              </button>
            </div>

            <div className={styles.buttonContainer}>
              {/* щоб TypeScript не падав, onClick обов'язковий по типах */}
              <Button
                text={isLoading ? "Вхід..." : "Увійти"}
                variant="primary"
                type="submit"
                disabled={isLoading}
                onClick={() => {}}
              />

              <Button
                text="Зареєструватись"
                variant="secondary"
                type="button"
                onClick={() => router.replace("/register")}
              />
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className={styles.right}
        style={{ backgroundImage: "url('/(auth)/login/login-bus.png')" }}
      >
        <ModalCloseButton className={styles.close} ariaLabel="Close" />

        <div className={styles.brand}>
          <img src="/icons/Text.svg" alt="АВТОЛЮКС" className={styles.brandLogo} />
          <div className={styles.brandDesc}>Подорожуйте безпечно і з комфотом</div>
        </div>

        <div className={`${styles.textBlock} ${styles.textLogin}`}>
          <p className={styles.textLine}>Бронюйте квитки безкоштовно</p>
          <p className={styles.textLine}>Купуйте квитоки онлайн</p>
          <p className={styles.textLine}>Керуйте квитками та історією замовлень</p>
        </div>
      </div>
    </div>
  );
}
