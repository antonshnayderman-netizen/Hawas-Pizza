import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/premium-button";
import { scrollToMenu } from "@/lib/order";
import { HeroCanvas } from "@/components/sections/hero-canvas";
import { AiBadge } from "@/components/ui/ai-badge";
import logoUrl from "@assets/deine-pizza-logo.png";
import posterUrl from "@assets/hero-poster.jpg";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], ["0%", "-6%"]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[200vh]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center pt-20">
        {/* Scroll-scrubbed frame sequence — canvas on desktop, poster on mobile */}
        <div className="absolute inset-0 z-0">
          {/* Poster liegt unter dem Canvas und fuellt nur die Luecke, bis das
              erste Frame geladen ist — sonst waere der Hero kurz leer. */}
          <img
            src={posterUrl}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Scroll-gescrubbte Bildfolge, mobil in der kleineren Variante */}
          <div className="absolute inset-0">
            <HeroCanvas targetRef={sectionRef} />
          </div>
          <div className="absolute inset-0 bg-foreground/20 mix-blend-multiply" />
          {/* Übergang zur weißen Sektion darunter. Nur die unterste Kante ist
              voll deckend, damit die Naht unsichtbar bleibt; danach fällt die
              Deckkraft über viele Stützstellen sehr schnell ab, sodass das
              Bild kräftig bleibt und trotzdem kein Bandingpunkt entsteht. */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,hsl(var(--background))_0%,hsl(var(--background)/0.86)_2%,hsl(var(--background)/0.58)_5%,hsl(var(--background)/0.36)_9%,hsl(var(--background)/0.20)_14%,hsl(var(--background)/0.10)_20%,hsl(var(--background)/0.04)_27%,transparent_36%)]" />
        </div>

        {/* Sitzt unten im weißen Verlauf, nicht auf dem Bild – daher dunkel. */}
        <AiBadge tone="dark" className="bottom-4 right-5 z-30" />

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="container relative z-20 mx-auto px-6 max-w-7xl"
        >
          <div className="max-w-3xl">
            {/* Logo + brand name */}
            <FadeIn delay={0.1} direction="up">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={logoUrl}
                  alt="Deine Pizza Logo"
                  fetchPriority="high"
                  decoding="async"
                  className="h-16 md:h-20 w-auto object-contain drop-shadow-lg"
                />
                <span className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-white tracking-tight leading-none">
                  Deine Pizza
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="up">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.1] mb-6">
                Perfektion <br />
                <span className="text-white/90 font-serif italic font-normal">aus dem Ofen</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4} direction="up">
              <p className="text-lg md:text-xl text-white/80 max-w-lg mb-4 leading-relaxed font-light">
                Die Essenz Italiens, gebacken in Hamburg. Reduziert auf das Wesentliche: Wasser, Mehl, Salz, Zeit – und kompromisslose Hitze.
              </p>
            </FadeIn>

            {/* Discount badges */}
            <FadeIn delay={0.5} direction="up">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/35 text-white px-5 py-3 rounded-xl">
                  <span className="text-2xl font-black leading-none">25%</span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">Rabatt</span>
                    <span className="text-xs text-white/80">bei Selbstabholung</span>
                  </div>
                </div>
                <a
                  href="tel:0401234567"
                  className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/35 text-white px-5 py-3 rounded-xl hover:bg-white/30 transition-colors group"
                >
                  <span className="text-2xl font-black leading-none">10%</span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">Rabatt telefonisch</span>
                    <span className="text-xs text-white/80 group-hover:text-white/95 transition-colors font-mono tracking-wide">040 1234567</span>
                  </div>
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.6} direction="up">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90"
                  onClick={scrollToMenu}
                >
                  Speisekarte entdecken
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:border-white"
                  onClick={scrollToMenu}
                >
                  Jetzt bestellen
                </Button>
              </div>
            </FadeIn>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
