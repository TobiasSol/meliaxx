import Link from 'next/link';

export default function Impressum() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="text-[#d0b48f] hover:text-[#e3cbaa] mb-8 inline-block">
          ← Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-bold text-[#e3cbaa] mb-8">Impressum</h1>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="text-white">
              meliax<br />
              Musterstraße 123<br />
              12345 Musterstadt
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">Kontakt</h2>
            <p className="text-white">
              Telefon: +49 (0) 123 456789<br />
              E-Mail: kontakt@meliax.de
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">Umsatzsteuer-ID</h2>
            <p className="text-white">
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
              DE 123 456 789
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">Streitschlichtung</h2>
            <p className="text-white">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              https://ec.europa.eu/consumers/odr/.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="text-white mt-4">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 