import { useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { frameImages, frameSet, startFrameLoading } from "@/lib/hero-frames";

const LERP = 0.12;

interface HeroCanvasProps {
  targetRef: React.RefObject<HTMLElement | null>;
}

export function HeroCanvas({ targetRef }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetFrameRef = useRef(1);
  const displayFrameRef = useRef(1);
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(true);
  const paintedOnce = useRef(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Normalerweise hat der Ladescreen das schon angestossen; der Aufruf ist
  // idempotent und greift nur, wenn der Screen uebersprungen wurde.
  useEffect(() => {
    startFrameLoading(() => {});
  }, []);

  // RAF pausieren, sobald der Hero aus dem Viewport ist
  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [targetRef]);

  const drawImageToCanvas = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // bei 2x deckeln
    const width = canvas.parentElement?.clientWidth ?? window.innerWidth;
    const height = canvas.parentElement?.clientHeight ?? window.innerHeight;
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const canvasRatio = width / height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    let drawWidth = width, drawHeight = height, offsetX = 0, offsetY = 0;
    if (imgRatio > canvasRatio) {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  /** Zeichnet das nächstgelegene verfügbare Frame. Liefert, ob etwas ankam. */
  const drawIndex = (floatIndex: number): boolean => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const index = Math.min(frameSet.count, Math.max(1, Math.round(floatIndex)));
    const usable = (img: HTMLImageElement | null | undefined) =>
      !!img && img.complete && img.naturalWidth > 0;

    const exact = frameImages[index - 1];
    if (usable(exact)) { drawImageToCanvas(canvas, exact!); return true; }

    // Auf das naechstliegende bereits geladene Frame zurueckfallen
    for (let d = 1; d < frameSet.count; d++) {
      const lo = frameImages[Math.max(0, index - 1 - d)];
      if (usable(lo)) { drawImageToCanvas(canvas, lo!); return true; }
    }
    return false;
  };

  // RAF-Schleife — ruht, solange der Hero nicht sichtbar ist
  useEffect(() => {
    const tick = () => {
      if (visibleRef.current) {
        const diff = targetFrameRef.current - displayFrameRef.current;
        if (Math.abs(diff) > 0.05) {
          displayFrameRef.current += diff * LERP;
          drawIndex(displayFrameRef.current);
          paintedOnce.current = true;
        } else if (!paintedOnce.current) {
          // Erstes Bild nachholen, sobald es eingetroffen ist – ohne das bliebe
          // der Canvas leer, solange niemand scrollt.
          paintedOnce.current = drawIndex(displayFrameRef.current);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    targetFrameRef.current = Math.min(
      frameSet.count,
      Math.max(1, latest * (frameSet.count - 1) + 1)
    );
  });

  useEffect(() => {
    const handleResize = () => drawIndex(displayFrameRef.current);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
