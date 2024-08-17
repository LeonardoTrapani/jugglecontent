"use client"

import { siteConfig } from "@/config/site"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    qa: [
      {
        question: "What is Juggle Content?",
        answer: (
          <span>
            Juggle Content is a platform designed to help users repurpose their
            video content for multiple platforms. It allows you to say things
            once and reach every platform by transforming your videos into
            content optimized for each platform.
          </span>
        ),
      },
    ],
  },
  {
    qa: [
      {
        question: "Who can benefit from using Juggle Content?",
        answer: (
          <span>
            Juggle Content is ideal for content creators, social media managers,
            marketers, and businesses looking to expand their reach across
            multiple platforms. Whether you're a YouTuber, a digital marketer,
            or a media company, Juggle Content can streamline your content
            distribution process.
          </span>
        ),
      },
      {
        question: "Is there a free trial available for Juggle Content?",
        answer: (
          <span>
            Yes, Juggle Content offers a free trial period for new users to
            explore the platform's features and see how it can benefit their
            content strategy.
          </span>
        ),
      },
    ],
  },
  {
    qa: [
      {
        question: "Can Juggle Content integrate with existing video platforms?",
        answer: (
          <span>
            Absolutely! Juggle Content is designed to integrate seamlessly with
            popular video platforms and social media channels, making it easy to
            repurpose and distribute content without disrupting your current
            workflow.
          </span>
        ),
      },
      {
        question: "What kind of support does Juggle Content offer?",
        answer: (
          <span>
            Juggle Content provides comprehensive support through a dedicated
            customer service team ready to assist with any questions or issues
            you may encounter.
          </span>
        ),
      },
    ],
  },
]

export function FAQSection() {
  return (
    <section id="faq">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h4 className="text-xl font-bold tracking-tight text-black dark:text-white">
              FAQs
            </h4>
            <h2 className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-6 text-xl leading-8 text-black/80 dark:text-white">
              Need help with something? Here are some of the most common
              questions we get.
            </p>
          </div>
          <div className="container mx-auto my-12 max-w-6xl">
            {faqs.map((faq, idx) => (
              <section key={idx}>
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col items-center justify-center"
                >
                  {faq.qa.map((faq, idx) => (
                    <AccordionItem
                      key={idx}
                      value={faq.question}
                      className="w-full"
                    >
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
          <h4 className="mb-12 text-center text-sm font-medium tracking-tight text-foreground/80">
            Still have questions? Email us at&nbsp;
            <a href={`mailto:${siteConfig.email}`} className="underline">
              {siteConfig.email}
            </a>
          </h4>
        </div>
      </div>
    </section>
  )
}
