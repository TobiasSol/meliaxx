import Link from 'next/link';

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="text-[#d0b48f] hover:text-[#e3cbaa] mb-8 inline-block">
          ← Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-bold text-[#e3cbaa] mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-xl font-bold text-[#d0b48f] mb-3">Allgemeine Hinweise</h3>
            <p className="text-white">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
              passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
              persönlich identifiziert werden können.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">2. Datenerfassung auf unserer Website</h2>
            <h3 className="text-xl font-bold text-[#d0b48f] mb-3">Cookies</h3>
            <p className="text-white">
              Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät 
              speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">3. Zahlungsabwicklung</h2>
            <h3 className="text-xl font-bold text-[#d0b48f] mb-3">Stripe</h3>
            <p className="text-white">
              Wir nutzen den Zahlungsdienstleister Stripe für die Abwicklung von Zahlungen. Ihre Zahlungsdaten 
              werden dabei direkt von Stripe verarbeitet und nicht auf unseren Servern gespeichert.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">4. Social Media</h2>
            <p className="text-white">
              Auf unserer Website sind Social Media Plugins von Instagram und Twitch eingebunden. Wenn Sie diese 
              Plugins nutzen, wird eine Verbindung zu den Servern der jeweiligen Plattformen hergestellt.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 