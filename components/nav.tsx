"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { MainNavConfig } from "types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface DashboardNavProps {
  mainNavConfig: MainNavConfig
}

export function DashboardNav({ mainNavConfig }: DashboardNavProps) {
  const path = usePathname()

  const isDashboard = path?.includes("/dashboard")
  const sidebarNavItems = isDashboard
    ? mainNavConfig.mainNav[0].sidebarNav
    : mainNavConfig.mainNav[1].sidebarNav

  return (
    <nav className="grid items-start gap-2">
      {sidebarNavItems?.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 size-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
