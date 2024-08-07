import { PostCreateButton } from "@/components/create-button"
import { DashboardShell } from "@/components/dashboard-shell"
import { Header } from "@/components/header"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <Header heading="Dashboard" text="Create and manage the dashboard.">
        <PostCreateButton />
      </Header>
      <div className="divide-border-200 divide-y rounded-md border">
        {/* implement skeleton loading */}
      </div>
    </DashboardShell>
  )
}
