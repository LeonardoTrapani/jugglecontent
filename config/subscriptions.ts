import { SubscriptionPlan } from "types"
import { env } from "@/env.mjs"

export enum SubscriptionPlanType {
  Free,
  Pro,
  Enterprise,
}

export const freePlan: SubscriptionPlan = {
  name: "Free Trial",
  type: SubscriptionPlanType.Free,
  description: "Get a taste of juggling",
  stripePriceId: "",
  cost: 0,
  features: ["5 Content Repurposing Credits"],
}

export const proPlan: SubscriptionPlan = {
  name: "Juggler",
  description: "A premium plan for scaling your media presence, fast",
  stripePriceId: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
  type: SubscriptionPlanType.Pro,
  isMostPopular: true,
  cost: 3500,
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
}

export const enterprisePlan: SubscriptionPlan = {
  name: "Enterprise",
  type: SubscriptionPlanType.Enterprise,
  description: "Custom solutions for large organizations.",
  cost: 99,
  features: ["Everything in Pro", "Custom solutions", "Access to our API"],
}
