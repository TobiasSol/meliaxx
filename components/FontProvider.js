import React from 'react';

const FontProvider = ({ children }) => {
  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: 'Playfair Display';
          src: url('/fonts/PlayfairDisplay-VariableFont_wght.ttf') format('truetype');
          font-weight: 100 900;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Playfair Display';
          src: url('/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf') format('truetype');
          font-weight: 100 900;
          font-style: italic;
          font-display: swap;
        }

        /* Base font settings */
        body {
          font-family: 'Playfair Display', serif;
          font-size: 1.125rem; /* 18px */
          line-height: 1.75;
        }

        /* Heading styles */
        h1 {
          font-size: 3.75rem; /* 60px */
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        h2 {
          font-size: 3rem; /* 48px */
          line-height: 1.2;
          margin-bottom: 1.25rem;
        }

        h3 {
          font-size: 2.25rem; /* 36px */
          line-height: 1.3;
          margin-bottom: 1rem;
        }

        h4 {
          font-size: 1.875rem; /* 30px */
          line-height: 1.4;
          margin-bottom: 1rem;
        }

        h5 {
          font-size: 1.5rem; /* 24px */
          line-height: 1.4;
          margin-bottom: 0.75rem;
        }

        h6 {
          font-size: 1.25rem; /* 20px */
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }

        p {
          margin-bottom: 1.5rem;
        }

        /* Responsive text für mobile Geräte */
        @media (max-width: 768px) {
          body {
            font-size: 1rem; /* 16px */
          }

          h1 {
            font-size: 2.5rem; /* 40px */
          }

          h2 {
            font-size: 2rem; /* 32px */
          }

          h3 {
            font-size: 1.75rem; /* 28px */
          }

          h4 {
            font-size: 1.5rem; /* 24px */
          }

          h5 {
            font-size: 1.25rem; /* 20px */
          }

          h6 {
            font-size: 1.125rem; /* 18px */
          }
        }

        /* Override specific classes */
        .font-coterie, .font-playfair {
          font-family: 'Playfair Display', serif !important;
        }

        /* Zusätzliche Utility-Klassen */
        .text-xl {
          font-size: 1.25rem; /* 20px */
        }

        .text-2xl {
          font-size: 1.5rem; /* 24px */
        }

        .text-3xl {
          font-size: 1.875rem; /* 30px */
        }

        .text-4xl {
          font-size: 2.25rem; /* 36px */
        }
      `}</style>
      {children}
    </>
  );
};

export default FontProvider;