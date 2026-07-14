import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/premium-button";
import heroPizzaUrl from "@assets/hero-pizza.jpg";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-foreground/30 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <img 
          src={heroPizzaUrl} 
          alt="Premium Steinofenpizza" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-20 mx-auto px-6 max-w-7xl">
        <div className="max-w-3xl">
          <FadeIn delay={0.2} direction="up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.1] mb-6">
              Perfektion <br /> 
              <span className="text-white/90 font-serif italic font-normal">aus dem Ofen.</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.4} direction="up">
            <p className="text-lg md:text-xl text-white/80 max-w-lg mb-10 leading-relaxed font-light">
              Die Essenz Italiens, gebacken in Hamburg. Reduziert auf das Wesentliche: Wasser, Mehl, Salz, Zeit – und kompromisslose Hitze.
            </p>
          </FadeIn>

          <FadeIn delay={0.6} direction="up">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90"
              onClick={() => {
                document.getElementById('reservierung')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Jetzt Tisch reservieren
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
