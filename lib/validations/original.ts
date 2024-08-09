import { ContentType } from "@prisma/client"
import * as z from "zod"

export const originalCreateSchema = z.object({
  title: z.string(),
  type: z.nativeEnum(ContentType),
  //has to be a youtube url (all the types of youtube urls)
  url: z
    .string()
    .regex(
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/,
      "Invalid youtube url"
    ),
})

export const originalPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  url: z
    .string()
    .regex(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/)
    .optional(),
  extraInfo: z.string().optional(),
  text: z.string().optional(),
})
