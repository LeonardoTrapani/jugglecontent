import { ContentType } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
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

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const json = await req.json()
    const body = originalCreateSchema.parse(json)

    const { captions, thumbnail, title } = await youtubeParser(body.url)

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
