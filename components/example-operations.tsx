"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Content, Example } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { exampleCreateSchema } from "@/lib/validations/example"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"

type FormData = z.infer<typeof exampleCreateSchema>

async function deleteExample(contentId: string) {
  const response = await fetch(`/api/content/example/${contentId}`, {
    method: "DELETE",
  })

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "The interview was not deleted. Please try again.",
      variant: "destructive",
    })
  }
  return true
}

interface ExampleOperationsProps {
  contentId: Example["contentId"]
  content: Pick<
    Content,
    "updatedAt" | "id" | "type" | "title" | "originalContent" | "url"
  >
}

export function ExampleOperations({
  contentId,
  content,
}: ExampleOperationsProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [isEditLoading, setIsEditLoading] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(exampleCreateSchema),
    defaultValues: {
      url: content.url ?? "",
      type: content.type === "youtubeVideo" ? undefined : content.type,
      title: content.title,
      originalContent: content.originalContent,
    },
  })

  const onEditSubmit = async (data: FormData) => {
    setIsEditLoading(true)

    const res = await fetch("/api/content/example/" + contentId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      return toast({
        title: "An error has occurred",
        description: "Please try again later.",
        variant: "destructive",
      })
    }

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
              Are you sure you want to delete this content?
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

                const deleted = await deleteExample(contentId)

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
            <DialogTitle>Edit Example</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onEditSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <Input
                      id="title"
                      placeholder="Example Content Title"
                      size={32}
                      {...field}
                    />
                    <FormDescription>
                      The title of the content you want to as example.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type of the content" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Type</SelectLabel>
                          <SelectItem value="newsletter">Newsletter</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                          <SelectItem value="tweet">Twitter Thread</SelectItem>
                          <SelectItem value="linkedinPost">
                            LinkedIn Post
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="originalContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <Textarea
                      id="content"
                      {...field}
                      placeholder={`---
title: "The ultimate stack every full-stack engineer should use"
description: "A presentation of the different technologies that form one of the most modern and efficient tech stacks today."
date: "Aug 1, 2024"
edited: "Aug 3, 2024"
---

## Introduction

We are not in 2010 anymore, with PHP, JQuery and plain SQL... some things changed.

That's why I will give an overview on one of the most popular and modern technologies to create a web application.

**Disclamer**: this is one of the milions of ways to build an application. Use this as a blueprint to build modern applications, and as a presentation of modern technologies to implement in your own ways. Copying a full stack entirely is almost always useless, as each app is different and requires different technologies.

If you speak Italian, I posted a video on Datapizza's youtube channel that you can use as an overview of what I am going to talk about in this blog post, as it can be more entertaining, but less technical and in-depth. Watch it [here](https://www.youtube.com/watch?v=VYwCtJ40H_U)!

## The Goal of the Stack
The Goal of this tech stack is to make the entire infrastructure **type-safe**: from database to front-end, I want to be able to know how the data I have is structured, to make development easier and safer.

![Linting of the structure of the user object, thanks to a type-safe infrastructure](/images/ultimatestack/type-safe.png)`}
                    />
                    <FormMessage />
                    <FormDescription>
                      Paste here the content you want to use as example.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url (optional)</FormLabel>
                    <Input
                      id="url"
                      placeholder="https://youtube.com/watch?v=..."
                      size={32}
                      {...field}
                    />
                    <FormDescription>
                      The URL of the content you want to use as example.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="mt-2">
                  {isEditLoading && (
                    <Icons.spinner className="mr-2 size-4 animate-spin" />
                  )}
                  Edit Example
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
