import { ContentType } from "@prisma/client"
import * as z from "zod"

export const originalCreateSchema = z.object({
  title: z.string(),
  type: z.nativeEnum(ContentType),
  url: z.string().url().optional(),
})

export const originalPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  url: z.string().url().optional(),
  extraInfo: z.string().optional(),
  originalContent: z.string().optional(),
})
