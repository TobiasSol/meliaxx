import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import styles from '../styles/Portfolio.module.css'

export default function MeliaxCam() {
  const galleryImages = [
    {
      src: '/image/porn1 (1).jpg',
      alt: 'Meliax Cam Live Show',
      title: 'Meliax Cam Live'
    },
    {
      src: '/image/porn1 (2).jpg',
      alt: 'Meliax Cam Show',
      title: 'Meliax Cam Private'
    },
    {
      src: '/image/porn1 (3).jpg',
      alt: 'Meliax Cam Premium Show',
      title: 'Meliax Cam VIP'
    },
    {
      src: '/image/porn1 (4).jpg',
      alt: 'Meliax Cam Live Stream',
      title: 'Meliax Cam Stream'
    },
    {
      src: '/image/porn1 (5).jpg',
      alt: 'Meliax Cam Free Show',
      title: 'Meliax Cam Free'
    },
    {
      src: '/image/porn1 (6).jpg',
      alt: 'Meliax Cam Premium Content',
      title: 'Meliax Cam Premium'
    },
    {
      src: '/image/porn1 (7).jpg',
      alt: 'Meliax Cam Exclusive Show',
      title: 'Meliax Cam Special'
    },
    {
      src: '/image/porn1 (8).jpg',
      alt: 'Meliax Cam Private Show',
      title: 'Meliax Cam Private Show'
    },
    {
      src: '/image/porn1 (9).jpg',
      alt: 'Meliax Cam Private Stream',
      title: 'Meliax Cam Exclusive'
    },
    {
      src: '/image/porn1 (10).jpg',
      alt: 'Meliax Cam VIP Show',
      title: 'Meliax Cam Elite'
    },
    {
      src: '/image/porn1 (11).jpg',
      alt: 'Meliax Cam Elite Show',
      title: 'Meliax Cam Premium Plus'
    },
    {
      src: '/image/porn1 (12).jpg',
      alt: 'Meliax Cam Special Show',
      title: 'Meliax Cam VIP Plus'
    }
  ]

  const seoKeywords = "Meliax Cam, Meliax Cam Shows, Meliax Cam Live, Meliax Cam Stream, Meliax Cam Girl, Meliax Cam Private, Meliax Cam VIP, Meliax Cam Free, Meliax Cam Premium, Meliax Cam Elite, Meliax Cam Special"
  const seoDescription = "Meliax Cam - Exklusive Live Cam Shows von Meliax. Premium Meliax Cam Sessions und private Meliax Cam Shows. Erlebe Meliax Cam live und in VIP-Qualität."

  return (
    <div className={styles.container}>
      <Head>
        <title>Meliax Cam | Live Shows & Private Cam Sessions</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Meliax Cam - Exklusive Live Shows" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/image/porn1 (1).jpg" />
        <meta property="og:url" content="https://meliaxx.de/meliax-cam" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meliax Cam - Premium Live Shows" />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="/image/porn1 (1).jpg" />
        
        <meta name="author" content="Meliax" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://meliaxx.de/meliax-cam" />
      </Head>

      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Meliax Cam Live Shows</h1>
          <p>Meliax Cam Private • Meliax Cam VIP • Meliax Cam Premium</p>
        </section>

        <section className={styles.gallery} aria-label="Meliax Cam Gallery">
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
          <h2>Meliax Cam Exklusiv</h2>
          <p>Willkommen bei Meliax Cam - deiner exklusiven Adresse für Premium Cam Shows. Die Meliax Cam bietet dir private Sessions und intime Momente. Erlebe Meliax Cam live mit täglichen Streams und einzigartigen Meliax Cam Shows. Jetzt Meliax Cam entdecken!</p>
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