import { scrollToId } from "@/lib/smooth-scroll";

// Demo-Ansicht: Es ist kein echter Bestell-Anbieter angebunden.
// "Jetzt bestellen" springt deshalb zur Speisekarte statt auf eine externe Seite.
export function scrollToMenu() {
  scrollToId("menu");
}
