import stream from "stream"
import { google } from "googleapis"

const youtube = google.youtube("v3")

function extractVideoId(videoUrl: string): string | null {
  const videoIdMatch = videoUrl.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )

  return videoIdMatch ? videoIdMatch[1] : null
}

export const youtubeParser = async (videoUrl: string, accessToken: string) => {
  console.log("videoUrl", videoUrl, "accessToken", accessToken)
  // Extract video ID from the URL
  const videoId = extractVideoId(videoUrl)

  if (!videoId) {
    throw new Error("Invalid YouTube video URL.")
  }

  const authClient = new google.auth.OAuth2()
  authClient.setCredentials({ access_token: accessToken })

  // Fetch the video info

  // List the captions for the video
  const captionListResponse = await youtube.captions.list({
    part: ["snippet"],
    videoId: videoId,
    auth: authClient,
  })

  console.log("captionListResponse", captionListResponse)

  const captionList = captionListResponse.data.items

  if (!captionList || captionList?.length === 0) {
    throw new Error("No captions found for this video.")
  }

  const captionId = captionList[0].id

  if (!captionId) {
    throw new Error("No captions found for this video.")
  }
  // Download the caption content
  const captionDownloadResponse = await youtube.captions.download(
    {
      id: captionId,
      tfmt: "srt", // 'srt' format
      alt: "media",
      auth: authClient,
    },
    {
      responseType: "stream",
    }
  )

  // Read the stream content into a string
  const contentStream = captionDownloadResponse.data as stream.Readable
  let captionContent = ""

  contentStream.on("data", (chunk) => {
    captionContent += chunk.toString()
  })

  await new Promise<void>((resolve, reject) => {
    contentStream.on("end", resolve)
    contentStream.on("error", reject)
  })

  console.log("captionContent", captionContent)

  const captions = await extractCaptions(captionContent)

  const title = "title"
  const thumbnail = "thumbnail"

  return { captions, title: title, thumbnail }
}

const extractCaptions = async (xmlCaptions: string) => {
  // Remove HTML tags using a regular expression
  const cleanText = xmlCaptions.replace(/<[^>]+>/g, " ")

  return cleanText.trim()
}
