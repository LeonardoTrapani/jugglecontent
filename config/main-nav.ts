import { MainNavConfig } from "types"

export const mainNavConfig: MainNavConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      sidebarNav: [
        {
          title: "Content",
          href: "/dashboard",
          icon: "dashboard",
        },
        {
          title: "Examples",
          href: "/dashboard/examples",
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
