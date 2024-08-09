import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { exampleCreateSchema } from "@/lib/validations/example"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const exampleContent = await db.content.findMany({
      select: {
        id: true,
        title: true,
        extraInfo: true,
        updatedAt: true,
        createdAt: true,
      },
      where: {
        example: {
          userId: user.id,
        },
      },
    })

    return new Response(JSON.stringify(exampleContent))
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
    const body = exampleCreateSchema.parse(json)

    const post = await db.content.create({
      data: {
        title: body.title,
        url: body.url,
        type: body.type,
        text: body.text,
        example: {
          create: {
            userId: user.id,
          },
        },
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(post))
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
