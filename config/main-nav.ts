import { MainNavConfig } from "types"

export const mainNavConfig: MainNavConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/content",
      sidebarNav: [
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
    },
    {
      title: "Settings",
      href: "/settings",
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
    },
  ],
}
