import { CardSkeleton } from "@/components/card-skeleton"
import { CreateExampleButton } from "@/components/create-examples-button"
import { DashboardShell } from "@/components/dashboard-shell"
import { Header } from "@/components/header"

export default function ExampleLoading() {
  return (
    <DashboardShell>
      <Header heading="Dashboard" text="Create and manage the dashboard.">
        <CreateExampleButton />
      </Header>
      <div className="divide-border-200 divide-y rounded-md border">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
