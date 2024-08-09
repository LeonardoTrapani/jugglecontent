import { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { DashboardShell } from "@/components/dashboard-shell"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Example",
}

interface ExamplePageProps {
  params: { exampleId: string }
}

export default async function ExamplePage({ params }: ExamplePageProps) {
  const sessionUser = await getCurrentUser()

  if (!sessionUser) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const example = await db.example.findFirst({
    where: {
      id: params.exampleId,
      userId: sessionUser.id,
    },
    select: {
      id: true,
      updatedAt: true,
      content: {
        select: {
          updatedAt: true,
          id: true,
          title: true,
          type: true,
          url: true,
          extraInfo: true,
        },
      },
    },
  })

  if (!example) {
    return notFound()
  }

  return (
    <DashboardShell className="border p-4 rounded">
      <div className="flex justify-between">
        <h1 className={cn("font-heading text-3xl md:text-4xl")}>
          {example.content.title}
        </h1>
        <Link
          href="/examples"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 size-4" />
          Back
        </Link>
      </div>
      <div className="flex flex-col">
        <p>
          {example.content.type}, {example.content.url}
        </p>
        <p>{example.content.extraInfo}</p>
      </div>
    </DashboardShell>
  )
}
