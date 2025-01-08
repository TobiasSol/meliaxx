import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import styles from '../styles/Portfolio.module.css'

export default function Portfolio() {
  const portfolioImages = [
    {
      src: '/images/model1.jpg',
      alt: 'Professionelles Modelportrait',
      title: 'Fashion Portrait'
    },
    {
      src: '/images/model2.jpg',
      alt: 'Lifestyle Fotografie',
      title: 'Lifestyle'
    },
    {
      src: '/images/model3.jpg',
      alt: 'Künstlerisches Portrait',
      title: 'Artistic'
    }
  ]

  return (
    <div className={styles.container}>
      <Head>
        <title>Meliax | Professionelles Modelportfolio</title>
        <meta name="description" content="Professionelles Portfolio von Meliax - Fashion, Lifestyle und künstlerische Fotografie" />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Meliax Portfolio</h1>
          <p>Fashion • Lifestyle • Art</p>
        </section>

        <section className={styles.gallery}>
          {portfolioImages.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={600}
                layout="responsive"
                objectFit="cover"
                priority={index < 2}
              />
              <div className={styles.imageInfo}>
                <h3>{image.title}</h3>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.about}>
          <h2>Über Meliax</h2>
          <p>Professionelles Model mit Erfahrung in Fashion, Lifestyle und künstlerischer Fotografie.</p>
          <p>Verfügbar für professionelle Fotoshootings und Werbekampagnen.</p>
        </section>
      </main>

      <Footer />
    </div>
  )
} 