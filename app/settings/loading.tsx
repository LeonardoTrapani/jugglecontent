import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { DeleteAccount } from "@/components/delete-account"
import { Header } from "@/components/header"
import { Icons } from "@/components/icons"
import { UserNameForm } from "@/components/user-name-form"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsLoading() {
  const user = await getCurrentUser()

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
      <Header heading="Settings" text="Manage account and website settings." />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
        <DeleteAccount userId={user.id} />
      </div>
    </div>
  )
}
