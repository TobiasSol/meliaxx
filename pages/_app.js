import '../styles/globals.css';
import Head from 'next/head';
import FontProvider from '../components/FontProvider';
import AgeVerificationPreloader from '../components/AgeVerificationPreloader';
import Script from 'next/script';
import OnlyFansBanner from '../components/OnlyFansBanner';
import MaloumBanner from '../components/MaloumBanner';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [ofBannerVisible, setOfBannerVisible] = useState(false);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        {/* Speziell für Safari auf iOS */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-N9D5BB3PRT"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-N9D5BB3PRT');
        `}
      </Script>

      <FontProvider>
        <AgeVerificationPreloader />
        <OnlyFansBanner onVisibilityChange={setOfBannerVisible} />
        <MaloumBanner ofBannerVisible={ofBannerVisible} />
        <Component {...pageProps} />
      </FontProvider>
    </>
  );
}

export default MyApp;