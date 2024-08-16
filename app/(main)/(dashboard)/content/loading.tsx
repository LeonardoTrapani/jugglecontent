import { ContentItem } from "@/components/content-item"
import { CreateContentButton } from "@/components/create-content-button"
import { DashboardShell } from "@/components/dashboard-shell"
import { Header } from "@/components/header"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <Header heading="Dashboard" text="Create and manage the dashboard.">
        <CreateContentButton />
      </Header>
      <div className="divide-border-200 divide-y rounded-md border">
        <ContentItem.Skeleton />
        <ContentItem.Skeleton />
        <ContentItem.Skeleton />
        <ContentItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
