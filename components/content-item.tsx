import Image from "next/image"
import Link from "next/link"
import { Content, Original } from "@prisma/client"

import { cn, formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ContentOperations } from "@/components/content-operations"

import { Icons } from "./icons"

interface ContentItemProps {
  externalContent: Pick<Original, "id"> & {
    content: Pick<
      Content,
      "updatedAt" | "id" | "type" | "title" | "text" | "url" | "imageUrl"
    >
  }
  isExample?: boolean
}

export function ContentItem({ externalContent, isExample }: ContentItemProps) {
  const Icon = Icons[externalContent.content.type]

  return (
    <div className="flex items-center justify-between p-4">
      <div className="w-full flex flex-col items-start sm:flex-row sm:items-center gap-4">
        {externalContent.content.imageUrl && (
          <Image
            src={externalContent.content.imageUrl}
            alt={externalContent.content.title}
            width={1920}
            height={1080}
            className="w-36 aspect-video"
          />
        )}
        <div className="grid max-w-[90%] gap-1">
          {isExample ? (
            <p className="font-semibold">{externalContent.content.title}</p>
          ) : (
            <Link
              href={`/${isExample ? "examples" : "content"}/${
                externalContent.id
              }`}
              className={cn("font-semibold hover:underline")}
            >
              {externalContent.content.title}
            </Link>
          )}
          <div className="flex text-sm text-muted-foreground items-center">
            <Icon className="size-4 mr-1" />
            <p>
              {formatDate(externalContent.content.updatedAt.toDateString())}
            </p>
          </div>
        </div>
      </div>
      <ContentOperations
        content={externalContent.content}
        isExample={isExample}
        contentId={externalContent.content.id}
      />
    </div>
  )
}

ContentItem.Skeleton = function SectionItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
