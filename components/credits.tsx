import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { Icons } from "@/components/icons"

export async function Credits() {
  const sessionUser = await getCurrentUser()

  if (!sessionUser) {
    return notFound()
  }

  const { isPro } = await getUserSubscriptionPlan(sessionUser.id)

  if (isPro) return <></>

  const user = await db.user.findUnique({
    where: { id: sessionUser.id },
    select: { credits: true },
  })

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex items-center gap-1">
      <Icons.credits className="size-3" />
      <p>
        <span className="text-sm font-semibold">
          {user.credits}
          <span className="text-sm text-muted-foreground">&nbsp;Credits</span>
        </span>
      </p>
    </div>
  )
}
