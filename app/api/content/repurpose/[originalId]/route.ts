import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { generateRepurpose } from "@/lib/generate-repurpose"
import { formatContentType } from "@/lib/prompt/repurpose"
import { getUserSubscriptionPlan } from "@/lib/subscription"
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

    const dbUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        extraInfo: true,
        credits: true,
      },
    })

    if (!dbUser) {
      return new Response(null, { status: 404 })
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // If user is on a free plan.
    if (!subscriptionPlan?.isPro) {
      if (dbUser.credits <= 0) {
        throw new RequiresProPlanError()
      }
    }

    const json = await req.json()
    const body = repurposeCreateSchema.parse(json)

    const examples = await db.example.findMany({
      where: {
        userId: user.id,
        content: {
          type: body.type,
        },
      },
      select: {
        content: {
          select: {
            title: true,
            text: true,
          },
        },
      },
    })

    const { stream, getFullResponse } = await generateRepurpose(
      body.type,
      { text: body.text, title: body.title },
      examples.map((example) => example.content),
      dbUser
    )

    let responseStream = new TransformStream()
    let encoder = new TextEncoder()

    const saveContentPromise = getFullResponse().then(async (fullResponse) => {
      await db.content.create({
        data: {
          title:
            body.title + ` (Repurposed for ${formatContentType(body.type)})`,
          url: body.url,
          type: body.type,
          text: fullResponse,
          repurpose: {
            create: {
              originalId: params.originalId,
            },
          },
        },
      })
    })

    if (dbUser.credits > 0) {
      await db.user.update({
        where: { id: user.id },
        data: {
          credits: {
            decrement: 1,
          },
        },
      })
    }

    // Stream the response to the client
    const streamPromise = new Promise<void>(async (resolve) => {
      const writer = responseStream.writable.getWriter()
      const reader = stream.getReader()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        await writer.write(encoder.encode(value))
      }

      writer.close()
      resolve()
    })

    // Wait for both streaming and saving to complete
    Promise.all([streamPromise, saveContentPromise])
      .then(() => {
        console.info("Streaming and saving completed successfully")
      })
      .catch((error) => {
        console.error("Error occurred:", error)
      })

    return new NextResponse(responseStream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error(error)

    if (error instanceof RequiresProPlanError) {
      return new Response(null, { status: 402 })
    }

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
      original: {
        id: originalId,
        userId,
      },
    },
  })

  return count > 0
}
