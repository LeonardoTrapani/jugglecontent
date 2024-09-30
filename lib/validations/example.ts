import { ContentType } from "@prisma/client"
import * as z from "zod"

export const exampleCreateSchema = z.object({
  title: z.string(),
  type: z.enum([
    ContentType.blog,
    ContentType.tweet,
    ContentType.linkedinPost,
    ContentType.newsletter,
    ContentType.script,
  ]),
  url: z.string().url().or(z.literal("")),
  text: z.string(),
})

export const examplePatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  url: z.string().url().or(z.literal("")).optional(),
  extraInfo: z.string().optional(),
  text: z.string().optional(),
})
