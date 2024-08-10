import { FileTextIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { BentoCard } from "@/components/magicui/bento-grid"
import Marquee from "@/components/magicui/marquee"

const files = [
  {
    name: "script.txt",
    body: "In this video, we’ll explore effective strategies for repurposing your video content to maximize its reach and impact.",
  },
  {
    name: "linkedin.txt",
    body: "Did you know that repurposing your video content can significantly boost engagement across all platforms?",
  },
  {
    name: "X.txt",
    body: "This visual guide illustrates the step-by-step process of repurposing video content for various social media platforms.",
  },
  {
    name: "podcast_script.txt",
    body: "Welcome to today’s episode, where we discuss the incredible benefits of repurposing video content for your brand.",
  },
  {
    name: "blog_seed.txt",
    body: "Repurposing video content is not just a trend; it’s a vital strategy for maximizing your content's value and reach.",
  },
]

const feature = {
  Icon: FileTextIcon,
  name: "Always pick the best",
  description: "We automatically save your files as you type.",
  href: "/",
  cta: "Get started",
  className: "col-span-3 lg:col-span-1",
  box: true,
  background: (
    <Marquee
      pauseOnHover
      className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
    >
      {files.map((f, idx) => (
        <figure
          key={idx}
          className={cn(
            "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium dark:text-white ">
                {f.name}
              </figcaption>
            </div>
          </div>
          <blockquote className="mt-2 text-xs">{f.body}</blockquote>
        </figure>
      ))}
    </Marquee>
  ),
}

export function PickBestSection() {
  return (
    <div className="container mx-auto max-w-6xl min-h-[32rem] px-4 py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 md:gap-16 items-center">
        <BentoCard {...feature} />
        <div className="space-y-4 sm:pt-0 pt-16">
          <h2 className="text-2xl font-bold">Cherry-Pick the Good Stuff ✅</h2>
          <p className="text-lg text-gray-400">
            Okay, <b>confession time</b>: not every idea is a winner. <br /> But
            what if you could <b>stack the odds in your favor</b>? That's where
            Juggle Content comes in handy. 🎭
          </p>
          <p className="text-lg text-gray-400">
            Instead of wracking your brain for that <b>one perfect post</b>, we
            serve up a <b>smorgasbord of options</b> 🙌🏻. It's like having a room
            full of <b>creative yous</b>, each coming up with a different spin
            on your idea. You get to play <b>content critic</b>, picking the{" "}
            <b>absolute cream of the crop</b>.
          </p>
        </div>
      </div>
    </div>
  )
}
