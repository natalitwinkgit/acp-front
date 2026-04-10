"use client";

import { useI18n } from "@/src/shared/i18n/I18nProvider";

import RoleWorkspacePageContent from "./RoleWorkspacePageContent";

type SectionKey = "routes" | "data" | "analytics" | "statistics" | "settings";

type RoleWorkspaceSectionPageProps = {
  sectionKey: SectionKey;
};

export default function RoleWorkspaceSectionPage({ sectionKey }: RoleWorkspaceSectionPageProps) {
  const { t } = useI18n();

  return <RoleWorkspacePageContent title={t(`dispatcherArea.sidebar.menu.${sectionKey}`)} />;
}
