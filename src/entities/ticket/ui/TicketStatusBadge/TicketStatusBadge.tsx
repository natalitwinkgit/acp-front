import StatusBadge from "@/src/shared/ui/StatusBadge/StatusBadge";
import type { StatusBadgeVariant } from "@/src/shared/ui/StatusBadge/StatusBadge";
import type { TicketStatus } from "../../model/types";

type StatusConfig = {
  label: string;
  variant: StatusBadgeVariant;
};

const STATUS_CONFIG: Record<TicketStatus, StatusConfig> = {
  booked: { label: "Бронь", variant: "warning" },
  paid: { label: "Оплачено", variant: "success" },
};

type Props = {
  status: TicketStatus;
};

export default function TicketStatusBadge({ status }: Props) {
  const { label, variant } = STATUS_CONFIG[status];
  return <StatusBadge label={label} variant={variant} />;
}
