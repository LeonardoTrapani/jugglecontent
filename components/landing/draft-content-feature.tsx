"use client"

import React, { ReactElement } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export const List = React.memo(
  ({
    className,
    children,
  }: {
    className?: string
    children: React.ReactNode
    delay?: number
  }) => {
    const childrenArray = React.Children.toArray(children)

    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        {childrenArray.map((item) => (
          <AnimatedListItem key={(item as ReactElement).key}>
            {item}
          </AnimatedListItem>
        ))}
      </div>
    )
  }
)

List.displayName = "AnimatedList"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

let notifications = [
  {
    name: "YouTube Video Repurposed",
    description: "Your YouTube video has been repurposed.",
    time: "15m ago",
    icon: "🎥",
    color: "#FF0000",
  },
  {
    name: "LinkedIn Post Generated",
    description: "A LinkedIn post has been created from your video.",
    time: "10m ago",
    icon: "🔗",
    color: "#0077B5",
  },
  {
    name: "Podcast Episode Released",
    description: "Your video has been turned into a podcast episode.",
    time: "1m ago",
    icon: "🎙️",
    color: "#4A90E2",
  },
  {
    name: "X Thread Created",
    description: "A Twitter thread summarizing your video is ready.",
    time: "30s ago",
    icon: "🐦",
    color: "#1DA1F2",
  },
]

notifications = Array.from({ length: 10 }, () => notifications).flat()

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full sm:max-w-[400px] max-w-[300px] transform cursor-pointer overflow-hidden rounded-lg p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

export function DraftContentFeature() {
  return (
    <div className="relative flex h-[500px] w-full max-w-[32rem] transform-gpu flex-col justify-between overflow-hidden rounded-lg border bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
      <div className="absolute inset-0 flex items-center justify-center">
        <List className="py-4">
          {notifications.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </List>
      </div>
    </div>
  )
}
