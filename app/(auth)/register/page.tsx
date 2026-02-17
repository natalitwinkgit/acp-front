"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../auth.module.css";
import Button from "@/src/widgets/Button/Button";
import ModalCloseButton from "@/src/widgets/ModalCloseButton/ModalCloseButton";

type RegisterFormData = {
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState<RegisterFormData>({
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    if (formData.password !== formData.confirmPassword) {
      setError("Паролі не співпадають");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json().catch(() => ({} as any));

      if (!res.ok) {
        throw new Error(data?.message || "Помилка реєстрації");
      }

      router.replace("/login");
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
        <div className={styles.formWrapRegister}>
          <h1 className={styles.title}>Реєстрація</h1>

          <form className={styles.blockRegister} onSubmit={handleSubmit}>
            {error && (
              <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
            )}

            <label className={styles.field}>
              <span className={styles.label}>Введіть номер телефону +380…</span>
              <input
                className={styles.input}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+380..."
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Введіть email</span>
              <input
                className={styles.input}
                type="email"
                name="email"
                value={formData.email}
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

            <div className={styles.passwordBlock}>
              <div className={styles.field}>
                <span className={styles.label}>Підтвердіть пароль</span>

                <div className={styles.inputWithIcon}>
                  <input
                    className={styles.inputInner}
                    type={showPass2 ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => setShowPass2((v) => !v)}
                    aria-label={showPass2 ? "Сховати пароль" : "Показати пароль"}
                  >
                    <img
                      className={styles.icon24}
                      src={showPass2 ? "/icons/eye-open.svg" : "/icons/eye-off-light.svg"}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>

              <div className={styles.hint}>
                Пароль повинен містити не менше 8 символів...
              </div>
            </div>

            <div className={styles.socialRowRegister}>
              <button className={styles.socialBtn} type="button" aria-label="Увійти через Google">
                <img src="/icons/icons8-google.svg" alt="" className={styles.icon24} />
              </button>
              <button className={styles.socialBtn} type="button" aria-label="Увійти через Apple">
                <img src="/icons/icons8-apple.svg" alt="" className={styles.icon24} />
              </button>
            </div>

            <div className={styles.buttonRegister}>
              {/* щоб TypeScript не падав, onClick обов'язковий по типах */}
              <Button
                text={isLoading ? "Завантаження..." : "Зареєструватись"}
                variant="primary"
                type="submit"
                disabled={isLoading}
                onClick={() => {}}
              />
            </div>

            <button
              className={styles.underLink}
              type="button"
              onClick={() => router.replace("/login")}
            >
              У мене вже є акаунт
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className={styles.right}
        style={{ backgroundImage: "url('/(auth)/register/register-bus.jpg')" }}
      >
        <ModalCloseButton className={styles.close} ariaLabel="Close" />

        <div className={styles.brandRegister}>
          <img src="/icons/Text.svg" alt="АВТОЛЮКС" className={styles.brandLogo} />
          <div className={styles.brandDesc}>Подорожуйте безпечно і з комфотом</div>
        </div>

        <div className={`${styles.textBlock} ${styles.textRegister}`}>
          <p className={styles.textLineRegister}>
            Гнучке керування квитками: Ви можете безкоштовно забронювати місце на потрібний
            рейс або здійснити миттєву купівлю онлайн
          </p>
          <p className={styles.textLineRegister}>
            Актуальний час відправлення завжди доступний онлайн у пару кліків
          </p>
          <p className={styles.textLineRegister}>
            Зареєструйтесь і плануйте подорож за хвилину
          </p>
        </div>
      </div>
    </div>
  );
}