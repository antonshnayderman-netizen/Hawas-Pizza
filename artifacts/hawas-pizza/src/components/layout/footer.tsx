import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/premium-button";
import { ORDER_URL } from "@/lib/order";
import logoUrl from "@assets/hawas-logo.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <FadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={logoUrl} alt="Hawas Pizza Logo" className="w-10 h-10 object-contain" />
              <h3 className="text-xl font-bold tracking-tight">Hawas Pizza</h3>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Handwerkliche Steinofenpizza in Hamburg-Barmbek. Nur zur Abholung oder Lieferung – kompromisslose Frische, puristischer Geschmack.
            </p>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">
              <Button size="md" className="bg-background text-foreground hover:bg-background/90">
                Jetzt bestellen
              </Button>
            </a>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold mb-6 text-sm tracking-wider uppercase text-background/80">Besuchen Sie uns</h4>
            <address className="not-italic text-background/60 text-sm space-y-2">
              <p>Tarpenring 2</p>
              <p>22419 Hamburg</p>
              <p>Barmbek</p>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-6 text-sm tracking-wider uppercase text-background/80">Öffnungszeiten</h4>
            <ul className="text-background/60 text-sm space-y-2">
              <li>Di – So: 17:00 – 22:30</li>
              <li>Montags Ruhetag</li>
            </ul>
          </div>

          {/* Discounts & Phone */}
          <div>
            <h4 className="font-semibold mb-6 text-sm tracking-wider uppercase text-background/80">Ihre Vorteile</h4>
            <ul className="text-background/60 text-sm space-y-4">
              <li className="flex items-start gap-2">
                <span className="text-background font-bold text-base leading-none mt-0.5">25%</span>
                <span>Rabatt bei Selbstabholung</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-background font-bold text-base leading-none mt-0.5">10%</span>
                <span>Rabatt bei telefonischer Bestellung</span>
              </li>
              <li className="pt-2 border-t border-background/10">
                <a
                  href="tel:04079167456"
                  className="flex items-center gap-2 text-background/80 hover:text-background transition-colors font-medium"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  040-79167456
                </a>
              </li>
            </ul>
          </div>
        </FadeIn>

        <div className="mt-20 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/40">
          <p>© {new Date().getFullYear()} Hawas Pizza. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-colors">Impressum</a>
            <a href="#" className="hover:text-background transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
