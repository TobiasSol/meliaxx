import React from 'react';

const FontProvider = ({ children }) => {
  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: 'Evogria';
          src: url('/fonts/Evogria.woff2') format('woff2'),
               url('/fonts/Evogria.woff') format('woff'),
               url('/fonts/Evogria.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        /* Base font settings */
        body {
          font-family: 'Evogria', sans-serif;
        }

        /* Heading styles */
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Evogria', sans-serif;
        }

        /* Override specific classes that were using other fonts */
        .font-coterie {
          font-family: 'Evogria', sans-serif !important;
        }

        .font-playfair {
          font-family: 'Evogria', sans-serif !important;
        }
      `}</style>
      {children}
    </>
  );
};

export default FontProvider;