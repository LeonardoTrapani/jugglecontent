import { ContentType } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { contentSchema } from "@/lib/validations/content"
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
    const body = contentSchema.parse(json)

    const {
      text,
      image,
      title,
    }: {
      text: string
      image?: string
      title: string
    } =
      body.type === ContentType.youtubeVideo
        ? await youtubeParser(body.url as string)
        : {
            text: body.text as string,
            image: undefined,
            title: body.title as string,
          }

    const post = await db.content.create({
      data: {
        title: title,
        url: body.url,
        type: body.type,
        text,
        imageUrl: image,
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
