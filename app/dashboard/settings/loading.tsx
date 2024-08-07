import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardShell } from "@/components/dashboard-shell"
import { Header } from "@/components/header"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <Header heading="Settings" text="Manage account and website settings." />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
