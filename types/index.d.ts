import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  github: string
  email: string
  author: Author
  keywords: string[]
}

type Author = {
  name: string
  email: string
  github: string
  linkedin: string
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> &
  (
    | {
        stripeCurrentPeriodEnd: number | null
        isPro: false
      }
    | {
        stripeCurrentPeriodEnd: number
        isPro: true
      }
  )

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId?: string
  cost: number
  features: string[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}
