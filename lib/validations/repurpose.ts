import { ContentType } from "@prisma/client"
import { z } from "zod"

export const repurposeCreateSchema = z.object({
  type: z.enum([
    ContentType.blog,
    ContentType.newsletter,
    ContentType.tweet,
    ContentType.linkedinPost,
  ]),
  text: z.string(),
})
