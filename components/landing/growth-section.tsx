import { GrowthFeature } from "./growth-feature"

export function GrowthSection() {
  return (
    <div className="container mx-auto max-w-6xl min-h-[32rem] px-4 py-18 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center justify-center">
        <div className="space-y-4 order-last md:order-first">
          <h2 className="text-2xl font-bold">A Painless growth 💸</h2>
          <p className="text-lg text-gray-400">
            <b>More platforms</b>, more eyeballs 👀, more "who's this awesome
            person?" moments. And the best part? <br /> You're{" "}
            <b>not working your butt off</b> to make it happen. 🎉
          </p>
          <p className="text-lg text-gray-400">
            Creators should do what they're good for: <b>creating</b>. Your
            audience grows, your influence spreads, and your message? It's out
            there doing its thing while you're busy being your{" "}
            <b>creative - fabulous - self</b> ✨. <br />{" "}
            <b>Effortless expansion</b> - yeah, we made that a thing.
          </p>
        </div>
        <div className="order-first md:order-last">
          <GrowthFeature />
        </div>
      </div>
    </div>
  )
}
