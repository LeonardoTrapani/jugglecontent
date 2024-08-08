import { MainNavConfig } from "types"

export const mainNavConfig: MainNavConfig = {
  mainNav: [
    {
      title: "Content",
      href: "/content",
      icon: "dashboard",
    },
    {
      title: "Examples",
      href: "/examples",
      icon: "example",
    },
  ],
  sidebarNav: [
    {
      title: "Settings",
      href: "/settings",
      icon: "settings",
    },
    {
      title: "Billing",
      href: "/settings/billing",
      icon: "billing",
    },
  ],
}
