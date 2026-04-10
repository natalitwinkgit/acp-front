"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";
import RoleWorkspacePageContent from "@/src/pages-layer/role-workspace/ui/RoleWorkspacePageContent";

export default function DispatcherPage() {
  const { t } = useI18n();

  return <RoleWorkspacePageContent title={t("dispatcherArea.sidebar.menu.tickets")} />;
}
