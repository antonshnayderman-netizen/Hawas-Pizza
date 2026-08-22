import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";

// ── Platzhalter-Bewertungen für die Kundendemo ───────────────────────────────
// Hier stehen später die echten Rezensionen des Kunden. Bewusst als Beispiel
// gekennzeichnet, damit die Demo keine erfundenen Bewertungen als echt ausgibt.
const REVIEWS = [
  {
    name: "Rezensionsbeispiel 1",
    date: "vor 2 Wochen",
    text: "Beste Pizza der Stadt! Der Teig ist luftig, der Rand perfekt gebacken. Wir bestellen jede Woche.",
    initials: "B1",
    color: "#B4531F",
  },
  {
    name: "Rezensionsbeispiel 2",
    date: "vor 1 Monat",
    text: "Super Laden, super Leute. Schnelle Abholung, alles heiß und frisch. Klare Empfehlung!",
    initials: "B2",
    color: "#4A5D23",
  },
  {
    name: "Rezensionsbeispiel 3",
    date: "vor 3 Wochen",
    text: "Endlich mal ehrliche Zutaten statt Fließband. Man schmeckt den Unterschied sofort.",
    initials: "B3",
    color: "#8A6D3B",
  },
  {
    name: "Rezensionsbeispiel 4",
    date: "vor 2 Monaten",
    text: "Fünf Sterne sind fast zu wenig. Die Margherita ist unschlagbar, der Service herzlich.",
    initials: "B4",
    color: "#2C2C2C",
  },
  {
    name: "Rezensionsbeispiel 5",
    date: "vor 1 Woche",
    text: "Knusprig außen, weich innen – genau so muss eine Pizza sein. Wir kommen wieder.",
    initials: "B5",
    color: "#B4531F",
  },
  {
    name: "Rezensionsbeispiel 6",
    date: "vor 5 Wochen",
    text: "Großzügig belegt, fair im Preis und immer pünktlich fertig. Top Pizzeria in Hamburg.",
    initials: "B6",
    color: "#4A5D23",
  },
  {
    name: "Rezensionsbeispiel 7",
    date: "vor 3 Monaten",
    text: "Der 48-Stunden-Teig macht wirklich den Unterschied. Absolute Lieblingspizzeria.",
    initials: "B7",
    color: "#8A6D3B",
  },
  {
    name: "Rezensionsbeispiel 8",
    date: "vor 2 Wochen",
    text: "Freundliches Personal, kurze Wartezeit, hervorragende Qualität. Einfach perfekt.",
    initials: "B8",
    color: "#2C2C2C",
  },
];

function StarRow({ size = 4 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-${size} h-${size} text-[#FBBC05]`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[0] }) {
  return (
    <div className="flex-shrink-0 w-[320px] md:w-[360px] bg-card border border-border/60 rounded-2xl p-6 shadow-sm flex flex-col gap-4 mx-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
          style={{ backgroundColor: review.color }}
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">
            {review.name}
          </p>
          <p className="text-xs text-muted-foreground">{review.date}</p>
        </div>
      </div>

      {/* Stars */}
      <StarRow size={4} />

      {/* Text */}
      <p className="text-sm text-foreground/80 leading-relaxed line-clamp-4">
        {review.text}
      </p>
    </div>
  );
}

export function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const positionRef = useRef(0);
  const rafRef = useRef<number>(0);
  const inViewRef = useRef(false);

  // Duplicate reviews for seamless loop
  const allReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  // Pause RAF entirely when section is off-screen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { inViewRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const SPEED = 0.5; // px per frame

    function animate() {
      if (!isPaused && inViewRef.current && track) {
        positionRef.current += SPEED;
        const singleWidth = track.scrollWidth / 3;
        if (positionRef.current >= singleWidth) {
          positionRef.current -= singleWidth;
        }
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused]);

  return (
    <section ref={sectionRef} className="py-24 bg-background border-y border-border/40 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-14 gap-4">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  Kundenstimmen
                </span>
                <span className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Beispielansicht
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-foreground">5,0</span>
                <StarRow size={6} />
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Platzhalter-Ansicht: Hier erscheinen später Ihre echten Bewertungen.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Infinite scroll track – full bleed */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={trackRef}
          className="flex will-change-transform py-4"
          style={{ width: "max-content" }}
        >
          {allReviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <FadeIn>
        <div className="flex justify-center mt-10">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground border border-border/60 rounded-full px-5 py-2.5">
            Beispielrezensionen – Ihre echten Bewertungen werden hier eingebunden
          </span>
        </div>
      </FadeIn>
    </section>
  );
}
