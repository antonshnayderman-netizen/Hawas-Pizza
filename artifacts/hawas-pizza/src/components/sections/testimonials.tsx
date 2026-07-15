import { FadeIn } from "@/components/animations/fade-in";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const TESTIMONIALS = [
  { quote: "Die beste Neapolitanische Pizza außerhalb Neapels. Punkt.", author: "M., Hamburg" },
  { quote: "Endlich eine Pizzeria, die versteht, dass weniger oft mehr ist. Der Teig ist ein Traum.", author: "S., Barmbek" },
  { quote: "Schnell, kompromisslos frisch und ein Service, der von Herzen kommt.", author: "K., Hamburg" }
];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Hawas+Pizza+Hamburg";

function StarRow() {
  return (
    <div className="flex items-center gap-2">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialSection() {
  return (
    <section className="py-32 bg-background border-y border-border/40">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <FadeIn>
            <HoverCard openDelay={100}>
              <HoverCardTrigger asChild>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-4 mb-16 cursor-pointer group"
                >
                  <StarRow />
                  <p className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                    5,0 &middot; 50 Google-Rezensionen
                  </p>
                </a>
              </HoverCardTrigger>
              <HoverCardContent className="w-72 text-center">
                <div className="flex flex-col items-center gap-2">
                  <StarRow />
                  <p className="text-sm font-medium">5,0 von 5 Sternen</p>
                  <p className="text-xs text-muted-foreground">
                    Basierend auf 50 Google-Rezensionen. Klicken, um sie auf Google zu lesen.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <blockquote className="space-y-6 relative">
                  <span className="absolute -top-6 -left-4 text-6xl text-muted/30 font-serif leading-none select-none">"</span>
                  <p className="text-xl md:text-2xl font-serif italic text-foreground/90 relative z-10 leading-snug">
                    {t.quote}
                  </p>
                  <footer className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    — {t.author}
                  </footer>
                </blockquote>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
