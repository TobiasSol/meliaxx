import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      <body className="bg-black text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}