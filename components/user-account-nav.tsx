"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MainNavConfig } from "@/types"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
  mainNavConfig: MainNavConfig
}

export function UserAccountNav({ user, mainNavConfig }: UserAccountNavProps) {
  const pathname = usePathname()

  const isDashboard = pathname?.includes("/dashboard")
  const sidebarNavItems = isDashboard
    ? mainNavConfig.mainNav[0].sidebarNav
    : mainNavConfig.mainNav[1].sidebarNav

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="size-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {sidebarNavItems?.map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link hidden={item.disabled} href={item.href ?? "/"}>
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
