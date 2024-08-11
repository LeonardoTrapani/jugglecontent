import { StarFilledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import Marquee from "@/components/magicui/marquee"

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <span
      className={cn(
        "bg-primary/20 p-1 py-0.5 font-bold text-primary",
        className
      )}
    >
      {children}
    </span>
  )
}

export interface TestimonialCardProps {
  name: string
  role: string
  img?: string
  description: React.ReactNode
  className?: string
  [key: string]: any
}

export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      // light styles
      " border border-neutral-200 bg-white",
      // dark styles
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props} // Spread the rest of the props here
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
      {description}
      <div className="flex flex-row py-1">
        <StarFilledIcon className="size-4 text-yellow-500" />
        <StarFilledIcon className="size-4 text-yellow-500" />
        <StarFilledIcon className="size-4 text-yellow-500" />
        <StarFilledIcon className="size-4 text-yellow-500" />
        <StarFilledIcon className="size-4 text-yellow-500" />
      </div>
    </div>

    <div className="flex w-full select-none items-center justify-start gap-5">
      <img
        src={img}
        className="h-10 w-10 rounded-full  ring-1 ring-border ring-offset-4"
      />

      <div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-xs font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  </div>
)

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Content Strategist",
    img: "https://randomuser.me/api/portraits/men/91.jpg",
    description: (
      <p>
        Juggle Content has completely transformed how we manage and distribute
        our media assets.
        <Highlight>
          Our reach across platforms has expanded exponentially.
        </Highlight>{" "}
        A must-have for any media professional.
      </p>
    ),
  },
  {
    name: "Samantha Lee",
    role: "YouTuber with 50k Subscribers",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    description: (
      <p>
        Using Juggle Content has streamlined my video repurposing process.
        <Highlight>
          My engagement rates have soared on every platform!
        </Highlight>{" "}
        Highly recommend for content creators.
      </p>
    ),
  },
  {
    name: "Raj Patel",
    role: "CEO and Startup Founder",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    description: (
      <p>
        As a startup, we need tools that enhance efficiency. Juggle Content
        delivers by repurposing our content swiftly.
        <Highlight>Our social media presence has doubled.</Highlight> Essential
        for any startup.
      </p>
    ),
  },
  {
    name: "Emily Chen",
    role: "Social Media Manager",
    img: "https://randomuser.me/api/portraits/women/83.jpg",
    description: (
      <p>
        Juggle Content has made managing multiple platforms a breeze.
        <Highlight>
          Our content localization is now seamless and effective.
        </Highlight>{" "}
        Perfect for global teams.
      </p>
    ),
  },
  {
    name: "Michael Brown",
    role: "Digital Marketing Specialist",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    description: (
      <p>
        With Juggle Content, our video content strategy is now data-driven and
        efficient.
        <Highlight>
          We've seen a significant increase in audience engagement.
        </Highlight>{" "}
        A game-changer for digital marketing.
      </p>
    ),
  },
  {
    name: "Linda Wu",
    role: "VP of Content Operations",
    img: "https://randomuser.me/api/portraits/women/5.jpg",
    description: (
      <p>
        Juggle Content's platform has optimized our content distribution
        process.
        <Highlight>
          Efficiency and accuracy in media logistics have never been better.
        </Highlight>{" "}
      </p>
    ),
  },
  {
    name: "Carlos Gomez",
    role: "Head of Digital Strategy",
    img: "https://randomuser.me/api/portraits/men/14.jpg",
    description: (
      <p>
        Integrating Juggle Content has significantly improved our eco-friendly
        content distribution.
        <Highlight>
          Leading the way in sustainable media practices.
        </Highlight>{" "}
        Pioneering change in digital media.
      </p>
    ),
  },
  {
    name: "Aisha Khan",
    role: "Chief Marketing Officer",
    img: "https://randomuser.me/api/portraits/women/56.jpg",
    description: (
      <p>
        Juggle Content's analytics have transformed how we approach content
        trends.
        <Highlight>
          Our campaigns are now data-driven with higher engagement.
        </Highlight>{" "}
        Revolutionizing marketing strategies.
      </p>
    ),
  },
  {
    name: "Tom Chen",
    role: "IT Director",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
    description: (
      <p>
        Implementing Juggle Content in our media systems has improved content
        delivery significantly.
        <Highlight>
          Technology and media working hand in hand for better outreach.
        </Highlight>{" "}
        A milestone in media technology.
      </p>
    ),
  },
  {
    name: "Sofia Patel",
    role: "CEO and Education Innovator",
    img: "https://randomuser.me/api/portraits/women/73.jpg",
    description: (
      <p>
        Juggle Content's AI-driven repurposing has doubled our educational
        content's reach.
        <Highlight>
          Education tailored to every platform's needs.
        </Highlight>{" "}
        Transforming the educational landscape.
      </p>
    ),
  },
  {
    name: "Jake Morrison",
    role: "CTO and Cybersecurity Expert",
    img: "https://randomuser.me/api/portraits/men/25.jpg",
    description: (
      <p>
        With Juggle Content's platform, our content protection levels are
        unmatched.
        <Highlight>Ensuring safety and trust in digital media.</Highlight>{" "}
        Redefining security standards.
      </p>
    ),
  },
  {
    name: "Nadia Ali",
    role: "Creative Director",
    img: "https://randomuser.me/api/portraits/women/78.jpg",
    description: (
      <p>
        Juggle Content's AI has streamlined our creative process, enhancing
        productivity and innovation.
        <Highlight>Bringing creativity and technology together.</Highlight> A
        game-changer for creative industries.
      </p>
    ),
  },
  {
    name: "Omar Farooq",
    role: "Founder and Startup Mentor",
    img: "https://randomuser.me/api/portraits/men/54.jpg",
    description: (
      <p>
        Juggle Content's insights into media ecosystems have been invaluable for
        our growth strategies.
        <Highlight>Empowering startups with data-driven decisions.</Highlight> A
        catalyst for success.
      </p>
    ),
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h3 className="text-center text-sm font-semibold text-gray-500">
            TESTIMONIALS
          </h3>
          <div className="relative mt-6 max-h-[650px] overflow-hidden">
            <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
              {Array(Math.ceil(testimonials.length / 3))
                .fill(0)
                .map((_, i) => (
                  <Marquee
                    vertical
                    key={i}
                    className={cn({
                      "[--duration:60s]": i === 1,
                      "[--duration:30s]": i === 2,
                      "[--duration:70s]": i === 3,
                    })}
                  >
                    {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                      <TestimonialCard {...card} key={idx} />
                    ))}
                  </Marquee>
                ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-white from-20% dark:from-black"></div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-white from-20% dark:from-black"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
