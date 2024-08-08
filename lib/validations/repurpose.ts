import { ContentType } from "@prisma/client"
import { z } from "zod"

export const repurposeCreateSchema = z.object({
  title: z.string(),
  type: z.nativeEnum(ContentType),
  url: z.string().url().optional(),
})
