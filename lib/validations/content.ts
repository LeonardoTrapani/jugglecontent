import { ContentType } from "@prisma/client"
import * as z from "zod"

export const contentSchema = z
  .object({
    url: z.string().optional(),
    text: z.string().optional(),
    type: z.nativeEnum(ContentType),
    title: z.string().optional(),
    isExample: z.boolean().optional(),
    extraInfo: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === ContentType.youtubeVideo) {
      if (data.isExample) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "YouTube videos cannot be used as examples",
        })
      }
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
          message: "Invalid URL",
          path: ["url"],
        })
      }
    } else if (
      data.type === ContentType.blog ||
      data.type === ContentType.newsletter ||
      data.type === ContentType.tweet ||
      data.type === ContentType.linkedinPost
    ) {
      const textValidation = z
        .string()
        .min(1, "Text is required")
        .safeParse(data.text)

      // For tweet and blogs type, text must be present and not empty
      if (!textValidation.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Thread text is required for tweets",
          path: ["text"],
        })
      }

      const titleValidation = z
        .string()
        .min(1, "Title is required")
        .safeParse(data.title)

      if (!titleValidation.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Title is required",
          path: ["title"],
        })
      }
    }
  })
