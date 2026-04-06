import DispatcherPage from "@/src/pages-layer/dispatcher/ui/DispatcherPage";

type DispatcherRoutePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? null : value ?? null;
}

export default async function DispatcherRoutePage({ searchParams }: DispatcherRoutePageProps) {
  return <DispatcherPage />;
}
