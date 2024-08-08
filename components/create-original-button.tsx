"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface CreateOriginalButtonProps extends ButtonProps {}

export function CreateOriginalButton({
  className,
  variant,
  ...props
}: CreateOriginalButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/content/original", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Content Tile",
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: "Limit of one content reached.",
          description: "Please upgrade to the Pro plan.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      })
    }

    const content = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/content/${content.id}`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 size-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 size-4" />
      )}
      New Content
    </button>
  )
}
