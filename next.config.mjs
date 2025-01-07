/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'wacbmitvfgopmwvtdkvz.supabase.co' // Add Supabase storage domain
    ],
  },
}

export default nextConfig;