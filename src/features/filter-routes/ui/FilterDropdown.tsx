"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";
import type { TripStatus } from "@/src/entities/trip";
import { Dropdown } from "@/src/shared/ui/Dropdown/Dropdown";

const STATUS_ITEMS: TripStatus[] = [
  "DEPARTED",
  "BOARDING",
  "SCHEDULED",
  "CANCELLED",
];

type FilterDropdownProps = {
  id: string;
  openId: string | null;
  onToggle: (id: string | null) => void;
  onFilterChange: (s?: TripStatus) => void;
};

export function FilterDropdown({
  id,
  openId,
  onToggle,
  onFilterChange,
}: FilterDropdownProps) {
  const { t } = useI18n();

  const items = [
    {
      label: t("dispatcherArea.routes.table.filters.all"),
      onClick: () => onFilterChange(),
    },
    ...STATUS_ITEMS.map((s: TripStatus) => ({
      label: t(`dispatcherArea.routes.table.statuses.${s}`),
      onClick: () => {
        onFilterChange(s);
      },
    })),
  ];

  return <Dropdown id={id} openId={openId} onToggle={onToggle} items={items} hideTrigger />;
}
