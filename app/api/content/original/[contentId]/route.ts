import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { originalPatchSchema } from "@/lib/validations/original"

const routeContextSchema = z.object({
  params: z.object({
    contentId: z.string(),
  }),
})

export async function DELETE(
  _req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    if (!(await verifyCurrentUserHasAccessToOriginal(params.contentId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the content.
    await db.content.delete({
      where: {
        id: params.contentId as string,
      },
      include: {
        original: {
          where: {
            contentId: params.contentId,
          },
        },
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToOriginal(params.contentId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = originalPatchSchema.parse(json)

    await db.content.update({
      where: {
        id: params.contentId,
      },
      data: {
        title: body.title,
        extraInfo: body.extraInfo,
        text: body.text,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToOriginal(contentId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.content.count({
    where: {
      id: contentId,
      original: {
        userId: session?.user.id,
      },
    },
  })

  return count > 0
}
