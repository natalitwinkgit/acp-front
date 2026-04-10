"use client";

import styles from "./role-workspace-page.module.css";

type RoleWorkspacePageContentProps = {
  title: string;
};

export default function RoleWorkspacePageContent({ title }: RoleWorkspacePageContentProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <h1 className={styles.sectionTitle}>{title}</h1>
      </div>
    </section>
  );
}
