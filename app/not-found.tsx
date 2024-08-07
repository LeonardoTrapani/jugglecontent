import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <EmptyPlaceholder className="mx-auto max-w-[800px]">
        <EmptyPlaceholder.Icon name="warning" />
        <EmptyPlaceholder.Title className="font-bold">
          404
        </EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          This post cound not be found. Please try again.
        </EmptyPlaceholder.Description>
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          Back to Main Page
        </Link>
      </EmptyPlaceholder>
    </div>
  )
}
