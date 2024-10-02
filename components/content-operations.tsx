"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Content, ContentType, Original } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { formatContentType } from "@/lib/prompt/repurpose"
import { contentSchema } from "@/lib/validations/content"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"

type FormData = z.infer<typeof contentSchema>

async function deleteContent(contentId: string, isExample?: boolean) {
  const response = await fetch(
    `/api/content/${isExample ? "example" : "original"}/${contentId}`,
    {
      method: "DELETE",
    }
  )

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: `The ${
        isExample ? "example" : "content"
      } was not deleted. Please try again.`,
      variant: "destructive",
    })
  }
  return true
}

interface ContntOperationsProps {
  contentId: Original["contentId"]
  content: Pick<Content, "updatedAt" | "id" | "type" | "title" | "text" | "url">
  isExample?: boolean
}

export function ContentOperations({
  contentId,
  isExample,
  content,
}: ContntOperationsProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [isEditLoading, setIsEditLoading] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      url: content.url ?? "",
      type: content.type,
      isExample,
      title: content.title,
      text: content.text,
    },
  })

  const onEditSubmit = async (data: FormData) => {
    setIsEditLoading(true)

    const res = await fetch(
      `/api/content/${data.isExample ? "example" : "original"}/` + contentId,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )

    if (!res.ok) {
      if (res.status === 403) {
        return toast({
          title: "Authorization error",
          description:
            "You do not have access to edit this content. Please contact support.",
          variant: "destructive",
        })
      }

      return toast({
        title: "An error has occurred",
        description: "Please try again later.",
        variant: "destructive",
      })
    }

    form.reset()

    router.refresh()

    setIsEditLoading(false)
    setIsEditOpen(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex !aspect-square h-8 !w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="size-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex cursor-pointer items-center"
            onSelect={() => setIsEditOpen(true)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this{" "}
              {isExample ? "example" : "content"}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteContent(contentId, isExample)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 size-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog
        open={isEditOpen}
        onOpenChange={(open) => setIsEditOpen(open)}
        key={contentId}
      >
        <DialogContent
          className="sm:max-w-[425px] max-h-[90vh] overflow-y-scroll"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Edit {isExample ? "Example" : "Content"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onEditSubmit)}
              className="space-y-6"
            >
              {content.type === ContentType.youtubeVideo ? (
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {formatContentType(content.type) + " Url"}
                      </FormLabel>
                      <Input
                        id="url"
                        placeholder={
                          content.type === ContentType.youtubeVideo
                            ? "https://youtube.com/watch?v=..."
                            : content.type === ContentType.linkedinPost
                            ? "https://www.linkedin.com/feed/..."
                            : "https://x.com/..."
                        }
                        size={32}
                        {...field}
                      />
                      <FormDescription>
                        The URL of the {formatContentType(content.type)} you
                        want to repurpose (need access to the{" "}
                        {formatContentType(content.type)})
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <Input
                          id="title"
                          placeholder={
                            formatContentType(content.type) + " title"
                          }
                          size={32}
                          {...field}
                        />
                        <FormDescription>
                          The title of the {formatContentType(content.type)} you
                          want to repurpose.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <Textarea id="text" {...field} />
                        <FormMessage />
                        <FormDescription>
                          Paste here the content of the{" "}
                          {formatContentType(content.type)} you want to edit
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </>
              )}
              <DialogFooter>
                <Button type="submit" className="mt-2">
                  {isEditLoading && (
                    <Icons.spinner className="mr-2 size-4 animate-spin" />
                  )}
                  Edit {isExample ? "Example" : "Content"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
