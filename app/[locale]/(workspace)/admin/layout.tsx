import { RoleAccessGate } from "@/src/features/access-control";
import RoleWorkspaceShell from "@/src/pages-layer/role-workspace/ui/RoleWorkspaceShell";

export default function AdminWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleAccessGate allowedRoles={["ADMIN"]}>
      <RoleWorkspaceShell basePath="/admin" defaultRoleLabel="Admin">
        {children}
      </RoleWorkspaceShell>
    </RoleAccessGate>
  );
}
