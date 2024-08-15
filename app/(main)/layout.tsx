import { Suspense } from "react"
import { notFound } from "next/navigation"

import { mainNavConfig } from "@/config/main-nav"
import { getCurrentUser } from "@/lib/session"
import { Skeleton } from "@/components/ui/skeleton"
import { Credits } from "@/components/credits"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={mainNavConfig.mainNav} />

          <div className="flex items-center gap-3">
            <Suspense
              fallback={
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Credits:
                  </span>
                  <div className="flex items-center gap-[2px]">
                    <Icons.credits className="size-3" />
                    <Skeleton className="w-2 h-5" />
                  </div>
                </div>
              }
            >
              <Credits />
            </Suspense>
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
              sidebarNavItems={mainNavConfig.sidebarNav}
            />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav mainNavConfig={mainNavConfig} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
