import '../styles/globals.css';
import Head from 'next/head';
import FontProvider from '../components/FontProvider';
import AgeVerificationPreloader from '../components/AgeVerificationPreloader';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        {/* Speziell für Safari auf iOS */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>
      <FontProvider>
        <AgeVerificationPreloader />
        <Component {...pageProps} />
      </FontProvider>
    </>
  );
}

export default MyApp;