import { DraftContentFeature } from "./draft-content-feature"

export function DraftContentSection() {
  return (
    <div className="container mx-auto max-w-6xl min-h-[32rem] px-4 py-32 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <DraftContentFeature />
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Repurpose your content immediately ⚡️
          </h2>
          <p className="text-lg text-gray-400">
            Ever feel like you're stuck in a content hamster wheel? 🐹 Yeah,
            been there. Here's the deal: with our <b>magic touch</b> (and some
            AI 🪄), you create once and <b>boom</b> - you're everywhere.
          </p>
          <p className="text-lg text-gray-400">
            Think about it. You've got this <b>killer idea</b>, right? Now
            imagine turning that into a <b>snappy tweet</b>, a{" "}
            <b>LinkedIn post</b>, a <b>blog article</b>.. - all at the same
            time!
          </p>
        </div>
      </div>
    </div>
  )
}