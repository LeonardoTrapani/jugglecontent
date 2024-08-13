import { SiteConfig } from "types"
import { absoluteUrl } from "@/lib/utils"

export const siteConfig: SiteConfig = {
  name: "Juggle Content",
  description:
    "Go from one piece of content to 15. Juggle Content is a content creation tool that helps you create multiple pieces of content from one.",
  url: "https://jugglecontent.com",
  ogImage: absoluteUrl("/og.jpg"),
  email: "redazionelofi@gmail.com,",
  github: "https://github.com/leonardotrapani/jugglecontent",
  keywords: [
    "content creation",
    "content marketing",
    "content strategy",
    "content writing",
    "content creation tool",
  ],
  author: {
    name: "Leonardo Trapani",
    email: "leonard.trapani@gmail.com",
    github: "https://github.com/leonardotrapani",
    linkedin: "https://linkedin.com/in/leonardotrapani",
  },
}
