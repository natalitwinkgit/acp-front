import styles from "../BookingForm.module.css";

type BookingStatusProps = {
  statusMessage: string;
  isError: boolean;
  isBootstrapping: boolean;
  loadingText: string;
};

export default function BookingStatus({
  statusMessage,
  isError,
  isBootstrapping,
  loadingText,
}: BookingStatusProps) {
  return (
    <>
      {statusMessage ? (
        <div className={`${styles.status} ${isError ? styles.statusError : styles.statusInfo}`}>
          {statusMessage}
        </div>
      ) : null}

      {isBootstrapping ? (
        <div className={styles.status}>{loadingText}</div>
      ) : null}
    </>
  );
}
