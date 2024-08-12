import { ContentType } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { originalCreateSchema } from "@/lib/validations/original"
import { youtubeParser } from "@/lib/youtube-transcription"

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

    if (!session || !session.accessToken) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    const dbUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        originalsCreated: true,
      },
    })

    if (!dbUser) {
      return new Response("Unauthorized", { status: 403 })
    }

    // If user is on a free plan.
    // Check if user has reached limit of 3 posts.
    if (!subscriptionPlan?.isPro) {
      if (dbUser.originalsCreated >= 3) {
        throw new RequiresProPlanError()
      }
    }

    const json = await req.json()
    const body = originalCreateSchema.parse(json)

    const { captions, thumbnail, title } = await youtubeParser(
      body.url,
      session.accessToken
    )

    const post = await db.content.create({
      data: {
        title: title,
        url: body.url,
        type: ContentType.youtubeVideo,
        text: captions,
        imageUrl: thumbnail,
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

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        originalsCreated: {
          increment: 1,
        },
      },
    })

    return new Response(JSON.stringify(post))
  } catch (error) {
    console.error(error)
    if (error.status === 403) {
      return new Response("You do not have access to this video", {
        status: 403,
      })
    }

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}
