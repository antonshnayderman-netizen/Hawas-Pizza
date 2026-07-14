import { FadeIn } from "@/components/animations/fade-in";
import ingredientsUrl from "@assets/ingredients.jpg";

export function PhilosophySection() {
  return (
    <section id="philosophie" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <FadeIn>
              <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Unsere Philosophie
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-8">
                Keine Kompromisse. <br/>
                <span className="font-serif italic font-normal text-muted-foreground">Nur Charakter.</span>
              </h3>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-lg text-foreground/70 leading-relaxed mb-6 font-light">
                Wir glauben nicht an Abkürzungen. Eine außergewöhnliche Pizza verlangt Respekt vor den Zutaten und absolute Hingabe im Prozess. Unser Teig ruht 48 Stunden, bevor er den heißen Stein berührt.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed font-light">
                Frische San Marzano Tomaten, cremigste Burrata, lebendiges Basilikum. Das ist kein Geheimnis. Das ist ein Versprechen.
              </p>
            </FadeIn>
          </div>
          
          <div className="order-1 lg:order-2">
            <FadeIn direction="left" delay={0.2}>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <img 
                  src={ingredientsUrl} 
                  alt="Frische Zutaten" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
