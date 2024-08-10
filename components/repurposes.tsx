"use client"

import { useState } from "react"
import { Content, ContentType, Repurpose } from "@prisma/client"

import { formatContentType } from "@/lib/prompt/repurpose"

import { CreateRepurpose } from "./create-repurpose"
import { InnerNav } from "./inner-nav"
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
  }

  return (
    <Card className="w-full">
      <CreateRepurpose
        originalId={props.originalId}
        text={props.text}
        title={props.title}
        onRepurposeClick={handleRepurposeClick}
        setStreamedText={setStreamedText}
      />

      {!!repurposes.length ? (
        <div className="flex self-stretch">
          <aside className="min-w-[250px] flex-col border-r border-secondary p-4">
            <InnerNav
              items={repurposes.map((repurpose, i) => ({
                title: formatContentType(repurpose.content.type, true),
                href: `/repurposes/${repurpose.id}`,
                icon: repurpose.content.type,
                isSelected: selectedIndex === i,
                onClick: () => {
                  setSelectedIndex(i)
                },
              }))}
            />
          </aside>

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
      ) : (
        <></>
      )}
    </Card>
  )
}
