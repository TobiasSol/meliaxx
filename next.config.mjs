/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Hier können später bei Bedarf erlaubte Domains hinzugefügt werden
  },
}

export default nextConfig;