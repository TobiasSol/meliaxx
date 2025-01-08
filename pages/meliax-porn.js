import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import styles from '../styles/Portfolio.module.css'

export default function MeliaxPorn() {
  const galleryImages = [
    {
      src: '/image/porn1 (1).jpg',
      alt: 'Meliax Porn Leaks Nudes',
      title: 'Meliax Porn Leaks Nudes'
    },
    {
      src: '/image/porn1 (2).jpg',
      alt: 'Meliax Porn Leaks Nudes',
      title: 'Meliax webcam '
    },
    {
      src: '/image/porn1 (3).jpg',
      alt: 'Meliax Porn Leaks Nudes',
      title: 'Meliax cam'
    },
    {
      src: '/image/porn1 (4).jpg',
      alt: 'Meliax Porn Leaks Nudes',
      title: 'Meliax Porn Leaks Nudes'
    },
    {
      src: '/image/porn1 (5).jpg',
      alt: 'Meliax Porn Leaks Nudes',
      title: 'Meliax Free Porn'
    },
    {
      src: '/image/porn1 (6).jpg',
      alt: 'Meliax Porn Leaks Nudes',
      title: 'Meliax Nackt Webcam'
    },
    {
      src: '/image/porn1 (7).jpg',
      alt: 'Meliax Porn Leaks Nudes',
      title: 'Meliax Leak Sex Porn'
    },
    {
      src: '/image/porn1 (8).jpg',
      alt: 'Meliax Porn Leaks Nudes',
      title: 'Meliax Nackt Cam'
    },
    {
      src: '/image/porn1 (9).jpg',
      alt: 'Meliax Porn Leaks Nudes',
      title: 'Meliax Cam Nackt'
    },
    {
      src: '/image/porn1 (10).jpg',
      alt: 'Meliax Porn Leaks Nudes',
      title: 'Meliax Nudes Cam'
    },
    {
      src: '/image/porn1 (11).jpg',
      alt: 'Meliax Porn Leaks Nudes',
      title: 'Meliax Porn Leaks Nudes'
    },
    {
      src: '/image/porn1 (12).jpg',
      alt: 'Meliax Porn Leaks Nudes',
      title: 'Meliax Webcam Nackt'
    }
  ]

  const seoKeywords = "Meliax Porn Leaks Nudes, Meliax exclusive, Meliax erotic, Meliax premium content, Meliax photos, Meliax gallery"
  const seoDescription = "Exklusive Meliax Porn Galerie - Premium Adult Content und exklusive Fotos von Meliax. Hochwertige Erotik-Fotografie und private Einblicke."

  return (
    <div className={styles.container}>
      <Head>
        <title>Meliax Porn Leaks Nudes</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Meliax Porn Leaks Nudes" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/image/porn1 (1).jpg" />
        <meta property="og:url" content="https://meliaxx.de/meliax-porn" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meliax Porn Leaks Nudes" />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="/image/porn1 (1).jpg" />
        
        <meta name="author" content="Meliax" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://meliaxx.de/meliax-porn" />
      </Head>

      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Meliax Porn Leaks Nudes</h1>
          <p>Exklusive Galerie • Premium Content • Private Einblicke</p>
        </section>

        <section className={styles.gallery} aria-label="Meliax Premium Gallery">
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
          <h2>Meliax Porn Leaks Nudes</h2>
          <p>Entdecke exklusive Einblicke und Premium Content von Meliax. Unsere Galerie bietet dir hochwertige Erotik-Fotografie und private Momente. Alle Inhalte werden regelmäßig aktualisiert.</p>
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