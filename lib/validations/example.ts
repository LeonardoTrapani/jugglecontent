import { ContentType } from "@prisma/client"
import * as z from "zod"

export const exampleCreateSchema = z.object({
  title: z.string(),
  type: z.enum([
    ContentType.blog,
    ContentType.tweet,
    ContentType.linkedinPost,
    ContentType.newsletter,
  ]),
  url: z.string().url().or(z.literal("")),
  originalContent: z.string(),
})

export const examplePatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  url: z.string().url().or(z.literal("")).optional(),
  extraInfo: z.string().optional(),
  originalContent: z.string().optional(),
})
