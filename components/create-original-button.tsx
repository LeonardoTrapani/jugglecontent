"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContentType, User } from "@prisma/client"
import { useForm } from "react-hook-form"
import { Balancer } from "react-wrap-balancer"
import { z } from "zod"

import { formatContentType } from "@/lib/prompt/repurpose"
import { originalCreateSchema } from "@/lib/validations/original"
import { Button, ButtonProps } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

import { Textarea } from "./ui/textarea"

interface OriginalCreateButtonProps extends ButtonProps {
  user?: User
}

type FormData = z.infer<typeof originalCreateSchema>

export function OriginalCreateButton({
  user,
  ...props
}: OriginalCreateButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(originalCreateSchema),
    defaultValues: {
      url: "",
      text: "",
      title: "",
      type: "youtubeVideo",
    },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)

    const response = await fetch("/api/content/original", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    setLoading(false)

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

    router.push(`/content/${content.original.id}`)
  }

  const selectValue = form.watch("type")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>
          <Icons.add className="mr-2 size-4" />
          New Content
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Content</DialogTitle>
          <DialogDescription>
            <Balancer>
              Please fill out the form below to create a new piece of content to
              repurpose.
            </Balancer>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of the content" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value={ContentType.youtubeVideo}>
                          Youtube Video
                        </SelectItem>
                        <SelectItem value={ContentType.blog}>Blog</SelectItem>
                        <SelectItem value={ContentType.tweet}>
                          Twitter Thread
                        </SelectItem>
                        <SelectItem value={ContentType.linkedinPost}>
                          LinkedIn Post
                        </SelectItem>
                        <SelectItem value={ContentType.newsletter}>
                          Newsletter Mail
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectValue === ContentType.youtubeVideo ? (
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {formatContentType(selectValue) + " Url"}
                    </FormLabel>
                    <Input
                      id="url"
                      placeholder={
                        selectValue === ContentType.youtubeVideo
                          ? "https://youtube.com/watch?v=..."
                          : selectValue === ContentType.linkedinPost
                          ? "https://www.linkedin.com/feed/..."
                          : "https://x.com/..."
                      }
                      size={32}
                      {...field}
                    />
                    <FormDescription>
                      The URL of the {formatContentType(selectValue)} you want
                      to repurpose.
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
                        placeholder={formatContentType(selectValue) + " title"}
                        size={32}
                        {...field}
                      />
                      <FormDescription>
                        The title of the {formatContentType(selectValue)} you
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
                        {formatContentType(selectValue)} you want to repurpose
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </>
            )}
            <DialogFooter>
              <Button type="submit" className="mt-2">
                {loading && (
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                )}
                Create Content
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
