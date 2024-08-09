import { Content, Example } from "@prisma/client"

import { cn, formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

import { ExampleOperations } from "./example-operations"

interface ExampleItemProps {
  example: Pick<Example, "id"> & {
    content: Pick<
      Content,
      "updatedAt" | "id" | "type" | "title" | "originalContent" | "url"
    >
  }
}

export function ExampleItem({ example }: ExampleItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid max-w-[90%] gap-1">
        <p className={cn("font-semibold")}>{example.content.title}</p>
        <div className="flex flex-col text-sm text-muted-foreground sm:flex-row">
          <p>
            {example.content.type},
            {formatDate(example.content.updatedAt.toDateString())}
          </p>
        </div>
      </div>
      <ExampleOperations
        contentId={example.content.id}
        content={example.content}
      />
    </div>
  )
}

ExampleItem.Skeleton = function SectionItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
