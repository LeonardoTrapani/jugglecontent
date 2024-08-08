"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import { Balancer } from "react-wrap-balancer"
import { z } from "zod"

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
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

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
              Please submit the form below to start repurposing a new content.
            </Balancer>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Input
                    id="title"
                    placeholder="Content Title"
                    size={32}
                    {...field}
                  />
                  <FormDescription>
                    The title of the content you want to repurpose.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Youtube Url</FormLabel>
                  <Input
                    id="url"
                    placeholder="https://youtube.com/watch?v=..."
                    size={32}
                    {...field}
                  />
                  <FormDescription>
                    The URL of the youtube video you want to repurpose.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
