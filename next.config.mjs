/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'supabasekong-mo4k4og0sgck8k0kg4kk08w4.145.223.103.240.sslip.io',
      'meliaxx.de'
    ],
   
  },
  async headers() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: `
                default-src 'self';
                connect-src 'self' 
                  https://api.stripe.com 
                  http://supabasekong-mo4k4og0sgck8k0kg4kk08w4.145.223.103.240.sslip.io
                  https://supabasekong-mo4k4og0sgck8k0kg4kk08w4.145.223.103.240.sslip.io;
                // ... rest of your CSP
              `.replace(/\s{2,}/g, ' ').trim()
            }
          ],
        },
      ];
    }
    return [];
  }
};

export default nextConfig;