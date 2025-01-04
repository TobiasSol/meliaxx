import '../styles/globals.css';
import FontProvider from '../components/FontProvider';
import AgeVerificationPreloader from '../components/AgeVerificationPreloader';

function MyApp({ Component, pageProps }) {
  return (
    <FontProvider>
      <AgeVerificationPreloader />
      <Component {...pageProps} />
    </FontProvider>
  );
}

export default MyApp;