import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { CreateOriginalButton } from "@/components/create-original-button"
import { DashboardShell } from "@/components/dashboard-shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const data = await db.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      originals: true,
    },
  })

  return (
    <DashboardShell>
      <Header heading="Content" text="Create and manage your content.">
        <CreateOriginalButton />
      </Header>
      <div>
        {data?.originals?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {data.originals.map((original) => (
              <div>implement your component</div>
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="empty" />
            <EmptyPlaceholder.Title>No content</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any content yet. Start creating content.
            </EmptyPlaceholder.Description>
            <CreateOriginalButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
