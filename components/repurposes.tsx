"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Content, ContentType, Repurpose } from "@prisma/client"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { formatContentType } from "@/lib/prompt/repurpose"
import { cn } from "@/lib/utils"
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

import { CreateRepurpose } from "./create-repurpose"
import { Icons } from "./icons"
import { InnerNav } from "./inner-nav"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { toast } from "./ui/use-toast"

type RepurposesProps = {
  originalId: string
  text: Content["text"]
  title: Content["title"]
  repurposes: CustomRepurpose[]
}

export type CustomRepurpose = Pick<Repurpose, "id"> & {
  content: Pick<Content, "text" | "title" | "type" | "id" | "url" | "updatedAt">
}

async function deleteRepurpose(originalId: string, contentId: string) {
  const response = await fetch(
    `/api/content/repurpose/${originalId}/${contentId}`,
    {
      method: "DELETE",
    }
  )

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "The repurpose was not deleted. Please try again.",
      variant: "destructive",
    })
  }
  return true
}

export const Repurposes = (props: RepurposesProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const router = useRouter()

  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const [repurposes, setRepurposes] = useState<
    (CustomRepurpose & {
      isStreaming: boolean
    })[]
  >(props.repurposes.map((repurpose) => ({ ...repurpose, isStreaming: false })))

  const [streamedText, setStreamedText] = useState("")

  const [isRepurposeScreenOpen, setIsRepurposeScreenOpen] = useState(false)

  const markdownRef = useRef<HTMLDivElement>(null)

  const handleCopyText = () => {
    // Get the plain text from the hidden div
    if (markdownRef.current === null) {
      return
    }
    const plainText =
      markdownRef.current.innerText || markdownRef.current.textContent

    if (!plainText) {
      return
    }

    navigator.clipboard.writeText(plainText)

    toast({
      title: "Text copied to clipboard!",
      variant: "default",
    })
  }

  const handleRepurposeClick = (type: ContentType) => {
    setRepurposes((prev) => [
      {
        content: {
          url: "https://example.com",
          id: "streamingidcontent",
          type,
          text: "",
          updatedAt: new Date(),
          title: "New Repurpose",
        },
        id: "streamingid",
        isStreaming: true,
      },
      ...prev,
    ])
    setSelectedIndex(0)
    setIsRepurposeScreenOpen(true)
  }

  useEffect(() => {
    setRepurposes(() =>
      props.repurposes.map((repurpose) => ({
        ...repurpose,
        isStreaming: false,
      }))
    )
  }, [props.repurposes])

  return (
    <>
      <Card className="w-full">
        <CreateRepurpose
          originalId={props.originalId}
          text={props.text}
          title={props.title}
          onRepurposeClick={handleRepurposeClick}
          setStreamedText={setStreamedText}
          onRepurposeDone={() => {
            setRepurposes(() =>
              props.repurposes.map((repurpose) => ({
                ...repurpose,
                isStreaming: false,
              }))
            )
            setStreamedText("")
          }}
        />

        {!!repurposes.length ? (
          <div className={cn("flex self-stretch")}>
            <aside
              className={cn(
                "min-w-[250px] flex-col border-r border-secondary p-4",
                "w-full sm:w-0 md:w-full lg:w-0",
                isRepurposeScreenOpen && "hidden sm:inline md:hidden lg:inline"
              )}
            >
              <InnerNav
                items={repurposes.map((repurpose, i) => ({
                  title: formatContentType(repurpose.content.type, true),
                  href: `/repurposes/${repurpose.id}`,
                  icon: repurpose.content.type,
                  isSelected: selectedIndex === i,
                  onClick: () => {
                    setSelectedIndex(i)
                    setIsRepurposeScreenOpen(true)
                  },
                }))}
              />
            </aside>

            <div
              className={cn(
                "w-full",
                !isRepurposeScreenOpen && "hidden sm:inline md:hidden lg:inline"
              )}
            >
              <div className="flex justify-end gap-4 p-4">
                <Button
                  onClick={() => setIsRepurposeScreenOpen(false)}
                  className={cn(
                    "sm:hidden md:inline lg:hidden",
                    !isRepurposeScreenOpen && "hidden"
                  )}
                  size="square"
                  variant="outline"
                >
                  <Icons.close />
                </Button>
                <div className="grow" />
                <Button
                  onClick={handleCopyText}
                  className={cn()}
                  size="square"
                  variant="outline"
                >
                  <Icons.copy />
                </Button>
                <Button
                  onClick={() => setShowDeleteAlert(true)}
                  className={cn()}
                  size="square"
                  variant="destructive"
                >
                  <Icons.trash />
                </Button>
              </div>
              {repurposes[selectedIndex].isStreaming ? (
                <div className="p-4 w-full ml-8">
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    className="prose dark:prose-invert"
                  >
                    {streamedText}
                  </Markdown>
                </div>
              ) : (
                <div className="p-4 w-full ml-8" ref={markdownRef}>
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    className="prose dark:prose-invert"
                  >
                    {repurposes[selectedIndex].content.text}
                  </Markdown>
                </div>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </Card>
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

                const deleted = await deleteRepurpose(
                  repurposes[selectedIndex].id,
                  repurposes[selectedIndex].content.id
                )

                setSelectedIndex(0)

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
    </>
  )
}
