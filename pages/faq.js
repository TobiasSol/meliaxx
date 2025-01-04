import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Wie lange dauert die Produktion eines Custom Videos?",
    answer: "Die Produktionszeit beträgt in der Regel 7 Werktage nach Zahlungseingang."
  },
  {
    question: "In welchem Format werden die Videos geliefert?",
    answer: "Die Videos werden im MP4-Format geliefert. Bei 4K-Qualität beträgt die Auflösung 3840x2160 Pixel."
  },
  {
    question: "Wie erhalte ich mein Video?",
    answer: "Nach Fertigstellung erhältst du einen verschlüsselten Download-Link per E-Mail, der 24 Stunden gültig ist."
  },
  {
    question: "Welche Zahlungsmethoden werden akzeptiert?",
    answer: "Wir akzeptieren alle gängigen Kreditkarten über unseren sicheren Zahlungsdienstleister Stripe."
  },
  {
    question: "Kann ich spezielle Wünsche äußern?",
    answer: "Ja, beim Bestellvorgang kannst du verschiedene Optionen wählen und zusätzliche Anmerkungen hinterlassen."
  },
  {
    question: "Was passiert, wenn ich mit dem Video nicht zufrieden bin?",
    answer: "Kontaktiere uns in diesem Fall bitte innerhalb von 24 Stunden nach Erhalt des Videos. Wir finden eine Lösung."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="text-[#d0b48f] hover:text-[#e3cbaa] mb-8 inline-block">
          ← Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-bold text-[#e3cbaa] mb-8">Häufig gestellte Fragen</h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-[#e3cbaa] font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-[#d0b48f]" />
                ) : (
                  <ChevronDown className="text-[#d0b48f]" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-gray-800">
                  <p className="text-white">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-[#e3cbaa] mb-4">
            Noch Fragen?
          </h2>
          <p className="text-white mb-4">
            Wenn du keine Antwort auf deine Frage gefunden hast, kontaktiere uns gerne direkt.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-[#d0b48f] text-black px-6 py-2 rounded hover:bg-[#e3cbaa] transition-colors"
          >
            Zum Kontaktformular
          </Link>
        </div>
      </div>
    </div>
  );
} 