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

import { Textarea } from "./ui/textarea"

interface ExampleCreateButtonProps extends ButtonProps {
  user?: User
}

type FormData = z.infer<typeof exampleCreateSchema>

export function ExampleCreateButton({
  user,
  ...props
}: ExampleCreateButtonProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(exampleCreateSchema),
    defaultValues: {
      url: "",
      originalContent: "",
      title: "",
    },
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

    router.refresh()

    setLoading(false)
    setOpen(false)

    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button {...props}>
          <Icons.add className="mr-2 size-4" />
          New Example
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-scroll">
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
