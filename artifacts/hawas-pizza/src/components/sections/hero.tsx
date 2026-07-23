import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/premium-button";
import { ORDER_URL } from "@/lib/order";
import { HeroCanvas } from "@/components/sections/hero-canvas";
import logoUrl from "@assets/hawas-logo.png";
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
          {/* Mobile fallback: static poster image, no 15 MB frame download */}
          <img
            src={posterUrl}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover md:hidden"
          />
          {/* Desktop: scroll-scrubbed canvas */}
          <div className="hidden md:block absolute inset-0">
            <HeroCanvas targetRef={sectionRef} />
          </div>
          <div className="absolute inset-0 bg-foreground/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

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
                  alt="Hawas Pizza Logo"
                  fetchPriority="high"
                  decoding="async"
                  className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg"
                />
                <span className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-white tracking-tight leading-none">
                  Hawas Pizza
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
                  href="tel:04079167456"
                  className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/35 text-white px-5 py-3 rounded-xl hover:bg-white/30 transition-colors group"
                >
                  <span className="text-2xl font-black leading-none">10%</span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">Rabatt telefonisch</span>
                    <span className="text-xs text-white/80 group-hover:text-white/95 transition-colors font-mono tracking-wide">040-79167456</span>
                  </div>
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.6} direction="up">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90"
                  onClick={() => {
                    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Speisekarte entdecken
                </Button>
                <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full border-white/40 text-white hover:border-white">
                    Jetzt bestellen
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
