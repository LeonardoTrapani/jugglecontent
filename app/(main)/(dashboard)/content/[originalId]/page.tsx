import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CreateRepurpose } from "@/components/create-repurpose"
import { DashboardShell } from "@/components/dashboard-shell"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Example",
}

interface ExamplePageProps {
  params: { originalId: string }
}

export default async function ExamplePage({ params }: ExamplePageProps) {
  const sessionUser = await getCurrentUser()

  if (!sessionUser) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const original = await db.original.findFirst({
    where: {
      id: params.originalId,
      userId: sessionUser.id,
    },
    select: {
      id: true,
      updatedAt: true,
      repurposes: {
        select: {
          id: true,
          content: {
            select: {
              updatedAt: true,
              id: true,
              title: true,
              text: true,
              type: true,
              url: true,
              extraInfo: true,
              imageUrl: true,
            },
          },
        },
      },
      content: {
        select: {
          updatedAt: true,
          id: true,
          title: true,
          type: true,
          url: true,
          extraInfo: true,
          imageUrl: true,
        },
      },
    },
  })

  if (!original || !original.content) {
    return notFound()
  }

  return (
    <DashboardShell className="gap-4">
      <div className="flex justify-end">
        <Link
          href="/content"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <Icons.chevronLeft className="mr-2 size-4" />
          Back
        </Link>
      </div>
      <div className="flex flex-col lg:flex-col items-start gap-4 lg:items-center">
        <div className="flex flex-col lg:p-4 gap-2 items-start">
          <h1 className={cn("font-heading text-2xl xl:text-3xl")}>
            {original.content.title}
          </h1>
          <p className="text-gray-500">
            {formatDate(original.content.updatedAt.toDateString())}
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row w-full ">
          <Link
            href={original.content.url || ""}
            target="_blank"
            className="sm:w-1/2 lg:w-1/3 xl:w-80 md:max-w-96 md:self-center"
          >
            <Image
              src={original.content.imageUrl || "/placeholder.jpg"}
              alt={original.content.title}
              width={1920}
              height={1080}
              className="rounded-md w-full"
            />
          </Link>
          <CreateRepurpose
            originalId={params.originalId}
            text={original.content.title}
          />
        </div>
      </div>
    </DashboardShell>
  )
}
