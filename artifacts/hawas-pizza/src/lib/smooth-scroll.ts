import Lenis from "lenis";

/**
 * Sanftes Scrollen für die ganze Seite.
 *
 * Lenis verschiebt weiterhin die native Scrollposition, deshalb funktionieren
 * `position: sticky` (Hero) und framer-motions `useScroll` (Hero-Canvas)
 * unverändert weiter — es wird nur die Bewegung dorthin geglättet.
 *
 * Die Instanz liegt bewusst modulweit, damit Sprungziele (Navbar,
 * "Jetzt bestellen") über dieselbe Instanz laufen. Zwei konkurrierende
 * Scroll-Animationen würden sonst gegeneinander arbeiten.
 */
let lenis: Lenis | null = null;

/** Höhe der fixierten Navbar – sonst verschwindet die Sektionsüberschrift darunter. */
const NAV_OFFSET = -80;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Startet Lenis und liefert die Aufräumfunktion für den useEffect zurück. */
export function startSmoothScroll(): () => void {
  // Bei "Bewegung reduzieren" gar nicht erst starten – dann bleibt natives
  // Scrollen aktiv und scrollToId fällt automatisch auf scrollIntoView zurück.
  if (prefersReducedMotion() || lenis) return () => {};

  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Touch-Geräte behalten natives Scrollen: dort fühlt sich das native
    // Momentum besser an als eine nachgebaute Kurve.
    syncTouch: false,
  });

  let frame = 0;
  const loop = (time: number) => {
    lenis?.raf(time);
    frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
  };
}

/** Springt weich zu einer Sektion. Ohne Lenis (Reduced Motion) nativ. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET });
  else el.scrollIntoView({ behavior: "smooth" });
}
