import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { DeleteAccount } from "@/components/delete-account"
import { Header } from "@/components/header"
import { Icons } from "@/components/icons"
import { UserDropdown } from "@/components/user-dropdown"
import { UserNameForm } from "@/components/user-name-form"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const sessionUser = await getCurrentUser()

  if (!sessionUser) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const user = await db.user.findUnique({
    where: {
      id: sessionUser.id,
    },
    select: {
      id: true,
    },
  })

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <div>
      <Link
        href="/dashboard"
        className={cn(buttonVariants({ variant: "ghost" }), "mt-4")}
      >
        <Icons.chevronLeft className="mr-2 size-4" />
        Back
      </Link>
      <Header heading="Settings" text="Manage account and website settings.">
        <UserDropdown user={sessionUser} />
      </Header>
      <div className="grid gap-10">
        <UserNameForm
          user={{ id: sessionUser.id, name: sessionUser.name || "" }}
        />
        <DeleteAccount userId={sessionUser.id} />
      </div>
    </div>
  )
}
