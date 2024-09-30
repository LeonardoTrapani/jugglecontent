import { Content, ContentType, User } from "@prisma/client"

import { anthropic } from "@/lib/anthropic"
import { generateRepurposePrompt } from "@/lib/prompt/repurpose"

export const generateRepurpose = async (
  type: ContentType,
  original: Pick<Content, "text" | "title" | "type">,
  examples: Pick<Content, "text" | "title">[],
  user: Pick<User, "extraInfo">
) => {
  const prompt = generateRepurposePrompt(type, original, examples, user)

  const stream = await anthropic.messages.create({
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
    model: "claude-3-5-sonnet-20240620",
    stream: true,
  })

  let fullResponse = ""

  const customStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta") {
          if ("text" in chunk.delta) {
            fullResponse += chunk.delta.text
            controller.enqueue(`data: ${JSON.stringify(chunk)}\n\n`)
          }
        }
      }
      controller.close()
    },
  })

  return { stream: customStream }
}
