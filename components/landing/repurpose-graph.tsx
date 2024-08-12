"use client"

import React, { forwardRef, useRef } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/magicui/animated-beam"

import instagramImg from "/public/images/instagram.png"
import linkedinImg from "/public/images/linkedin.png"
import logoImg from "/public/images/logo.png"
import mediumImg from "/public/images/medium.png"
import tiktokImg from "/public/images/tiktok.png"
import xImg from "/public/images/x.png"
import youtubeImg from "/public/images/youtube.png"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex sm:size-16 size-14 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  )
})
Circle.displayName = "Circle"

export function RepurposeGraph({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <Image src={youtubeImg} alt="YouTube" width={96} height={96} />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <Image
              src={logoImg}
              alt="YouTube"
              width={96}
              height={96}
              className="rounded-full"
            />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <Image src={linkedinImg} alt="LinkedIn" width={48} height={48} />
          </Circle>
          <Circle ref={div2Ref}>
            <Image src={xImg} alt="Twitter" width={48} height={48} />
          </Circle>
          <Circle ref={div3Ref}>
            <Image src={tiktokImg} alt="Tiktok" width={48} height={48} />
          </Circle>
          <Circle ref={div4Ref}>
            <Image src={instagramImg} alt="Instagram" width={48} height={48} />
          </Circle>
          <Circle ref={div5Ref}>
            <Image src={mediumImg} alt="Medium" width={48} height={48} />
          </Circle>
        </div>
      </div>
      {/* AnimatedBeams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        duration={20}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={20}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={20}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={20}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        duration={20}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={20}
      />
    </div>
  )
}
