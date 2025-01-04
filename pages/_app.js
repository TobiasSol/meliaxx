import '../styles/globals.css';
import FontProvider from '../components/FontProvider';

function MyApp({ Component, pageProps }) {
  return (
    <FontProvider>
      <Component {...pageProps} />
    </FontProvider>
  );
}

export default MyApp;