import { GrowthFeature } from "./growth-feature"

export function GrowthSection() {
  return (
    <div className="container mx-auto max-w-6xl min-h-[32rem] px-4 py-8 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center justify-center">
        <div className="space-y-4 order-last md:order-first">
          <h2 className="text-2xl font-bold">Product Feature</h2>
          <p className="text-lg">
            Our product offers an innovative solution that streamlines your
            workflow. With intuitive design and powerful functionality, you'll
            experience increased productivity and efficiency in your daily
            tasks.
          </p>
        </div>
        <div className="order-first md:order-last">
          <GrowthFeature />
        </div>
      </div>
    </div>
  )
}
