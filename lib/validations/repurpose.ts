import { ContentType } from "@prisma/client"
import { z } from "zod"

export const repurposeCreateSchema = z.object({
  title: z.string(),
  url: z.string().url().optional(),
  text: z.string().min(1),
  type: z.enum([
    ContentType.blog,
    ContentType.newsletter,
    ContentType.tweet,
    ContentType.linkedinPost,
  ]),
})
