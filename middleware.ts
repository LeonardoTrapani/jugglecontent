import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })

    const isMarketingPage =
      req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname === "/pricing" ||
      req.nextUrl.pathname.startsWith("/images") ||
      req.nextUrl.pathname.startsWith("/favicon") ||
      req.nextUrl.pathname.startsWith("/og")
    if (isMarketingPage) {
      return null
    }

    const isStripeWebhook = req.nextUrl.pathname === "/api/webhooks/stripe"
    if (isStripeWebhook) {
      return null
    }

    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    if (isAuthPage) {
      if (isAuth) {
        const from = req.nextUrl.searchParams.get("from")
        if (from) {
          return NextResponse.redirect(new URL(from, req.url))
        }
        return NextResponse.redirect(new URL("/content", req.url))
      }

      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)
