import { Content, Example } from "@prisma/client"

import { cn, formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

import { ExampleOperations } from "./example-operations"
import { Icons } from "./icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"

interface ExampleItemProps {
  example: Pick<Example, "id"> & {
    content: Pick<
      Content,
      "updatedAt" | "id" | "type" | "title" | "text" | "url"
    >
  }
}

export function ExampleItem({ example }: ExampleItemProps) {
  const Icon = Icons[example.content.type || "check"]

  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid max-w-[90%] gap-1">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <p
              className={cn(
                "font-semibold hover:underline hover:cursor-pointer"
              )}
            >
              {example.content.title}
            </p>
          </AlertDialogTrigger>
          <AlertDialogContent id={example.id}>
            <AlertDialogHeader>
              <AlertDialogTitle>{example.content.title}</AlertDialogTitle>
              <AlertDialogDescription className="max-h-[70vh] overflow-y-scroll">
                {example.content.text}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="flex flex-col text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center">
            <Icon className="size-4 mr-1" />{" "}
            {formatDate(example.content.updatedAt.toDateString())}
          </div>
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
