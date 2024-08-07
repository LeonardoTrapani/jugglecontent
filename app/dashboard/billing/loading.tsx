import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardShell } from "@/components/dashboard-shell"
import { Header } from "@/components/header"

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <Header
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
