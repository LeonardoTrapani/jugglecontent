import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardShell } from "@/components/dashboard-shell"
import { Icons } from "@/components/icons"

export default function ExampleLoading() {
  return (
    <DashboardShell className="border p-4 rounded">
      <div className="flex justify-between">
        <h1 className={cn("font-heading text-3xl md:text-4xl")}>
          <Skeleton className="h-5 w-1/5" />
        </h1>
        <Link
          href="/examples"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 size-4" />
          Back
        </Link>
      </div>
      <Skeleton className="h-36 w-full" />
    </DashboardShell>
  )
}
