import { ExampleCreateButton } from "@/components/create-examples-button"
import { DashboardShell } from "@/components/dashboard-shell"
import { ExampleItem } from "@/components/example-content-item"
import { Header } from "@/components/header"

export default function ExampleLoading() {
  return (
    <DashboardShell>
      <Header heading="Dashboard" text="Create and manage the dashboard.">
        <ExampleCreateButton />
      </Header>
      <div className="divide-border-200 divide-y rounded-md border">
        <ExampleItem.Skeleton />
        <ExampleItem.Skeleton />
        <ExampleItem.Skeleton />
        <ExampleItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
