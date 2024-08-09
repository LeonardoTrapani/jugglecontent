import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { originalCreateSchema } from "@/lib/validations/original"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const originalContent = await db.content.findMany({
      select: {
        id: true,
        title: true,
        extraInfo: true,
        updatedAt: true,
        createdAt: true,
      },
      where: {
        original: {
          userId: user.id,
        },
      },
    })

    return new Response(JSON.stringify(originalContent))
  } catch (error) {
    console.error(error)
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // If user is on a free plan.
    // Check if user has reached limit of 3 posts.
    if (!subscriptionPlan?.isPro) {
      const count = await db.content.count({
        where: {
          original: {
            userId: user.id,
          },
        },
      })

      if (count >= 1) {
        throw new RequiresProPlanError()
      }
    }

    const json = await req.json()
    const body = originalCreateSchema.parse(json)

    const text = "todo: transcripted from youtube right here"

    const post = await db.content.create({
      data: {
        title: body.title,
        url: body.url,
        type: body.type,
        text: text,
        original: {
          create: {
            userId: user.id,
          },
        },
      },
      select: {
        id: true,
        original: {
          select: {
            id: true,
          },
        },
      },
    })

    return new Response(JSON.stringify(post))
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}
