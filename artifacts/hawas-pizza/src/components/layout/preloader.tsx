import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { startFrameLoading } from "@/lib/hero-frames";
import logoUrl from "@assets/deine-pizza-logo.png";

/** Harte Obergrenze: danach geht die Seite auf, egal wie das Netz gerade ist. */
const MAX_WAIT_MS = 3000;
/** Untergrenze, damit der Screen bei Cache-Treffern nicht nur kurz aufblitzt. */
const MIN_SHOW_MS = 900;
const SLICES = 8;
const SESSION_KEY = "hero-preloaded";

/** Kreisausschnitt als SVG-Pfad, bei 12 Uhr beginnend. */
function slicePath(index: number, total: number, radius: number) {
  const cx = 100;
  const cy = 100;
  const from = (index / total) * 2 * Math.PI - Math.PI / 2;
  const to = ((index + 1) / total) * 2 * Math.PI - Math.PI / 2;
  const x1 = cx + radius * Math.cos(from);
  const y1 = cy + radius * Math.sin(from);
  const x2 = cx + radius * Math.cos(to);
  const y2 = cy + radius * Math.sin(to);
  return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
}

export function Preloader() {
  // Wer schon geladen hat, sieht den Screen beim Zurückkommen nicht erneut.
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && !sessionStorage.getItem(SESSION_KEY)
  );
  const [percent, setPercent] = useState(0);
  const dismissed = useRef(false);

  useEffect(() => {
    const mountedAt = performance.now();
    let minTimer: number | undefined;

    const dismiss = () => {
      if (dismissed.current) return;
      const held = performance.now() - mountedAt;
      if (held < MIN_SHOW_MS) {
        // Fortschritt schon fertig, aber zu frueh: Rest der Mindestzeit abwarten.
        window.clearTimeout(minTimer);
        minTimer = window.setTimeout(dismiss, MIN_SHOW_MS - held);
        return;
      }
      dismissed.current = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      setPercent(100);
      setVisible(false);
    };

    startFrameLoading((settled, total) => {
      if (dismissed.current) return;
      setPercent(Math.round((settled / total) * 100));
      if (settled >= total) dismiss();
    });

    const maxTimer = window.setTimeout(dismiss, MAX_WAIT_MS);
    return () => {
      window.clearTimeout(maxTimer);
      window.clearTimeout(minTimer);
    };
  }, []);

  const filled = (percent / 100) * SLICES;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-[#0a0a0a]"
        >
          {/* Das Logo ist selbst fast schwarz und braucht auf dem dunklen
              Ladescreen eine helle Kante, sonst verschwindet es. */}
          <img
            src={logoUrl}
            alt="Obsidian Pulse"
            className="h-20 w-auto object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.42)] md:h-24"
          />

          <svg viewBox="0 0 200 200" className="h-40 w-40 md:h-48 md:w-48">
            <defs>
              <linearGradient id="slice-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F5D07A" />
                <stop offset="55%" stopColor="#E8A33D" />
                <stop offset="100%" stopColor="#B4691F" />
              </linearGradient>
            </defs>

            {/* Leerer Teller als Ziel-Umriss */}
            <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
            <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

            {Array.from({ length: SLICES }).map((_, i) => {
              // Anteilig füllen statt hart schalten – sonst springt es in Achteln.
              const fill = Math.max(0, Math.min(1, filled - i));
              return (
                <g key={i}>
                  <path
                    d={slicePath(i, SLICES, 72)}
                    fill="url(#slice-gold)"
                    opacity={fill}
                    style={{ transition: "opacity 220ms ease-out" }}
                  />
                  <path
                    d={slicePath(i, SLICES, 86)}
                    fill="none"
                    stroke="#E8A33D"
                    strokeWidth="2"
                    opacity={fill * 0.55}
                    style={{ transition: "opacity 220ms ease-out" }}
                  />
                </g>
              );
            })}
          </svg>

          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-3xl font-bold tabular-nums text-white md:text-4xl">
              {percent}%
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-white/40">
              wird geladen
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
