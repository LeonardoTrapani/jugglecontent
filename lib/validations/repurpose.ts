import { ContentType } from "@prisma/client"
import { z } from "zod"

export const repurposeCreateSchema = z
  .object({
    title: z.string(),
    url: z.string().url().optional(),
    text: z.string().min(1),
    originalType: z.nativeEnum(ContentType),
    type: z.enum([
      ContentType.blog,
      ContentType.newsletter,
      ContentType.tweet,
      ContentType.linkedinPost,
      ContentType.script,
    ]),
  })
  .refine((data) => data.type !== data.originalType, {
    message: "This type is not allowed for this type of content",
    path: ["type"],
  })
