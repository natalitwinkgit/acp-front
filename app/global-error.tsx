"use client";

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const bodyStyle = {
  margin: 0,
  fontFamily: "var(--font-roboto, sans-serif)",
  background: "#f7f9fb",
  color: "#17324d",
} as const;

const shellStyle = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "24px",
} as const;

const cardStyle = {
  width: "100%",
  maxWidth: "560px",
  borderRadius: "24px",
  background: "#ffffff",
  padding: "32px",
  boxShadow: "0 18px 40px rgba(10, 35, 66, 0.12)",
  textAlign: "center",
} as const;

const buttonStyle = {
  marginTop: "20px",
  border: "none",
  borderRadius: "999px",
  background: "#d8ad2f",
  color: "#183b56",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 700,
  padding: "12px 20px",
} as const;

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  const message = error.message?.trim() || "Сталася критична помилка.";

  return (
    <html lang="uk">
      <body style={bodyStyle}>
        <div style={shellStyle}>
          <div style={cardStyle} role="alert">
            <h2>Сторінку тимчасово недоступно</h2>
            <p>{message}</p>
            <button type="button" style={buttonStyle} onClick={reset}>
              Перезавантажити
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
