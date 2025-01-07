import Link from 'next/link';

export default function AGB() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="text-[#d0b48f] hover:text-[#e3cbaa] mb-8 inline-block">
          ← Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-bold text-[#e3cbaa] mb-8">Allgemeine Geschäftsbedingungen</h1>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">§1 Geltungsbereich</h2>
            <p className="text-white">
              Diese Allgemeinen Geschäftsbedingungen gelten für alle gegenwärtigen und zukünftigen 
              Geschäftsbeziehungen zwischen meliax (nachfolgend "Anbieter") und dem Kunden 
              (nachfolgend "Kunde").
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">§2 Vertragsschluss</h2>
            <p className="text-white">
              Der Vertrag kommt durch die Bestellung des Kunden und die Annahme durch den Anbieter zustande. 
              Die Bestellung erfolgt durch Abschluss des Bestellvorgangs auf der Website. Die Annahme erfolgt 
              durch Bestätigung per E-Mail.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">§3 Preise und Zahlung</h2>
            <p className="text-white">
              Alle Preise verstehen sich in Euro inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt 
              per Kreditkarte über unseren Zahlungsdienstleister Stripe.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">§4 Lieferung und Leistungserbringung</h2>
            <p className="text-white">
              Die bestellten Videos werden nach Zahlungseingang innerhalb von 7 Werktagen per Download-Link 
              zur Verfügung gestellt. Der Link ist 24 Stunden gültig.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d0b48f] mb-4">§5 Widerrufsrecht</h2>
            <p className="text-white">
              Bei digitalen Inhalten erlischt das Widerrufsrecht, sobald mit der Ausführung des Vertrags 
              begonnen wurde. Der Kunde stimmt diesem ausdrücklich zu.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 