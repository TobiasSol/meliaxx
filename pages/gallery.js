import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import styles from '../styles/Gallery.module.css'

export default function Gallery() {
  const images = [
    {
      src: '/images/portrait1.jpg',
      alt: 'Professionelles Porträtfoto',
      title: 'Portrait Studio'
    },
    {
      src: '/images/portrait2.jpg',
      alt: 'Künstlerisches Porträt',
      title: 'Künstlerische Fotografie'
    },
    // Weitere angemessene Bilder hier hinzufügen
  ]

  return (
    <div>
      <Head>
        <title>Fotogalerie | Professionelle Porträts</title>
        <meta name="description" content="Professionelle Porträtfotografie und künstlerische Aufnahmen" />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header />
      
      <main className={styles.main}>
        <h1>Professionelle Fotogalerie</h1>
        <div className={styles.gallery}>
          {images.map((image, index) => (
            <div key={index} className={styles.imageContainer}>
              <Image
                src={image.src}
                alt={image.alt}
                width={300}
                height={400}
                layout="responsive"
              />
              <h3>{image.title}</h3>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
} 