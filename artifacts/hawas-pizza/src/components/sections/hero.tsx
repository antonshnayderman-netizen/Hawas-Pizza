import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/premium-button";
import { ORDER_URL } from "@/lib/order";
import heroVideoUrl from "@assets/hero-pizza-360.mp4";
import heroPosterUrl from "@assets/hero-poster.jpg";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // As the user scrolls through the hero, the pizza subtly grows and drifts
  // — the 360° turn plays out while the scene slowly pulls back.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden"
    >
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-foreground/30 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <motion.video
          style={{ scale, y, opacity }}
          className="w-full h-full object-cover"
          src={heroVideoUrl}
          poster={heroPosterUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="Eine Steinofenpizza dreht sich langsam um die eigene Achse"
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
      </div>
    </section>
  );
}
