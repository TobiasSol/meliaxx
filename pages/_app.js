import '../styles/globals.css';
import Head from 'next/head';
import FontProvider from '../components/FontProvider';
import AgeVerificationPreloader from '../components/AgeVerificationPreloader';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <FontProvider>
        <AgeVerificationPreloader />
        <Component {...pageProps} />
      </FontProvider>
    </>
  );
}

export default MyApp;