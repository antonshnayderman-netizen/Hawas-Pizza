import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/premium-button";
import { ORDER_URL } from "@/lib/order";
import { HeroCanvas } from "@/components/sections/hero-canvas";
import logoUrl from "@assets/hawas-logo.png";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], ["0%", "-6%"]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[320vh]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center pt-20">
        {/* Scroll-scrubbed frame sequence */}
        <div className="absolute inset-0 z-0">
          <HeroCanvas targetRef={sectionRef} />
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
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  25% Rabatt bei Selbstabholung
                </span>
                <a
                  href="tel:04079167456"
                  className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-white/25 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  10% Rabatt telefonisch · 040-79167456
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
