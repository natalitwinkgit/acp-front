"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { resetPassword } from "@/src/shared/api";
import { useI18n, useLocalizedHref } from "@/src/shared/i18n/I18nProvider";
import Notification from "@/src/shared/ui/Notification/Notification";
import Button from "@/src/widgets/Button/Button";
import PasswordRecoveryShell from "../PasswordRecoveryShell";
import styles from "../forgot-password/forgot-password.module.css";
import TextField from "@/src/shared/ui/TextField/TextField";

type ResetPasswordPageContentProps = {
  onClose?: () => void;
  token: string;
};

type FeedbackState = {
  message: string;
  variant: "error" | "success";
} | null;

export default function ResetPasswordPageContent({
  onClose,
  token,
}: ResetPasswordPageContentProps) {
  const router = useRouter();
  const { t } = useI18n();
  const resolveHref = useLocalizedHref();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const trimmedToken = token.trim();
  const hasToken = trimmedToken.length > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasToken) {
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({
        variant: "error",
        message: t("auth.resetPassword.errors.passwordMismatch"),
      });
      return;
    }

    setFeedback(null);
    setIsLoading(true);

    try {
      await resetPassword({
        token: trimmedToken,
        newPassword,
      });

      setNewPassword("");
      setConfirmPassword("");
      setIsSuccess(true);
      setFeedback({
        variant: "success",
        message: t("auth.resetPassword.successMessage"),
      });
    } catch (error) {
      setFeedback({
        variant: "error",
        message: error instanceof Error ? error.message : t("auth.resetPassword.errors.generic"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const derivedFeedback =
    feedback ??
    (!hasToken
      ? {
          variant: "error" as const,
          message: t("auth.resetPassword.errors.missingToken"),
        }
      : null);

  return (
    <PasswordRecoveryShell
      titleId="reset-password-title"
      title={t("auth.resetPassword.title")}
      subtitle={
        hasToken
          ? t("auth.resetPassword.subtitle")
          : t("auth.resetPassword.invalidLinkSubtitle")
      }
      onClose={onClose}
    >
      {derivedFeedback ? (
        <Notification
          variant={derivedFeedback.variant}
          size="small"
          message={derivedFeedback.message}
          onClose={feedback ? () => setFeedback(null) : undefined}
          closeLabel={t("common.close")}
          className={styles.notice}
        />
      ) : null}

      {isSuccess ? (
        <div className={styles.actions}>
          <Button
            text={t("auth.resetPassword.loginAction")}
            variant="primary"
            type="button"
            onClick={() => router.replace(resolveHref("/login"))}
          />
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>{t("auth.resetPassword.newPasswordLabel")}</span>
            <TextField
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
                if (feedback) {
                  setFeedback(null);
                }
              }}
              autoComplete="new-password"
              required
              disabled={isLoading || !hasToken}
              passwordToggle
              showPasswordLabel={t("common.password.show")}
              hidePasswordLabel={t("common.password.hide")}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>{t("auth.resetPassword.confirmPasswordLabel")}</span>
            <TextField
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                if (feedback) {
                  setFeedback(null);
                }
              }}
              autoComplete="new-password"
              required
              disabled={isLoading || !hasToken}
              passwordToggle
              showPasswordLabel={t("common.password.show")}
              hidePasswordLabel={t("common.password.hide")}
            />
          </label>

          <p className={styles.helperText}>{t("auth.resetPassword.passwordHint")}</p>

          <div className={styles.actions}>
            <Button
              text={
                isLoading
                  ? t("auth.resetPassword.submitLoading")
                  : t("auth.resetPassword.submitButton")
              }
              variant="primary"
              type="submit"
              disabled={isLoading || !hasToken}
              onClick={() => {}}
            />

            <button
              type="button"
              className={styles.actionLink}
              onClick={() => router.replace(resolveHref("/login"))}
            >
              {t("auth.resetPassword.backToLogin")}
            </button>
          </div>
        </form>
      )}
    </PasswordRecoveryShell>
  );
}
