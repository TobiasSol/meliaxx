import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import styles from '../styles/Portfolio.module.css'

export default function MeliaxStripchat() {
  const galleryImages = [
    {
      src: '/image/porn1 (1).jpg',
      alt: 'Meliax Stripchat Live',
      title: 'Meliax Stripchat Exclusive'
    },
    {
      src: '/image/porn1 (2).jpg',
      alt: 'Meliax Stripchat Show',
      title: 'Meliax Live Cam Show'
    },
    {
      src: '/image/porn1 (3).jpg',
      alt: 'Meliax Stripchat Premium',
      title: 'Meliax Stripchat VIP'
    },
    {
      src: '/image/porn1 (4).jpg',
      alt: 'Meliax Live Cam',
      title: 'Meliax Stripchat Live'
    },
    {
      src: '/image/porn1 (5).jpg',
      alt: 'Meliax Stripchat Free',
      title: 'Meliax Free Stripchat'
    },
    {
      src: '/image/porn1 (6).jpg',
      alt: 'Meliax Stripchat Premium',
      title: 'Meliax Premium Shows'
    },
    {
      src: '/image/porn1 (7).jpg',
      alt: 'Meliax Stripchat Exclusive',
      title: 'Meliax Live Special'
    },
    {
      src: '/image/porn1 (8).jpg',
      alt: 'Meliax Live Content',
      title: 'Meliax Stripchat Private'
    },
    {
      src: '/image/porn1 (9).jpg',
      alt: 'Meliax Stripchat Private',
      title: 'Meliax Live Exclusive'
    },
    {
      src: '/image/porn1 (10).jpg',
      alt: 'Meliax Stripchat VIP',
      title: 'Meliax Live Elite'
    },
    {
      src: '/image/porn1 (11).jpg',
      alt: 'Meliax Live Elite',
      title: 'Meliax Stripchat Premium'
    },
    {
      src: '/image/porn1 (12).jpg',
      alt: 'Meliax Stripchat Special',
      title: 'Meliax VIP Shows'
    }
  ]

  const seoKeywords = "Meliax Stripchat, Meliax Live Cam, Meliax Stripchat Shows, Meliax Live Stream, Meliax Cam Girl, Meliax Live Shows, Meliax Stripchat VIP"
  const seoDescription = "Exklusive Meliax Stripchat Galerie - Premium Live Shows und exklusive Cam Auftritte von Meliax. Einzigartige Live-Momente und VIP Stripchat Content."

  return (
    <div className={styles.container}>
      <Head>
        <title>Meliax Stripchat Live Shows & Premium Content</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Meliax Stripchat Live Shows" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/image/porn1 (1).jpg" />
        <meta property="og:url" content="https://meliaxx.de/meliax-stripchat" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meliax Stripchat Exclusive Shows" />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="/image/porn1 (1).jpg" />
        
        <meta name="author" content="Meliax" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://meliaxx.de/meliax-stripchat" />
      </Head>

      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Meliax Stripchat Live Shows</h1>
          <p>Exklusive Live Cam • VIP Shows • Private Streams</p>
        </section>

        <section className={styles.gallery} aria-label="Meliax Stripchat Gallery">
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
          <h2>Meliax Stripchat Exklusiv</h2>
          <p>Erlebe die exklusiven Stripchat Shows von Meliax. Unsere Premium Galerie bietet dir VIP Einblicke und private Live-Momente. Regelmäßige Live-Streams und einzigartige Cam-Shows warten auf dich.</p>
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