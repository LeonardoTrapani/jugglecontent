import ytdl from "@distube/ytdl-core"
import axios from "axios"

export const youtubeParser = async (videoUrl: string) => {
  // Extract video ID from the URL
  const videoId = ytdl.getURLVideoID(videoUrl)
  // Fetch the video info
  const info = await ytdl.getInfo(videoId)

  const title = info.videoDetails.title

  const thumbnail =
    info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url

  // Find the captions URL in the video details
  const tracks =
    info.player_response.captions?.playerCaptionsTracklistRenderer.captionTracks

  if (!tracks || tracks.length === 0) {
    throw new Error("No captions found")
  }

  // Assuming the first track is the desired one
  const captionUrl = tracks[0].baseUrl

  // Fetch the caption file content
  const { data } = await axios.get(captionUrl, {
    responseType: "text",
  })

  const captions = await extractCaptions(data)

  return { text: captions, title: title, image: thumbnail }
}

const extractCaptions = async (xmlCaptions: string) => {
  // Remove HTML tags using a regular expression
  const cleanText = xmlCaptions.replace(/<[^>]+>/g, " ")

  return cleanText.trim()
}
