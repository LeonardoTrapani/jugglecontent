import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "i.ytimg.com",
      "lh3.googleusercontent.com",
    ],
  },
  experimental: {},
}

export default nextConfig
