import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/premium-button";
import { scrollToMenu } from "@/lib/order";
import { scrollToId } from "@/lib/smooth-scroll";
import logoUrl from "@assets/deine-pizza-logo.png";

export function Navbar() {
  const { scrolled } = useScroll();

  const scrollToSection = scrollToId;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-4 glass" : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <img
              src={logoUrl}
              alt="Deine Pizza Logo"
              className={cn(
                "h-8 w-auto object-contain transition-[filter] duration-500",
                // Das dunkle Logo braucht über dem Hero-Bild eine helle Kante.
                !scrolled && "drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
              )}
            />
            <span
              className={cn(
                "text-xl font-bold tracking-tighter transition-colors duration-500",
                scrolled ? "text-foreground" : "text-white drop-shadow-md"
              )}
            >
              Deine Pizza
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { id: "philosophie", label: "Philosophie" },
              { id: "menu", label: "Menu" },
              { id: "handwerk", label: "Handwerk" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={cn(
                  "transition-colors duration-500",
                  scrolled
                    ? "text-foreground/80 hover:text-foreground"
                    : "text-white/85 hover:text-white drop-shadow-md"
                )}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button size="sm" variant="primary" onClick={scrollToMenu}>
              Jetzt bestellen
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
