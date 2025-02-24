import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import styles from '../styles/Portfolio.module.css'
import ChatPopup from '../components/ChatPopup'
import AgeVerificationPreloader from '../components/AgeVerificationPreloader'
import { useState, useEffect } from 'react'

export default function MeliaxNude() {
  const [audioAllowed, setAudioAllowed] = useState(false);

  const handleAgeVerified = () => {
    setAudioAllowed(true);
  };

  const galleryImages = [
    {
      src: '/image/porn1 (1).webp',
      alt: 'Meliax Nude Exclusive',
      title: 'Meliax Nude Premium'
    },
    {
      src: '/image/porn1 (2).webp',
      alt: 'Meliax Nude Gallery',
      title: 'Meliax Nude Private'
    },
    {
      src: '/image/porn1 (3).webp',
      alt: 'Meliax Nude Premium',
      title: 'Meliax Nude VIP'
    },
    {
      src: '/image/porn1 (4).webp',
      alt: 'Meliax Nude Collection',
      title: 'Meliax Nude Special'
    },
    {
      src: '/image/porn1 (5).webp',
      alt: 'Meliax Nude Free',
      title: 'Meliax Nude Free'
    },
    {
      src: '/image/porn1 (6).webp',
      alt: 'Meliax Nude Premium Gallery',
      title: 'Meliax Nude Premium Plus'
    },
    {
      src: '/image/porn1 (7).webp',
      alt: 'Meliax Nude Exclusive Photos',
      title: 'Meliax Nude Special'
    },
    {
      src: '/image/porn1 (8).webp',
      alt: 'Meliax Nude Private Gallery',
      title: 'Meliax Nude Private Plus'
    },
    {
      src: '/image/porn1 (9).webp',
      alt: 'Meliax Nude Private Collection',
      title: 'Meliax Nude Exclusive'
    },
    {
      src: '/image/porn1 (10).webp',
      alt: 'Meliax Nude VIP Gallery',
      title: 'Meliax Nude Elite'
    },
    {
      src: '/image/porn1 (11).webp',
      alt: 'Meliax Nude Elite Photos',
      title: 'Meliax Nude Premium Collection'
    },
    {
      src: '/image/porn1 (12).webp',
      alt: 'Meliax Nude Special Collection',
      title: 'Meliax Nude VIP Plus'
    }
  ]

  const seoKeywords = "Meliax Nude, Meliax Nudes, Meliax Nude Premium, Meliax Nude Collection, Meliax Nude Private, Meliax Nude VIP, Meliax Nude Free, Meliax Nude Special, Meliax Nude Elite, Meliax Nude Exclusive, Meliax Nude Gallery"
  const seoDescription = "Meliax Nude - Exklusive Premium Collection von Meliax Nudes. Private Meliax Nude Galerie und VIP Meliax Nude Content. Entdecke die komplette Meliax Nude Collection."

  return (
    <div className={styles.container}>
      <Head>
        <title>Meliax Nude | Premium Collection & Exclusive Gallery</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Meliax Nude - Premium Collection" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/image/porn1 (1).jpg" />
        <meta property="og:url" content="https://meliaxx.de/meliax-nude" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meliax Nude - Exclusive Gallery" />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="/image/porn1 (1).jpg" />
        
        <meta name="author" content="Meliax" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://meliaxx.de/meliax-nude" />
      </Head>

      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Meliax Nude Collection</h1>
          <p>Meliax Nude Premium • Meliax Nude VIP • Meliax Nude Exclusive</p>
        </section>

        <section className={styles.gallery} aria-label="Meliax Nude Gallery">
          {galleryImages.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={image.src.replace('.webp', '.jpg')}
                alt={image.alt}
                width={400}
                height={600}
                sizes="(max-width: 768px) 100vw, 400px"
                className={styles.image}
                priority={index < 4}
                quality={75}
              />
              <div className={styles.imageInfo}>
                <h4>{image.title}</h4>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.seoText}>
          <h2>Meliax Nude Premium Gallery</h2>
          <p>Willkommen zur exklusiven Meliax Nude Collection. Entdecke die komplette Sammlung von Meliax Nudes in Premium-Qualität. Die Meliax Nude Gallery bietet dir VIP Content und private Einblicke. Alle Meliax Nudes an einem Ort - jetzt die vollständige Meliax Nude Collection erkunden!</p>
        </section>
      </main>

      <Footer />
      <ChatPopup audioEnabled={audioAllowed} />
      <AgeVerificationPreloader onVerified={handleAgeVerified} />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600
  }
} 