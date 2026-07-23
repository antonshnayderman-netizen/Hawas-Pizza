import { FadeIn } from "@/components/animations/fade-in";
import doughUrl from "@assets/dough-hands.jpg";
import interiorUrl from "@assets/interior.jpg";
import logoUrl from "@assets/hawas-logo.png";

export function ProcessSection() {
  return (
    <section id="handwerk" className="py-32 bg-foreground text-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <FadeIn>
          <div className="flex items-center justify-between mb-24 gap-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Die Anatomie <br/>einer perfekten Pizza.</h2>
              <p className="text-background/70 font-light text-lg">Kein Fließband. Keine Maschinen. Nur Hände, Gefühl und 450°C Hitze.</p>
            </div>
            <img
              src={logoUrl}
              alt="Hawa's Pizza"
              className="w-48 md:w-64 opacity-90 flex-shrink-0 hidden md:block"
            />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
          <FadeIn delay={0.2}>
            <div className="relative group overflow-hidden h-[60vh] md:h-[80vh]">
              <div className="absolute inset-0 bg-black/20 z-10 transition-opacity group-hover:opacity-0" />
              <img src={doughUrl} alt="Teigzubereitung" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <h3 className="text-2xl font-bold mb-2">01. Der Teig</h3>
                <p className="text-white/80 font-light max-w-xs">48 Stunden Reifezeit für maximale Bekömmlichkeit und ein luftiges Cornicione.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="relative group overflow-hidden h-[60vh] md:h-[80vh] md:mt-24">
              <div className="absolute inset-0 bg-black/20 z-10 transition-opacity group-hover:opacity-0" />
              <img src={interiorUrl} alt="Steinofen" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <h3 className="text-2xl font-bold mb-2">02. Das Feuer</h3>
                <p className="text-white/80 font-light max-w-xs">90 Sekunden bei 450°C im Steinofen. Die perfekte Balance aus knusprig und zart.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
