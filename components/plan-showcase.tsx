import Link from "next/link"
import { SubscriptionPlan } from "@/types"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { buttonVariants } from "./ui/button"

export function PlanShowcase({ plan }: { plan: SubscriptionPlan }) {
  return (
    <div className="grid w-full items-center gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
      <div className="grid gap-6">
        <h3 className="text-xl font-bold sm:text-2xl">
          What&apos;s included in the {plan.name} plan
        </h3>
        <PlanFeatures features={plan.features} />
      </div>
      <div className="flex flex-col gap-4 text-center">
        <div>
          <h4 className="text-7xl font-bold">${plan.cost}</h4>
          {plan.stripePriceId && (
            <p className="text-sm font-medium text-muted-foreground">
              Billed Monthly
            </p>
          )}
        </div>
        <Link
          href={plan.stripePriceId ? "/dashboard/billing" : "/signup"}
          className={cn(buttonVariants({ size: "lg" }))}
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

export function PlanFeatures({ features }: { features: string[] }) {
  return (
    <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 max-w-[600px]">
      {features.map((feature, index) => (
        <li className="flex items-center" key={index}>
          <Icons.check className="mr-2 size-4" /> {feature}
        </li>
      ))}
    </ul>
  )
}
