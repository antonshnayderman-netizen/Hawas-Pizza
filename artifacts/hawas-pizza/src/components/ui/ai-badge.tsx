import { cn } from "@/lib/utils";

/**
 * Transparenzhinweis für KI-generierte Bilder (EU AI Act, Art. 50).
 * Wird unten rechts im umgebenden `relative`-Container platziert.
 */
export function AiBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute bottom-2 right-2 z-30 select-none rounded",
        "bg-black/55 px-1.5 py-0.5 backdrop-blur-[2px]",
        "text-[10px] font-medium leading-none tracking-wide text-white/90",
        className
      )}
    >
      AI generated
    </span>
  );
}
