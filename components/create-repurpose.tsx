import { SetStateAction, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Content, ContentType } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { repurposeCreateSchema } from "@/lib/validations/repurpose"
import { Button } from "@/components/ui/button"
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
  title: Content["title"]
  setStreamedText: React.Dispatch<SetStateAction<string>>
  onRepurposeDone: () => void
  onRepurposeClick: (type: ContentType) => void
}

export function CreateRepurpose({
  originalId,
  text,
  title,
  setStreamedText,
  onRepurposeClick,
  onRepurposeDone,
}: CreateRepurposeProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof repurposeCreateSchema>>({
    resolver: zodResolver(repurposeCreateSchema),
    defaultValues: {
      title: title,
      text: text,
      type: "linkedinPost",
    },
  })

  async function onSubmit(data: z.infer<typeof repurposeCreateSchema>) {
    setLoading(true)

    onRepurposeClick(data.type)

    const response = await fetch(`/api/content/repurpose/${originalId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response?.ok || !response.body) {
      setLoading(false)

      if (response.status === 402) {
        return toast({
          title: "You have finished your credits.",
          description: "Please upgrade to the Pro plan.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Something went wrong.",
        description: "Your content was not created. Please try again.",
        variant: "destructive",
      })
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split("\n")

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(5))
            if (data.type === "content_block_delta" && "text" in data.delta) {
              setStreamedText((prev) => prev + data.delta.text)
            }
          } catch (error) {
            console.error("Error parsing SSE data:", error)
          }
        }
      }
    }

    setLoading(false)

    onRepurposeDone()

    router.refresh()
  }

  return (
    <div className="w-full p-2 sm:p-4 flex justify-center items-center border-b border-secondary">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 justify-between items-center w-full text-sm lg:flex-row lg:text-xl sm:gap-5"
        >
          <div className="flex lg:flex-row items-center gap-2">
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
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.ai className="mr-2 size-4" />
            )}
            Repurpose
          </Button>
        </form>
      </Form>
    </div>
  )
}
