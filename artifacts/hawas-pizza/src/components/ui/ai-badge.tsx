import { cn } from "@/lib/utils";

/**
 * Transparenzhinweis für KI-generierte Bilder (EU AI Act, Art. 50).
 * Bewusst ein reines Wasserzeichen: keine Fläche, kein Rahmen, keine
 * Blur-Kachel – sonst liest es sich wie ein anklickbarer Button. Lesbar
 * muss es bleiben, mehr aber auch nicht.
 *
 * Wird unten rechts im umgebenden `relative`-Container platziert.
 * `tone="dark"` für helle Hintergründe (z.B. der weiße Hero-Verlauf).
 */
export function AiBadge({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute bottom-2 right-2.5 z-30 select-none",
        "text-[9px] font-normal leading-none tracking-wide",
        // Auf Bildern trägt der Schatten die Lesbarkeit, nicht die Deckkraft der
        // Schrift: auf dunklen Motiven fällt er weg, auf hellem Mehl hält er die Kante.
        tone === "dark"
          ? "text-black/40"
          : "text-white/70 [text-shadow:0_1px_3px_rgb(0_0_0/0.8),0_0_2px_rgb(0_0_0/0.55)]",
        className
      )}
    >
      AI generated
    </span>
  );
}
