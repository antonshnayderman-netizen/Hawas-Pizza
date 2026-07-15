import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

const FRAME_COUNT = 151;
/** Lerp factor per frame — higher = snappier, lower = smoother/laggier */
const LERP = 0.1;

function frameUrl(base: string, index: number) {
  const n = String(index).padStart(3, "0");
  return `${base}hero-frames/frame-${n}.jpg`;
}

interface HeroCanvasProps {
  targetRef: React.RefObject<HTMLElement | null>;
}

export function HeroCanvas({ targetRef }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // float target index (1–151) set by scroll
  const targetFrameRef = useRef(1);
  // float display index that lerps toward target each RAF tick
  const displayFrameRef = useRef(1);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Preload all frames
  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameUrl(base, i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setImagesLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const drawIndex = (floatIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const index = Math.min(FRAME_COUNT, Math.max(1, Math.round(floatIndex)));
    const img = imagesRef.current[index - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement?.clientWidth ?? window.innerWidth;
    const height = canvas.parentElement?.clientHeight ?? window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // object-cover fit
    const canvasRatio = width / height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // RAF loop: lerp displayFrame → targetFrame and draw every tick
  useEffect(() => {
    if (!imagesLoaded) return;

    const tick = () => {
      const current = displayFrameRef.current;
      const target = targetFrameRef.current;
      const diff = target - current;

      // Only redraw when there's a meaningful difference
      if (Math.abs(diff) > 0.05) {
        displayFrameRef.current = current + diff * LERP;
        drawIndex(displayFrameRef.current);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [imagesLoaded]);

  // Translate scroll progress → target frame (no draw here — RAF handles it)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    targetFrameRef.current = Math.min(
      FRAME_COUNT,
      Math.max(1, latest * (FRAME_COUNT - 1) + 1),
    );
  });

  // Draw first frame once loaded; re-draw on resize
  useEffect(() => {
    if (!imagesLoaded) return;
    drawIndex(displayFrameRef.current);

    const handleResize = () => drawIndex(displayFrameRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
