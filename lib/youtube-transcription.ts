import stream from "stream"
import { google } from "googleapis"

import { youtube } from "@/lib/google"

function extractVideoId(videoUrl: string): string | null {
  const videoIdMatch = videoUrl.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )

  return videoIdMatch ? videoIdMatch[1] : null
}

export const youtubeParser = async (videoUrl: string, accessToken: string) => {
  console.log("using access token ", accessToken)
  // Extract video ID from the URL
  const videoId = extractVideoId(videoUrl)

  if (!videoId) {
    throw new Error("Invalid YouTube video URL.")
  }

  console.log("videoId", videoId)

  const authClient = new google.auth.OAuth2()

  authClient.setCredentials({ access_token: accessToken })

  // Fetch the video info
  const videoInfoResponse = await youtube.videos.list({
    part: ["snippet"],
    auth: authClient,
    id: [videoId],
  })

  if (
    !videoInfoResponse.data.items ||
    videoInfoResponse.data.items.length === 0 ||
    !videoInfoResponse.data.items[0].snippet
  ) {
    throw new Error("No video found with the provided ID")
  }

  const videoInfo = videoInfoResponse.data.items[0].snippet

  const title = videoInfo.title
  const thumbnail = videoInfo.thumbnails?.maxres?.url

  if (!title || !thumbnail) {
    throw new Error("No video found with the provided ID")
  }

  // List the captions for the video
  const captionListResponse = await youtube.captions.list({
    part: ["snippet"],
    videoId: videoId,
    auth: authClient,
  })

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

  const captions = await extractCaptions(captionContent)

  return { text: captions, title: title, image: thumbnail }
}

const extractCaptions = async (xmlCaptions: string) => {
  // Remove HTML tags using a regular expression
  const cleanText = xmlCaptions.replace(/<[^>]+>/g, " ")

  return cleanText.trim()
}
