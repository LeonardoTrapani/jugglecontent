"use client"

import { useState } from "react"
import { CheckIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import { Loader } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

type Interval = "month" | "year"

export const toHumanPrice = (price: number, decimals: number = 2) => {
  return Number(price / 100).toFixed(decimals)
}
const prices = [
  {
    id: "price_1",
    name: "Free Trial",
    description: "Get a taste of juggling",
    features: ["3 Content Repurposing Credits"],
    monthlyPrice: 0,
    yearlyPrice: 10000,
    isMostPopular: false,
  },
  {
    id: "price_2",
    name: "Juggler",
    description: "A premium plan for scaling your media presence, fast",
    features: [
      "Unlimited Content Repurposing Credits",
      "Unlimited Priority support",
      "Join our community of content hackers",
      "Tailored growth plan",
      "Generate LinkedIn posts",
      "Generate Youtube video scripts",
      "Generate Podcast scripts",
      "Generate Blog posts",
      "Generate X threads",
      "Generate Newsletter posts",
      "Generate Discord announcements",
    ],
    monthlyPrice: 3500,
    yearlyPrice: 20000,
    isMostPopular: true,
  },
  {
    id: "price_3",
    name: "Enterprise",
    description:
      "An enterprise plan with advanced features for large organizations",
    features: [
      "Everything that you get with Juggler",
      "Custom solutions to grow your business",
      "Access to our proprietary API",
    ],
    monthlyPrice: 99900,
    yearlyPrice: 50000,
    isMostPopular: false,
  },
]

export default function PricingSection() {
  const [interval, setInterval] = useState<Interval>("month")
  const [isLoading, setIsLoading] = useState(false)
  const [id, setId] = useState<string | null>(null)

  const onSubscribeClick = async (priceId: string) => {
    setIsLoading(true)
    setId(priceId)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate a delay
    // TODO: navigate to stripe page
    setIsLoading(false)
  }

  return (
    <section id="pricing">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h4 className="text-xl font-bold tracking-tight text-black dark:text-white">
            Pricing
          </h4>

          <h2 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
            Simple pricing for everyone.
          </h2>

          <p className="mt-6 text-xl leading-8 text-black/80 dark:text-white">
            Choose an <strong>affordable plan</strong> that&apos;s packed with
            the best features for engaging your audience, creating customer
            loyalty, and driving sales.
          </p>
        </div>

        <div className="mx-auto grid w-full justify-center sm:grid-cols-1 lg:grid-cols-3 flex-col gap-4">
          {prices.map((price, idx) => (
            <div
              key={price.id}
              className={cn(
                "relative flex max-w-[400px] flex-col gap-8 rounded-2xl border p-4 text-black dark:text-white overflow-hidden",
                {
                  "border-2 border-[var(--color-one)] dark:border-[var(--color-one)]":
                    price.isMostPopular,
                }
              )}
            >
              <div className="flex items-center">
                <div className="ml-4">
                  <h2 className="text-base font-semibold leading-7">
                    {price.name}
                  </h2>
                  <p className="h-12 text-sm leading-5 text-black/70 dark:text-white">
                    {price.description}
                  </p>
                </div>
              </div>

              <motion.div
                key={`${price.id}-${interval}`}
                initial="initial"
                animate="animate"
                variants={{
                  initial: {
                    opacity: 0,
                    y: 12,
                  },
                  animate: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + idx * 0.05,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="flex flex-row gap-1"
              >
                {price.name === "Enterprise" ? (
                  <span className="text-3xl font-bold text-black dark:text-white">
                    Custom Price
                  </span>
                ) : (
                  <span className="text-4xl font-bold text-black dark:text-white">
                    $
                    {interval === "year"
                      ? toHumanPrice(price.yearlyPrice, 0)
                      : toHumanPrice(price.monthlyPrice, 0)}
                    <span className="text-xs"> / {interval}</span>
                  </span>
                )}
              </motion.div>

              <Button
                className={cn(
                  "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                  "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
                )}
                disabled={isLoading}
                onClick={() => void onSubscribeClick(price.id)}
              >
                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black" />
                {(!isLoading || (isLoading && id !== price.id)) && (
                  <p>Subscribe</p>
                )}

                {isLoading && id === price.id && <p>Subscribing</p>}
                {isLoading && id === price.id && (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                )}
              </Button>

              <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0" />
              {price.features && price.features.length > 0 && (
                <ul className="flex flex-col gap-2 font-normal">
                  {price.features.map((feature: any, idx: any) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-xs font-medium text-black dark:text-white"
                    >
                      <CheckIcon className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white" />
                      <span className="flex">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
