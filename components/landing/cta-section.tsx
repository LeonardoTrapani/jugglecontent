import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Marquee from "@/components/magicui/marquee"

import Logo from "../logo"

const reviews = [
  {
    name: "Emily",
    username: "@emilywrites",
    body: "I've never seen anything like Juggle Content before. It's incredible how it transforms my videos for every platform effortlessly. I love it!",
    img: "https://avatar.vercel.sh/emily",
  },
  {
    name: "Michael",
    username: "@mike_creates",
    body: "I don't know what to say. Juggle Content has left me speechless. This tool is amazing for expanding my content reach!",
    img: "https://avatar.vercel.sh/michael",
  },
  {
    name: "Sophia",
    username: "@sophia_sparks",
    body: "I'm at a loss for words. Juggle Content is fantastic. It simplifies content repurposing, and I love it!",
    img: "https://avatar.vercel.sh/sophia",
  },
  {
    name: "David",
    username: "@daviddesigns",
    body: "Absolutely blown away by Juggle Content! It makes my videos suitable for every platform with ease. Highly recommend!",
    img: "https://avatar.vercel.sh/david",
  },
  {
    name: "Olivia",
    username: "@livycreates",
    body: "Juggle Content is a game changer! I love how it effortlessly repurposes my videos and expands my reach.",
    img: "https://avatar.vercel.sh/olivia",
  },
  {
    name: "Ethan",
    username: "@ethanexplores",
    body: "This tool is amazing! Juggle Content has transformed the way I share my content across platforms. I'm so impressed!",
    img: "https://avatar.vercel.sh/ethan",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-[2rem] border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

export function CallToActionSection() {
  return (
    <section id="cta">
      <div className="py-14">
        <div className="container flex w-full flex-col items-center justify-center p-4">
          <div className="relative flex w-full max-w-6xl flex-col items-center justify-center overflow-hidden rounded-[2rem] border p-10 py-14">
            <div className="absolute rotate-[35deg]">
              <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
                {firstRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s]"
                repeat={3}
              >
                {secondRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
                {firstRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s]"
                repeat={3}
              >
                {secondRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
                {firstRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s]"
                repeat={3}
              >
                {secondRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
            </div>
            <div className="z-10 mx-auto size-24 rounded-[2rem] border bg-white/10 p-3 shadow-2xl backdrop-blur-md dark:bg-black/10 lg:size-32">
              <Logo />
            </div>
            <div className="z-10 mt-4 flex flex-col items-center text-center text-black dark:text-white">
              <h1 className="text-3xl font-bold lg:text-4xl">
                Creators should create.
              </h1>
              <p className="mt-2">
                Start with a free trial. No credit card required.
              </p>
              <a
                href="/"
                className={cn(
                  buttonVariants({
                    size: "lg",
                    variant: "outline",
                  }),
                  "group mt-4 rounded-[2rem] px-6"
                )}
              >
                Get Started
                <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
              </a>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-white to-70% dark:to-black" />
          </div>
        </div>
      </div>
    </section>
  )
}
