import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import styles from '../styles/Portfolio.module.css'

export default function MeliaxLeak() {
  const galleryImages = [
    {
      src: '/image/porn1 (1).jpg',
      alt: 'Meliax Leak Exclusive',
      title: 'Meliax Leak Premium'
    },
    {
      src: '/image/porn1 (2).jpg',
      alt: 'Meliax Leak Content',
      title: 'Meliax Leak Private'
    },
    {
      src: '/image/porn1 (3).jpg',
      alt: 'Meliax Leak Premium',
      title: 'Meliax Leak VIP'
    },
    {
      src: '/image/porn1 (4).jpg',
      alt: 'Meliax Leak Special',
      title: 'Meliax Leak Collection'
    },
    {
      src: '/image/porn1 (5).jpg',
      alt: 'Meliax Leak Free',
      title: 'Meliax Leak Free'
    },
    {
      src: '/image/porn1 (6).jpg',
      alt: 'Meliax Leak Premium Content',
      title: 'Meliax Leak Premium Plus'
    },
    {
      src: '/image/porn1 (7).jpg',
      alt: 'Meliax Leak Exclusive Content',
      title: 'Meliax Leak Special'
    },
    {
      src: '/image/porn1 (8).jpg',
      alt: 'Meliax Leak Private Content',
      title: 'Meliax Leak Private Plus'
    },
    {
      src: '/image/porn1 (9).jpg',
      alt: 'Meliax Leak Private Collection',
      title: 'Meliax Leak Exclusive'
    },
    {
      src: '/image/porn1 (10).jpg',
      alt: 'Meliax Leak VIP Content',
      title: 'Meliax Leak Elite'
    },
    {
      src: '/image/porn1 (11).jpg',
      alt: 'Meliax Leak Elite Content',
      title: 'Meliax Leak Premium Collection'
    },
    {
      src: '/image/porn1 (12).jpg',
      alt: 'Meliax Leak Special Collection',
      title: 'Meliax Leak VIP Plus'
    }
  ]

  const seoKeywords = "Meliax Leak, Meliax Leaks, Meliax Leak Premium, Meliax Leak Collection, Meliax Leak Private, Meliax Leak VIP, Meliax Leak Free, Meliax Leak Special, Meliax Leak Elite, Meliax Leak Exclusive"
  const seoDescription = "Meliax Leak - Exklusive Premium Collection von Meliax Leaks. Private Meliax Leak Sammlung und VIP Meliax Leak Content. Entdecke die komplette Meliax Leak Collection."

  return (
    <div className={styles.container}>
      <Head>
        <title>Meliax Leak | Premium Collection & Exclusive Content</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Meliax Leak - Premium Collection" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/image/porn1 (1).jpg" />
        <meta property="og:url" content="https://meliaxx.de/meliax-leak" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meliax Leak - Exclusive Content" />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="/image/porn1 (1).jpg" />
        
        <meta name="author" content="Meliax" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://meliaxx.de/meliax-leak" />
      </Head>

      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Meliax Leak Collection</h1>
          <p>Meliax Leak Premium • Meliax Leak VIP • Meliax Leak Exclusive</p>
        </section>

        <section className={styles.gallery} aria-label="Meliax Leak Gallery">
          {galleryImages.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={600}
                layout="responsive"
                objectFit="cover"
                priority={index < 2}
                loading={index < 2 ? "eager" : "lazy"}
                quality={85}
              />
              <div className={styles.imageInfo}>
                <h4>{image.title}</h4>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.seoText}>
          <h2>Meliax Leak Premium Collection</h2>
          <p>Willkommen zur exklusiven Meliax Leak Collection. Entdecke die komplette Sammlung von Meliax Leaks in Premium-Qualität. Die Meliax Leak Gallery bietet dir VIP Content und private Einblicke. Alle Meliax Leaks an einem Ort - jetzt die vollständige Meliax Leak Collection erkunden!</p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600
  }
} 