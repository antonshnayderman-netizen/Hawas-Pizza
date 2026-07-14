import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/premium-button";
import { ORDER_URL } from "@/lib/order";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <FadeIn className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold tracking-tight mb-6">Hawas Pizza.</h3>
            <p className="text-background/60 max-w-sm text-sm leading-relaxed mb-8">
              Handwerkliche Steinofenpizza in Hamburg-Barmbek. 
              Nur zur Abholung oder Lieferung – kompromisslose Frische, puristischer Geschmack.
            </p>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">
              <Button size="md" className="bg-background text-foreground hover:bg-background/90">
                Jetzt bestellen
              </Button>
            </a>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-sm tracking-wider uppercase text-background/80">Besuchen Sie uns</h4>
            <address className="not-italic text-background/60 text-sm space-y-2">
              <p>Tarpenring 2</p>
              <p>22419 Hamburg</p>
              <p>Barmbek</p>
            </address>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-sm tracking-wider uppercase text-background/80">Öffnungszeiten</h4>
            <ul className="text-background/60 text-sm space-y-2">
              <li>Di – So: 17:00 – 22:30</li>
              <li>Montags Ruhetag</li>
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
