import * as z from "zod"

export const originalCreateSchema = z.object({
  url: z
    .string()
    .regex(
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/,
      "Invalid youtube url"
    ),
})

export const originalPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  extraInfo: z.string().optional(),
  text: z.string().optional(),
})
