import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { ContentItem } from "@/components/content-item"
import { CreateContentButton } from "@/components/create-content-button"
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
      originals: {
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          id: true,
          content: {
            select: {
              updatedAt: true,
              type: true,
              id: true,
              text: true,
              title: true,
              imageUrl: true,
              url: true,
            },
          },
        },
      },
    },
  })

  return (
    <DashboardShell>
      <Header heading="Content" text="Create and manage your content.">
        <CreateContentButton />
      </Header>
      <div>
        {data?.originals?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {data.originals.map((original) => (
              <ContentItem key={original.id} externalContent={original} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="empty" />
            <EmptyPlaceholder.Title>No content</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any content yet. Start creating content.
            </EmptyPlaceholder.Description>
            <CreateContentButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
