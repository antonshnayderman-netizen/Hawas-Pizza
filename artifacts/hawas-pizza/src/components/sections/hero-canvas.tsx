import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

const FRAME_COUNT = 151;

function frameUrl(base: string, index: number) {
  const n = String(index).padStart(3, "0");
  return `${base}hero-frames/frame-${n}.jpg`;
}

interface HeroCanvasProps {
  targetRef: React.RefObject<HTMLElement | null>;
}

/**
 * Sticky, full-viewport canvas that scrubs through a pre-extracted frame
 * sequence (30fps) as the user scrolls through the hero section — the
 * pizza's 360° turn plays out entirely under scroll control, Apple-style.
 */
export function HeroCanvas({ targetRef }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const currentFrameRef = useRef(1);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameUrl(base, i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index - 1];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

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

    // object-cover style fit
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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frame = Math.min(
      FRAME_COUNT,
      Math.max(1, Math.round(latest * (FRAME_COUNT - 1)) + 1),
    );
    currentFrameRef.current = frame;
    drawFrame(frame);
  });

  useEffect(() => {
    if (!imagesLoaded) return;
    drawFrame(currentFrameRef.current);

    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
