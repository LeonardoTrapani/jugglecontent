import Image from "next/image"
import Link from "next/link"
import { Content, Original } from "@prisma/client"

import { cn, formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

import { OriginalOperations } from "./original-operations"

interface OriginalItemProps {
  original: Pick<Original, "id"> & {
    content: Pick<Content, "updatedAt" | "id" | "title" | "imageUrl">
  }
}

export function OriginalItem({ original }: OriginalItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <Image
          src={original.content.imageUrl || "/placeholder.png"}
          alt={original.content.title}
          width={1920}
          height={1080}
          className="w-36 aspect-video"
        />
        <div className="grid max-w-[90%] gap-1">
          <Link
            href={`/content/${original.id}`}
            className={cn("font-semibold hover:underline")}
          >
            {original.content.title}
          </Link>
          <div className="flex flex-col text-sm text-muted-foreground sm:flex-row">
            <p>{formatDate(original.content.updatedAt.toDateString())}</p>
          </div>
        </div>
      </div>
      <OriginalOperations
        originalId={original.id}
        contentId={original.content.id}
      />
    </div>
  )
}

OriginalItem.Skeleton = function SectionItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
