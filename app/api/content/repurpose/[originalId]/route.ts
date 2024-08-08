import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { repurposeCreateSchema } from "@/lib/validations/repurpose"

const routeContextSchema = z.object({
  params: z.object({
    originalId: z.string(),
  }),
})

export async function GET(
  _req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const repurposeContent = await db.content.findMany({
      select: {
        id: true,
        title: true,
        extraInfo: true,
        updatedAt: true,
        createdAt: true,
      },
      where: {
        original: {
          id: params.originalId,
          userId: user.id,
        },
      },
    })

    return new Response(JSON.stringify(repurposeContent))
  } catch (error) {
    console.error(error)
    return new Response(null, { status: 500 })
  }
}

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    if (!(await verifyHasAccessToOriginal(params.originalId, user.id))) {
      return new Response(null, { status: 403 })
    }

    const json = await req.json()
    const body = repurposeCreateSchema.parse(json)

    const post = await db.content.create({
      data: {
        title: body.title,
        url: body.url,
        type: body.type,
        repurpose: {
          create: {
            originalId: params.originalId,
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

const verifyHasAccessToOriginal = async (
  originalId: string,
  userId: string
) => {
  const count = await db.content.count({
    where: {
      id: originalId,
      original: {
        userId,
      },
    },
  })

  return count > 0
}
