"use client"

import { useState } from "react"
import { Content, ContentType, Repurpose } from "@prisma/client"

import { formatContentType } from "@/lib/prompt/repurpose"
import { cn } from "@/lib/utils"

import { CreateRepurpose } from "./create-repurpose"
import { Icons } from "./icons"
import { InnerNav } from "./inner-nav"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

type RepurposesProps = {
  originalId: string
  text: Content["text"]
  title: Content["title"]
  repurposes: CustomRepurpose[]
}

type CustomRepurpose = Pick<Repurpose, "id"> & {
  content: Pick<Content, "text" | "title" | "type" | "id" | "url" | "updatedAt">
}

export const Repurposes = (props: RepurposesProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [repurposes, setRepurposes] = useState<
    (CustomRepurpose & {
      isStreaming: boolean
    })[]
  >(props.repurposes.map((repurpose) => ({ ...repurpose, isStreaming: false })))

  const [streamedText, setStreamedText] = useState("")

  const [isRepurposeScreenOpen, setIsRepurposeScreenOpen] = useState(false)

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

  return (
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
            <div className="flex justify-end">
              <Button
                onClick={() => setIsRepurposeScreenOpen(false)}
                className={cn(
                  "sm:hidden md:inline lg:hidden",
                  !isRepurposeScreenOpen && "hidden"
                )}
                variant="ghost"
              >
                <Icons.close />
              </Button>
            </div>
            {repurposes[selectedIndex].isStreaming ? (
              <div className="p-4 w-full">
                <Skeleton className="w-full h-8" />
                <p>{streamedText}</p>
              </div>
            ) : (
              <div className="p-4">
                <h2 className="font-heading text-lg">
                  {repurposes[selectedIndex].content.title}
                </h2>
                <p>{repurposes[selectedIndex].content.text}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </Card>
  )
}
