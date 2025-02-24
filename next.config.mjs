/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
   
      {
        protocol: 'http',
        hostname: 'supabasekong-mo4k4og0sgck8k0kg4kk08w4.145.223.103.240.sslip.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'meliaxx.de',
        pathname: '/**',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.stripe.com https://wacbmitvfgopmwvtdkvz.supabase.co http://supabasekong-mo4k4og0sgck8k0kg4kk08w4.145.223.103.240.sslip.io",
              "frame-src 'self' https://js.stripe.com"
            ].join('; ')
          },
        ],
      },
    ];
  },
};

export default nextConfig;