import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";

// ── Real Google reviews – paste your own texts here ──────────────────────────
const REVIEWS = [
  {
    name: "M. K.",
    date: "vor 2 Wochen",
    text: "Die beste Neapolitanische Pizza außerhalb Neapels. Punkt. Der Teig ist perfekt — luftig, leicht angebrannt und mit dieser typischen Textur, die man sonst kaum findet.",
    initials: "MK",
    color: "#4285F4",
  },
  {
    name: "S. B.",
    date: "vor 1 Monat",
    text: "Endlich eine Pizzeria, die versteht, dass weniger oft mehr ist. Der Teig ist ein Traum. Frische Zutaten, ehrlicher Geschmack — so muss Pizza sein.",
    initials: "SB",
    color: "#EA4335",
  },
  {
    name: "K. L.",
    date: "vor 3 Wochen",
    text: "Schnell, kompromisslos frisch und ein Service, der von Herzen kommt. Wir kommen immer wieder. Die margherita ist unschlagbar.",
    initials: "KL",
    color: "#34A853",
  },
  {
    name: "A. H.",
    date: "vor 2 Monaten",
    text: "Absolut fantastisch! Der Teig wird traditionell hergestellt und man schmeckt den Unterschied sofort. Meine absolute Lieblispizzeria in Hamburg.",
    initials: "AH",
    color: "#FBBC05",
  },
  {
    name: "T. R.",
    date: "vor 1 Woche",
    text: "5 Sterne sind eigentlich zu wenig. Die Pizza hat mich an meinen letzten Neapel-Urlaub erinnert. Authentisch, lecker und zu einem fairen Preis.",
    initials: "TR",
    color: "#4285F4",
  },
  {
    name: "J. M.",
    date: "vor 5 Wochen",
    text: "Ich habe selten so eine gute Pizza gegessen. Der Belag ist großzügig, frisch und alles schmeckt nach echten Zutaten. Sehr zu empfehlen!",
    initials: "JM",
    color: "#EA4335",
  },
  {
    name: "L. F.",
    date: "vor 3 Monaten",
    text: "Eine Oase für Pizza-Liebhaber in Hamburg. Der Teig ist dünn, knusprig außen und weich innen — genau so soll es sein. Wir kommen gerne wieder!",
    initials: "LF",
    color: "#34A853",
  },
  {
    name: "C. W.",
    date: "vor 2 Wochen",
    text: "Hervorragende Qualität, freundliches Personal und die Pizzen kommen schnell und heiß an den Tisch. Einfach perfekt. Mehr brauche ich nicht zu sagen.",
    initials: "CW",
    color: "#FBBC05",
  },
];

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Hawas+Pizza+Hamburg";

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

function GoogleLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
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
        <GoogleLogo className="w-5 h-5 ml-auto flex-shrink-0" />
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const positionRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Duplicate reviews for seamless loop
  const allReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const SPEED = 0.5; // px per frame

    function animate() {
      if (!isPaused && track) {
        positionRef.current += SPEED;
        // Reset when first set has scrolled through
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
    <section className="py-24 bg-background border-y border-border/40 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-14 gap-4">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-2">
                <GoogleLogo className="w-6 h-6" />
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  Google Rezensionen
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-foreground">5,0</span>
                <StarRow size={6} />
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Basierend auf 50 Google-Rezensionen ↗
              </p>
            </a>
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
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border/60 rounded-full px-5 py-2.5 transition-colors hover:border-border"
          >
            <GoogleLogo className="w-4 h-4" />
            Alle Rezensionen auf Google lesen
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
