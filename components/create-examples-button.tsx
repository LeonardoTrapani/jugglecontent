"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import { Balancer } from "react-wrap-balancer"
import { z } from "zod"

import { exampleCreateSchema } from "@/lib/validations/example"
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

interface ExampleCreateButtonProps extends ButtonProps {
  user?: User
}

type FormData = z.infer<typeof exampleCreateSchema>

export function ExampleCreateButton({
  user,
  ...props
}: ExampleCreateButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(exampleCreateSchema),
    defaultValues: {},
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)

    const res = await fetch("/api/content/example", {
      method: "POST",
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

    const { id } = await res.json()

    router.push("/examples/" + id)

    router.refresh()

    setLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>
          <Icons.add className="mr-2 size-4" />
          New Example
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Example</DialogTitle>
          <DialogDescription>
            <Balancer>
              Please submit the form below to create a new example content.
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
                        <SelectItem value="youtubeVideo">
                          Youtube Video
                        </SelectItem>
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
                {loading && (
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                )}
                Create Example
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
