import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/dashboard-shell"
import { DeleteAccount } from "@/components/delete-account"
import { Header } from "@/components/header"
import { UserNameForm } from "@/components/user-name-form"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  //todo: aggiungo back button che va a /content

  return (
    <DashboardShell>
      <Header heading="Settings" text="Manage account and website settings." />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
        <DeleteAccount userId={user.id} />
      </div>
    </DashboardShell>
  )
}
