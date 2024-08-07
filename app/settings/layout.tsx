import { notFound } from "next/navigation"
import { signOut } from "next-auth/react"

import { getCurrentUser } from "@/lib/session"
import { SiteFooter } from "@/components/site-footer"

export default async function SettingsLayout({ children }) {
  const user = await getCurrentUser()

  if (!user) {
    signOut()
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <main className="container flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
      <SiteFooter className="border-t" />
    </div>
  )
}
