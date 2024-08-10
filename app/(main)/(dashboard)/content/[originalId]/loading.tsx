import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardShell } from "@/components/dashboard-shell"
import { Icons } from "@/components/icons"

export default function ExampleLoading() {
  return (
    <DashboardShell className="gap-4">
      <div className="flex justify-end">
        <Link
          href="/content"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <Icons.chevronLeft className="mr-2 size-4" />
          Back
        </Link>
      </div>
      <div className="flex flex-col lg:flex-col items-start gap-4 lg:items-center">
        <div className="flex flex-col items-center gap-4 sm:flex-row w-full">
          <Skeleton className="sm:w-1/2 lg:w-1/3 xl:w-80 md:max-w-96 md:self-center" />
          <div className="flex sm:w-2/3 flex-col lg:p-4 gap-2 items-start">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        <Card className="w-full"></Card>
      </div>
    </DashboardShell>
  )
}
