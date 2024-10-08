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
  title: "Examples",
}

export default async function ExamplePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const data = await db.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      examples: {
        select: {
          id: true,
          content: {
            select: {
              updatedAt: true,
              id: true,
              imageUrl: true,
              title: true,
              type: true,
              text: true,
              url: true,
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  })

  return (
    <DashboardShell>
      <Header
        heading="Examples"
        text="Provide examples of content to show your style and improve the repurposing performance."
      >
        <CreateContentButton isExample />
      </Header>
      <div>
        {data?.examples?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {data.examples.map((example) => (
              <ContentItem
                key={example.id}
                externalContent={example}
                isExample
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="empty" />
            <EmptyPlaceholder.Title>No examples</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any examples yet. Start adding examples.
            </EmptyPlaceholder.Description>
            <CreateContentButton variant="outline" isExample />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
