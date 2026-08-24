import { FadeIn } from "@/components/animations/fade-in";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Diekmoorweg+34%2C+22419+Hamburg";

const EMBED_URL =
  "https://maps.google.com/maps?q=Diekmoorweg+34,+22419+Hamburg&z=16&output=embed&hl=de";

export function MapSection() {
  return (
    // overflow-hidden: Das Info-Panel fliegt per FadeIn von rechts ein und steht
    // bis dahin 40px ausserhalb des Viewports — ohne Clipping erzeugt das beim
    // Scrollen einen weissen Balken am rechten Rand.
    <section className="bg-background border-b border-border/40 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">

        {/* Map iframe */}
        <FadeIn direction="none" className="relative min-h-[320px] lg:min-h-[420px]">
          <iframe
            src={EMBED_URL}
            title="Deine Pizza – Standort Hamburg"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full border-0"
          />
        </FadeIn>

        {/* Info panel */}
        <FadeIn
          delay={0.15}
          direction="left"
          className="flex flex-col justify-center gap-8 px-10 py-14 lg:px-16 bg-foreground text-background"
        >
          {/* Heading */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/50 mb-3">
              Wo wir sind
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
              Deine Pizza
              <br />
              <span className="font-serif italic font-normal text-background/70">
                Hamburg-Langenhorn
              </span>
            </h2>
          </div>

          {/* Address + hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-background/70">
            <div className="space-y-1">
              <p className="text-background font-semibold text-xs uppercase tracking-wider mb-2">
                Adresse
              </p>
              <p>Diekmoorweg 34</p>
              <p>22419 Hamburg</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-background/90 hover:text-background underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors text-xs font-medium"
              >
                {/* Pin icon */}
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                In Google Maps öffnen
              </a>
            </div>

            <div className="space-y-1">
              <p className="text-background font-semibold text-xs uppercase tracking-wider mb-2">
                Öffnungszeiten
              </p>
              <p>Di – So&ensp;17:00 – 22:30</p>
              <p>Montags Ruhetag</p>
              <a
                href="tel:0401234567"
                className="inline-flex items-center gap-1.5 mt-3 text-background/90 hover:text-background underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors text-xs font-medium"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                040 1234567
              </a>
            </div>
          </div>

          {/* CTA */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center gap-2 bg-background text-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-background/90 transition-colors"
          >
            Route planen
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
