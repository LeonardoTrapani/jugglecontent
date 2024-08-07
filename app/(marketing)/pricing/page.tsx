import { Metadata } from "next"

import { freePlan, proPlan } from "@/config/subscriptions"
import { PlanShowcase } from "@/components/plan-showcase"

export const metadata: Metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-5xl md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Remove the pain during the content creation process.
        </p>
      </div>
      <PlanShowcase plan={freePlan} />
      <PlanShowcase plan={proPlan} />
    </section>
  )
}
