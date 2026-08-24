/**
 * Gemeinsamer Bildspeicher für die Hero-Bildfolge.
 *
 * Ladescreen und Canvas greifen auf dieselben Image-Objekte zu — würde jeder
 * für sich laden, käme alles doppelt über die Leitung.
 */

const DESKTOP_FRAMES = { dir: "hero-frames", count: 151 };
const MOBILE_FRAMES = { dir: "hero-frames-mobile", count: 76 };

/**
 * Einmal beim Laden des Moduls festgelegt. Ein Wechsel mitten im Scrollen
 * würde alle bereits geladenen Frames entwerten.
 */
export const frameSet =
  typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
    ? MOBILE_FRAMES
    : DESKTOP_FRAMES;

/**
 * Nur dieser Anteil blockiert den Ladescreen. Er deckt den ersten Abschnitt
 * des Scrollens ab; der Rest lädt nach, während man schon liest. Auf 100 % zu
 * warten hiesse bei schlechtem Empfang zweistellige Sekunden — da springen
 * Besucher ab, bevor sie die Seite überhaupt gesehen haben.
 */
const CRITICAL_RATIO = 0.4;
export const criticalCount = Math.ceil(frameSet.count * CRITICAL_RATIO);

export const frameImages: (HTMLImageElement | null)[] = new Array(frameSet.count).fill(null);

function frameUrl(index: number) {
  const n = String(index).padStart(3, "0");
  return `${import.meta.env.BASE_URL}${frameSet.dir}/frame-${n}.jpg`;
}

function whenIdle(cb: (deadline?: IdleDeadline) => void) {
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(cb, { timeout: 300 });
  } else {
    setTimeout(() => cb(), 16);
  }
}

function loadFrame(index: number, onSettled?: () => void) {
  const img = new Image();
  // Auch bei Fehler weitermelden, sonst bliebe der Ladescreen ewig stehen.
  img.onload = img.onerror = () => onSettled?.();
  img.src = frameUrl(index);
  frameImages[index - 1] = img;
}

let started = false;
let settledCritical = 0;

/**
 * Lädt zuerst die kritischen Frames (meldet dabei Fortschritt), danach den
 * Rest im Leerlauf. Mehrfache Aufrufe sind unschädlich.
 */
export function startFrameLoading(onProgress: (settled: number, total: number) => void) {
  if (started) {
    onProgress(settledCritical, criticalCount);
    return;
  }
  started = true;

  const loadRemainder = () => {
    let i = criticalCount + 1;
    const batch = (deadline?: IdleDeadline) => {
      while (i <= frameSet.count && (!deadline || deadline.timeRemaining() > 0)) {
        loadFrame(i++);
      }
      if (i <= frameSet.count) whenIdle(batch);
    };
    whenIdle(batch);
  };

  for (let i = 1; i <= criticalCount; i++) {
    loadFrame(i, () => {
      settledCritical++;
      onProgress(settledCritical, criticalCount);
      if (settledCritical === criticalCount) loadRemainder();
    });
  }
}
