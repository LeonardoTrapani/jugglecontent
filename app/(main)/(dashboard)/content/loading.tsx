import { OriginalCreateButton } from "@/components/create-original-button"
import { DashboardShell } from "@/components/dashboard-shell"
import { Header } from "@/components/header"
import { OriginalItem } from "@/components/original-content-item"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <Header heading="Dashboard" text="Create and manage the dashboard.">
        <OriginalCreateButton />
      </Header>
      <div className="divide-border-200 divide-y rounded-md border">
        <OriginalItem.Skeleton />
        <OriginalItem.Skeleton />
        <OriginalItem.Skeleton />
        <OriginalItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
