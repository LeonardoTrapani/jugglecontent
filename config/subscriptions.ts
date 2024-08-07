import { SubscriptionPlan } from "types"
import { env } from "@/env.mjs"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description: "Juggle your content in a limited way.",
  stripePriceId: "",
  cost: 0,
  features: [
    "Three examples of your content",
    "Repurpose to two platforms per content",
    "Script a Blog post",
    "Script a LinkedIn post",
    "Script a Youtube video",
    "Script an Instagram story",
  ],
}

export const proPlan: SubscriptionPlan = {
  name: "Pro",
  description: "Create unlimited content, and juggle it anywhere you want.",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID,
  cost: 35,
  features: [
    "Unlimited contents",
    "Unlimited examples of your work",
    "Unlimited repurposing per content",
    "Give additional instructions",
    "Priority support",
    "Generate Tiktoks, Reels and Shorts",
    "Script Twitter Threads",
    "Generate Instagram Carousels",
    "Script Facebook posts",
    "Script Pinterest pins",
    "Generate a Podcast episode",
    "Script a Newsletter post",
    "Script a Discord announcement",
    "More content types coming soon...",
  ],
}
