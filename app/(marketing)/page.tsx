import { CallToActionSection } from "@/components/landing/cta-section"
import { DraftContentSection } from "@/components/landing/draft-content-section"
import { FAQSection } from "@/components/landing/faq-section"
import { GrowthSection } from "@/components/landing/growth-section"
import { HeroSection } from "@/components/landing/hero-section"
import { PickBestSection } from "@/components/landing/pick-best-section"
import PricingSection from "@/components/landing/pricing-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import GradualSpacing from "@/components/magicui/gradual-spacing"
import Particles from "@/components/magicui/particles"
import { SphereMask } from "@/components/magicui/sphere-mask"

export default async function Page() {
  return (
    <>
      <HeroSection />
      <SphereMask />
      <GradualSpacing
        className="font-display text-center text-4xl font-bold tracking-[-0.1em] mt-24 text-black dark:text-white md:text-5xl md:leading-[5rem]"
        text="✨ What you'll get ✨"
      />
      <DraftContentSection />
      <GrowthSection />
      <PickBestSection />
      <CallToActionSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#ffffff"}
      />
    </>
  )
}
