import * as React from "react"
import { User } from "@prisma/client"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import PrivacyButton from "@/components/policies/privacy"
import TermsButton from "@/components/policies/terms"
import { UserDropdown } from "@/components/user-dropdown"

interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {
  user?: Pick<User, "image" | "name" | "email">
}

export function SiteFooter({ user, className }: SiteFooterProps) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-2 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo width={30} />
          <p className="text-center text-sm leading-loose md:text-left">
            © 2024 Juggle Content
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <div className="flex gap-2 text-center text-sm leading-loose md:text-left">
            <PrivacyButton />
            <TermsButton />
          </div>
          <div className="flex items-center gap-2">
            {user && <UserDropdown user={user} />}
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
