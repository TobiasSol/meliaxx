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
            Arkani Media Ltd <br />
            Tepeleniou street 13, court 3, 3rd floor <br />
            8010, paphos <br />
            Cyprus <br />
            Reg. Number: <br />
Reg. Number:<br />
ΗΕ 414806<br />
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">Kontakt</h2>
            <p className="text-white">
            
              E-Mail: kontakt@meliax.de
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