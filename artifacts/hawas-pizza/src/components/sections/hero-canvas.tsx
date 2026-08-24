import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

const LERP = 0.12;

/**
 * Zwei Bildfolgen für dieselbe Drehung. Mobil wird jedes zweite Frame in
 * kleinerer Auflösung geladen: 2,8 MB statt 15 MB, dafür minimal weicher —
 * hinter der Abdunkelung des Heros faellt das nicht auf, ein Standbild dagegen
 * schon.
 */
const DESKTOP_FRAMES = { dir: "hero-frames", count: 151 };
const MOBILE_FRAMES = { dir: "hero-frames-mobile", count: 76 };

function isMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
}

function frameUrl(base: string, dir: string, index: number) {
  const n = String(index).padStart(3, "0");
  return `${base}${dir}/frame-${n}.jpg`;
}

interface HeroCanvasProps {
  targetRef: React.RefObject<HTMLElement | null>;
}

export function HeroCanvas({ targetRef }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Beim Mounten festgelegt: ein Wechsel der Bildfolge mitten im Scrollen
  // wuerde alle bereits geladenen Frames entwerten.
  const frames = useRef(isMobileViewport() ? MOBILE_FRAMES : DESKTOP_FRAMES).current;
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(frames.count).fill(null));
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  const targetFrameRef = useRef(1);
  const displayFrameRef = useRef(1);
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(true);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Erstes Frame sofort, der Rest in Leerlauf-Häppchen
  useEffect(() => {
    const base = import.meta.env.BASE_URL;

    const first = new Image();
    first.src = frameUrl(base, frames.dir, 1);
    first.onload = () => {
      imagesRef.current[0] = first;
      setFirstFrameReady(true);

      let i = 2;
      function loadBatch(deadline?: IdleDeadline) {
        while (i <= frames.count && (!deadline || deadline.timeRemaining() > 0)) {
          const idx = i - 1;
          const img = new Image();
          img.src = frameUrl(base, frames.dir, i);
          img.onload = () => { imagesRef.current[idx] = img; };
          i++;
        }
        if (i <= frames.count) {
          if ("requestIdleCallback" in window) {
            (window as any).requestIdleCallback(loadBatch, { timeout: 300 });
          } else {
            setTimeout(() => loadBatch(), 16);
          }
        }
      }
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(loadBatch, { timeout: 200 });
      } else {
        setTimeout(() => loadBatch(), 16);
      }
    };
    imagesRef.current[0] = first;
  }, [frames]);

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

  const drawIndex = (floatIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const index = Math.min(frames.count, Math.max(1, Math.round(floatIndex)));
    const img = imagesRef.current[index - 1];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Auf das naechstliegende bereits geladene Frame zurueckfallen
      for (let d = 1; d < frames.count; d++) {
        const lo = imagesRef.current[Math.max(0, index - 1 - d)];
        if (lo?.complete && lo.naturalWidth > 0) { drawImageToCanvas(canvas, lo); return; }
      }
      return;
    }
    drawImageToCanvas(canvas, img);
  };

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

  // RAF-Schleife — ruht, solange der Hero nicht sichtbar ist
  useEffect(() => {
    if (!firstFrameReady) return;
    const tick = () => {
      if (visibleRef.current) {
        const diff = targetFrameRef.current - displayFrameRef.current;
        if (Math.abs(diff) > 0.05) {
          displayFrameRef.current += diff * LERP;
          drawIndex(displayFrameRef.current);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [firstFrameReady]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    targetFrameRef.current = Math.min(frames.count, Math.max(1, latest * (frames.count - 1) + 1));
  });

  useEffect(() => {
    if (!firstFrameReady) return;
    drawIndex(displayFrameRef.current);
    const handleResize = () => drawIndex(displayFrameRef.current);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [firstFrameReady]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
