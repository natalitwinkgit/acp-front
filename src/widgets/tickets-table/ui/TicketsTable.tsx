"use client";

import { TicketStatusBadge } from "@/src/entities/ticket";
import type { Ticket } from "@/src/entities/ticket";
import { TicketTimer } from "@/src/features/ticket-timer";
import styles from "./TicketsTable.module.css";

type Props = {
  tickets: Ticket[];
  onDetails: (ticketId: string) => void;
};

export default function TicketsTable({ tickets, onDetails }: Props) {
  if (tickets.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Квитків не знайдено</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th} style={{ width: 48 }}>№</th>
            <th className={styles.th}>Дані</th>
            <th className={styles.th}>Маршрут</th>
            <th className={styles.th}>Дата</th>
            <th className={styles.th}>Квитки</th>
            <th className={styles.th}>Статус</th>
            <th className={styles.th}>Таймер</th>
            <th className={styles.th}>Редагувати</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <TicketRow
              key={ticket.id}
              ticket={ticket}
              rowNumber={index + 1}
              onDetails={onDetails}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

type TicketRowProps = {
  ticket: Ticket;
  rowNumber: number;
  onDetails: (ticketId: string) => void;
};

function TicketRow({ ticket, rowNumber, onDetails }: TicketRowProps) {
  const routeLine = ticket.routeStop
    ? `${ticket.routeFrom}-${ticket.routeTo}`
    : `${ticket.routeFrom} - ${ticket.routeTo}`;

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>
        <span className={styles.rowNumber}>{rowNumber}</span>
      </td>

      <td className={styles.td}>
        <div className={styles.passengerName}>{ticket.passengerName}</div>
        <div className={styles.passengerPhone}>{ticket.passengerPhone}</div>
      </td>

      <td className={styles.td}>
        <div className={styles.route}>{routeLine}</div>
        {ticket.routeStop && (
          <div className={styles.routeStop}>({ticket.routeStop})</div>
        )}
      </td>

      <td className={styles.td}>
        <div className={styles.time}>{ticket.departureTime}</div>
        <div className={styles.date}>{ticket.departureDate}</div>
      </td>

      <td className={styles.td}>
        <div className={styles.ticketCount}>{ticket.ticketCount}</div>
        <div className={styles.price}>{ticket.totalPrice.toLocaleString("uk-UA")} ₴</div>
      </td>

      <td className={styles.td}>
        <TicketStatusBadge status={ticket.status} />
      </td>

      <td className={styles.td}>
        <TicketTimer initialSeconds={ticket.timerSeconds} />
      </td>

      <td className={styles.td}>
        <button
          type="button"
          className={styles.detailsButton}
          onClick={() => onDetails(ticket.id)}
        >
          Деталі
        </button>
      </td>
    </tr>
  );
}
