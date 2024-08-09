"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Content, ContentType } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { repurposeCreateSchema } from "@/lib/validations/repurpose"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

type CreateRepurposeProps = {
  originalId: string
  text: Content["text"]
}

export function CreateRepurpose({ originalId, text }: CreateRepurposeProps) {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof repurposeCreateSchema>>({
    resolver: zodResolver(repurposeCreateSchema),
    defaultValues: {
      text: text,
      type: "linkedinPost",
    },
  })

  async function onSubmit(data: z.infer<typeof repurposeCreateSchema>) {
    console.log(data)
    setLoading(true)

    const response = await fetch(`/api/content/repurpose/${originalId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    setLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      })
    }

    // This forces a cache invalidation.
    router.refresh()
  }

  return (
    <Card className="sm:w-1/2 md:grow p-2 sm:p-4 flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 justify-between items-center w-full text-sm lg:flex-row lg:text-xl sm:gap-5 md:gap-2"
        >
          <div className="flex md:flex-col lg:flex-row items-center gap-2">
            <p className="font-heading text-base lg:text-xl">Repurpose as</p>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="font-bold min-w-40 text-center">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the platform to repurpose this content on" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ContentType.linkedinPost}>
                        LinkedIn Post
                      </SelectItem>
                      <SelectItem value={ContentType.blog}>
                        Blog Post
                      </SelectItem>
                      <SelectItem value={ContentType.tweet}>
                        Twitter Thread
                      </SelectItem>
                      <SelectItem value={ContentType.newsletter}>
                        Newsletter Email
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Icons.arrowRight className="hidden lg:inline grow" />
          <Button type="submit">
            {loading ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.ai className="mr-2 size-4" />
            )}
            Repurpose
          </Button>
        </form>
      </Form>
    </Card>
  )
}
