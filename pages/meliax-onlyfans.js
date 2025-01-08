import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import styles from '../styles/Portfolio.module.css'

export default function MeliaxOnlyfans() {
  const galleryImages = [
    {
      src: '/image/porn1 (1).jpg',
      alt: 'Meliax OnlyFans Leaks',
      title: 'Meliax OnlyFans Exclusive'
    },
    {
      src: '/image/porn1 (2).jpg',
      alt: 'Meliax OnlyFans Content',
      title: 'Meliax OF Premium'
    },
    {
      src: '/image/porn1 (3).jpg',
      alt: 'Meliax OnlyFans Premium',
      title: 'Meliax OnlyFans VIP'
    },
    {
      src: '/image/porn1 (4).jpg',
      alt: 'Meliax OF Leaks',
      title: 'Meliax OnlyFans Leaks'
    },
    {
      src: '/image/porn1 (5).jpg',
      alt: 'Meliax OnlyFans Free',
      title: 'Meliax Free OnlyFans'
    },
    {
      src: '/image/porn1 (6).jpg',
      alt: 'Meliax OnlyFans Premium',
      title: 'Meliax OF Premium Content'
    },
    {
      src: '/image/porn1 (7).jpg',
      alt: 'Meliax OnlyFans Exclusive',
      title: 'Meliax OnlyFans Special'
    },
    {
      src: '/image/porn1 (8).jpg',
      alt: 'Meliax OF Content',
      title: 'Meliax OnlyFans Private'
    },
    {
      src: '/image/porn1 (9).jpg',
      alt: 'Meliax OnlyFans Private',
      title: 'Meliax OF Exclusive'
    },
    {
      src: '/image/porn1 (10).jpg',
      alt: 'Meliax OnlyFans VIP',
      title: 'Meliax OnlyFans Elite'
    },
    {
      src: '/image/porn1 (11).jpg',
      alt: 'Meliax OF Elite',
      title: 'Meliax OnlyFans Premium'
    },
    {
      src: '/image/porn1 (12).jpg',
      alt: 'Meliax OnlyFans Special',
      title: 'Meliax OF VIP Content'
    }
  ]

  const seoKeywords = "Meliax OnlyFans, Meliax OF, Meliax OnlyFans Leaks, Meliax OnlyFans Premium, Meliax OF Content, Meliax OnlyFans VIP, Meliax OnlyFans Free"
  const seoDescription = "Exklusive Meliax OnlyFans Galerie - Premium OF Content und exklusive Fotos von Meliax. Einzigartige Einblicke und VIP Content direkt von Meliax OnlyFans."

  return (
    <div className={styles.container}>
      <Head>
        <title>Meliax OnlyFans Leaks & Premium Content</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Meliax OnlyFans Premium Content" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/image/porn1 (1).jpg" />
        <meta property="og:url" content="https://meliaxx.de/meliax-onlyfans" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meliax OnlyFans Exclusive Content" />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="/image/porn1 (1).jpg" />
        
        <meta name="author" content="Meliax" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://meliaxx.de/meliax-onlyfans" />
      </Head>

      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Meliax OnlyFans Premium Content</h1>
          <p>Exklusive OF Galerie • VIP Content • Private Einblicke</p>
        </section>

        <section className={styles.gallery} aria-label="Meliax OnlyFans Gallery">
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
          <h2>Meliax OnlyFans Exklusiv</h2>
          <p>Entdecke den exklusiven OnlyFans Content von Meliax. Unsere Premium Galerie bietet dir VIP Einblicke und private Momente. Regelmäßige Updates und einzigartige OF Inhalte warten auf dich.</p>
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