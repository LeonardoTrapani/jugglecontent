import { DraftContentFeature } from "./draft-content-feature"

export function DraftContentSection() {
  return (
    <div className="container mx-auto max-w-6xl min-h-[32rem] px-4 py-8 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <DraftContentFeature />
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Product Feature</h2>
          <p className="text-lg">
            Our product offers an innovative solution that streamlines your
            workflow. With intuitive design and powerful functionality, you'll
            experience increased productivity and efficiency in your daily
            tasks.
          </p>
        </div>
      </div>
    </div>
  )
}
