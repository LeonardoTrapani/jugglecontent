import { Content, ContentType, User } from "@prisma/client"
import { Pick } from "@prisma/client/runtime/library"

export const formatContentType = (
  type: ContentType,
  forRepurpose?: boolean
) => {
  if (forRepurpose) {
    switch (type) {
      case ContentType.blog:
        return "Blog Repurpose"
      case ContentType.tweet:
        return "Twitter Repurpose"
      case ContentType.newsletter:
        return "Newsletter Repurpose"
      case ContentType.linkedinPost:
        return "Linkedin Repurpose"
      default:
        return "Generic Repurpose"
    }
  }
  switch (type) {
    case ContentType.blog:
      return "Blog Post"
    case ContentType.tweet:
      return "Twitter Thread"
    case ContentType.newsletter:
      return "Newsletter"
    case ContentType.linkedinPost:
      return "Linkedin Post"
    default:
      return "Generic Content"
  }
}
export const generateRepurposePrompt = (
  type: ContentType,
  original: Pick<Content, "text" | "title">,
  examples: Pick<Content, "text" | "title">[],
  user: Pick<User, "extraInfo">
) => {
  const formattedContentType = formatContentType(type)

  return `
You are assisting a user who wants to repurpose a YouTube video transcription into a ${formattedContentType} ${
    !!user.extraInfo ? "for " + user.extraInfo : ""
  }. Your task is to help the user create the ${formattedContentType} by transforming the provided video transcription, making the content suitable for the chosen format.

You will be given the following inputs:

The transcription of the YouTube video that needs to be repurposed:
${original.text}

Examples of existing user-created ${formattedContentType}. Use them as a reference for style, tone and format:
${
  examples.length === 0
    ? "No examples provided."
    : examples
        .map(
          (example) => `
Title: ${example.title}
${example.text}
`
        )
        .join("\n\n")
}

Your task is to create a draft of the ${formattedContentType} based on these inputs. Follow these guidelines:

Maintain the style and tone of the user's existing content, referring to the examples provided.
Reframe the video transcription to fit the structure and tone of the ${formattedContentType}.
Ensure the content is educational, engaging, and suitable for consumption in the chosen format.
Use simple, clear language that can be easily understood by a general audience.
Include relevant statistics, examples, or analogies to illustrate complex concepts if applicable.
Write your draft:

<draft>
</draft>

Remember, this is a draft to speed up the ${formattedContentType} creation process.

Take inspiration from the tone of voice used in the examples provided previously. If examples were not provided, maintain a personal tone of voice, as if the user were writing, including colloquial (but not incorrect) idioms and a friendly "conversation among friends" tone.

As an output, you should only provide the content inside the <draft> tags. Do not include the draft tags themselves, only the content inside it. Do not include any other information or comments in your response. The user will review your draft and make any necessary adjustments before finalizing the ${formattedContentType}.
`
}
