import { ContentType } from "@prisma/client"
import * as z from "zod"

export const originalCreateSchema = z
  .object({
    url: z.string().optional(),
    text: z.string().optional(),
    type: z.nativeEnum(ContentType),
  })
  .superRefine((data, ctx) => {
    if (
      data.type === ContentType.youtubeVideo ||
      data.type === ContentType.tweet ||
      data.type === ContentType.linkedinPost
    ) {
      // For youtubeVideo type, url must be present and not empty
      const urlValidation =
        data.type === ContentType.youtubeVideo
          ? z
              .string()
              .regex(
                /^$|^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/,
                "Invalid youtube url"
              )
              .min(1, "URL is required for YouTube videos")
              .safeParse(data.url)
          : z.string().url().min(1).safeParse(data.url)

      if (!urlValidation.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid YouTube URL",
          path: ["url"],
        })
      }
    } else if (
      data.type === ContentType.blog ||
      data.type === ContentType.newsletter
    ) {
      const textValidation = z
        .string()
        .min(1, "Text is required for tweets")
        .safeParse(data.text)

      // For tweet type, text must be present and not empty
      if (!textValidation.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Thread text is required for tweets",
          path: ["text"],
        })
      }
    }
  })

export const originalPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  extraInfo: z.string().optional(),
  text: z.string().optional(),
})
