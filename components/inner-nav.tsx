"use client"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface InnerNavProps {
  items: {
    title: string
    onClick: () => void
    icon: keyof typeof Icons
    disabled?: boolean
    isSelected?: boolean
  }[]
}

export function InnerNav({ items }: InnerNavProps) {
  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "check"]
        return (
          <button
            key={index}
            onClick={(event) => {
              event.preventDefault()

              if (item.disabled) {
                return
              }

              item.onClick()
            }}
          >
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                item.isSelected ? "bg-accent" : "transparent",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              <Icon className="mr-2 size-4" />
              <span>{item.title}</span>
            </span>
          </button>
        )
      })}
    </nav>
  )
}
