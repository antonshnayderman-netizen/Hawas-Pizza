// Demo-Ansicht: Es ist kein echter Bestell-Anbieter angebunden.
// "Jetzt bestellen" springt deshalb zur Speisekarte statt auf eine externe Seite.
export function scrollToMenu() {
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
}
