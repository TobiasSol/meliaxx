/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimierungen für Vercel
  // Falls Sie statische Exports verwenden
  // output: 'export',

  images: {
    domains: ['picsum.photos'],
  },

}

export default nextConfig
