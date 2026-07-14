import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/premium-button";
import { ORDER_URL } from "@/lib/order";

export function Navbar() {
  const { scrolled } = useScroll();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            className="text-xl font-bold tracking-tighter"
          >
            Hawas Pizza.
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollToSection("philosophie")} className="text-foreground/80 hover:text-foreground transition-colors">
              Philosophie
            </button>
            <button onClick={() => scrollToSection("menu")} className="text-foreground/80 hover:text-foreground transition-colors">
              Menu
            </button>
            <button onClick={() => scrollToSection("handwerk")} className="text-foreground/80 hover:text-foreground transition-colors">
              Handwerk
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="primary">
                Jetzt bestellen
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
