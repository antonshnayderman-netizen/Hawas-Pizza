import { FadeIn } from "@/components/animations/fade-in";
import margheritaUrl from "@assets/pizza-margherita.jpg";
import signatureUrl from "@assets/pizza-signature.jpg";
import insalataUrl from "@assets/insalata-hawas.jpg";

interface MenuItem {
  name: string;
  price: string;
  desc?: string;
}

const PIZZA: MenuItem[] = [
  { name: "Pizza Marinara", price: "8,90", desc: "Tomatensauce, Knoblauchöl, Olivenöl (ohne Käse)." },
  { name: "Pizza Vegan", price: "12,90", desc: "Brokkoli, Spinat, rote Zwiebeln, Mais, Oliven (ohne Käse)." },
  { name: "Pizza Margherita", price: "9,90" },
  { name: "Pizza Salami", price: "11,90" },
  { name: "Pizza Prosciutto e Funghi", price: "12,90", desc: "Schinken, Champignons." },
  { name: "Pizza Hawaii", price: "12,90", desc: "Ananas, Schinken." },
  { name: "Pizza Tonno e Cipolla", price: "13,90", desc: "Thunfisch, rote Zwiebeln." },
  { name: "Pizza Tonno e Spinaci", price: "13,90", desc: "Thunfisch, Spinat." },
  { name: "Pizza Spinaci", price: "12,90", desc: "Spinat, Schafskäse." },
  { name: "Pizza Rucola", price: "12,90", desc: "Rucola, frische Tomaten, Parmesan, Knoblauchöl." },
  { name: "Pizza Bufalina", price: "12,90", desc: "Büffelmozzarella, Cherrytomaten, Olivenöl." },
  { name: "Pizza Burrata", price: "12,90", desc: "Olivenöl, Cherrytomaten, Burrata." },
  { name: "Pizza Caprese", price: "12,90", desc: "Frischer Mozzarella, Cherrytomaten, Olivenöl." },
  { name: "Pizza Peperoni", price: "13,90", desc: "Scharfe Salami, Peperoni, Oliven, Cherrytomaten." },
  { name: "Pizza Vegetariana", price: "12,90", desc: "Champignons, Brokkoli, Mais, Oliven, Cherrytomaten, Paprika." },
  { name: "Pizza Frutti di Mare", price: "14,90", desc: "Frutti di Mare, Cherrytomaten, Rucola, Knoblauch." },
  { name: "Pizza Scampi", price: "14,90", desc: "Scampi, Rucola, Knoblauch, Cherrytomaten." },
  { name: "Pizza Hackfleisch", price: "13,90", desc: "Hackfleisch, rote Zwiebeln, Paprika." },
  { name: "Pizza Sucuk", price: "13,90", desc: "Sucuk, Oliven, Schafskäse." },
  { name: "Pizza Napoli", price: "13,90", desc: "Sardellen, Kapern, Oliven." },
  { name: "Pizza Diavola", price: "13,90", desc: "Salami, Jalapeños, Oliven." },
  { name: "Pizza Mexicana", price: "13,90", desc: "Jalapeños, Mais, rote Zwiebeln." },
  { name: "Pizza Capricciosa", price: "13,90", desc: "Schinken, Champignons, Peperoni, Oliven." },
  { name: "Pizza Parmigiana", price: "12,90", desc: "Auberginen, Parmesan." },
  { name: "Pizza Würstel", price: "13,90", desc: "Tomatensauce, Würstchen, Mais, rote Zwiebeln." },
  { name: "Pizza BBQ Chicken", price: "13,90", desc: "Barbecuesauce, Hähnchenbrust, rote Zwiebeln, Paprika." },
  { name: "Pizza Curry Chicken", price: "13,90", desc: "Currysauce, Hähnchenbrust, Ananas, rote Zwiebeln, Paprika." },
  { name: "Pizza Döner", price: "13,90", desc: "Sauce Hollandaise, Dönerfleisch (Hähnchen), rote Zwiebeln, Peperoni." },
  { name: "Pizza Calzone", price: "13,90", desc: "Schinken, Salami, Champignons." },
  { name: "Pizza Pesto", price: "11,90", desc: "Pesto Genovese, Mozzarella, Cherrytomaten." },
  { name: "Pizza Carbonara", price: "13,90", desc: "Schinken, Ei, Parmesan (bianca, ohne Tomatensauce)." },
  { name: "Pizza Gorgonzola e Spinaci", price: "12,90", desc: "Gorgonzola, Spinat (bianca, ohne Tomatensauce)." },
];

const PASTA: MenuItem[] = [
  { name: "Pasta al Pomodoro", price: "9,90", desc: "Spaghetti, Tomatensauce, Parmesan, Petersilie, Cherrytomaten." },
  { name: "Pasta Arrabbiata", price: "9,90", desc: "Spaghetti, Tomatensauce, Knoblauch, Chili, Petersilie – scharf." },
  { name: "Pasta Aglio e Olio", price: "9,90", desc: "Spaghetti, Knoblauch, Olivenöl, Chili, Petersilie – scharf." },
  { name: "Pasta Bolognese", price: "11,90", desc: "Spaghetti, Rinderhackfleischsauce, Parmesan, Petersilie." },
  { name: "Pasta Hawa's", price: "12,90", desc: "Tomaten- und Sahnesauce, Hähnchenbrust, rote Zwiebeln, Brokkoli, Cherrytomaten." },
  { name: "Pasta Curry Chicken", price: "12,90", desc: "Currysauce, Hähnchenbrust, Paprika, rote Zwiebeln, Petersilie." },
  { name: "Pasta Scampi", price: "13,90", desc: "Tomatensauce, Scampi, Knoblauch, Rucola, Petersilie." },
  { name: "Pasta Frutti di Mare", price: "13,90", desc: "Knoblauch, Olivenöl, Frutti di Mare, Petersilie." },
  { name: "Pasta Vegetariana", price: "10,90", desc: "Tomatensauce, Champignons, Paprika, Zucchini, Oliven, Petersilie." },
  { name: "Lasagne", price: "12,90", desc: "Schichtnudeln, Hackfleisch, Béchamelsauce, Mozzarella." },
  { name: "Pasta Carbonara", price: "11,90", desc: "Sahnesauce, Schinken, Ei, Petersilie." },
  { name: "Pasta Spinat", price: "10,90", desc: "Sahnesauce, Spinat, Cherrytomaten, Petersilie." },
];

const SALATE: MenuItem[] = [
  { name: "Insalata Mista", price: "8,90", desc: "Gemischter Salat, Rucola, Cherrytomaten, Gurken, Oliven, Mais, Balsamico." },
  { name: "Insalata Rucola", price: "8,90", desc: "Rucola, Cherrytomaten, Parmesan, Balsamico." },
  { name: "Insalata Tonno", price: "9,90", desc: "Gemischter Salat, Thunfisch, rote Zwiebeln, Balsamico." },
  { name: "Insalata di Pollo", price: "9,90", desc: "Gemischter Salat, Hähnchenbrust, Caesar-Dressing." },
  { name: "Insalata Hawa's", price: "11,90", desc: "Gemischter Salat, Garnelen, Caesar-Dressing." },
];

const VORSPEISEN: MenuItem[] = [
  { name: "Antipasti Misto", price: "11,90", desc: "Gegrilltes Gemüse, Olivenöl, Büffelmozzarella, Oliven, Tomaten, Basilikum." },
  { name: "Bruschetta", price: "7,90", desc: "4 Stück, geröstetes Brot mit frischen Tomaten, Knoblauch, Basilikum." },
  { name: "Bruschetta al Pesto", price: "8,90", desc: "4 Stück, Pesto Genovese, frische Tomaten, Knoblauch, Basilikum." },
  { name: "Bruschetta Burrata", price: "8,90", desc: "4 Stück, Burrata, frische Tomaten, Basilikum, Knoblauch." },
  { name: "Pane al Pomodoro", price: "7,90", desc: "28 cm, Pesto Genovese, Olivenöl, Basilikum, Oregano." },
  { name: "Pane al Pesto", price: "7,90", desc: "28 cm, Pesto Genovese, Olivenöl, Basilikum, Oregano." },
  { name: "Pomodoro e Bufala", price: "9,90", desc: "Büffelmozzarella, Tomaten, rote Zwiebeln, Basilikum, Olivenöl." },
];

const DESSERT: MenuItem[] = [
  { name: "Pizza Schokolade", price: "7,90", desc: "28 cm, hausgemacht mit Schokolade und Pistazien." },
  { name: "Tiramisu", price: "6,90", desc: "Mascarpone, Espresso, Löffelbiskuit, Kakao – hausgemacht." },
  { name: "Erdbeeren Mascarpone", price: "6,90", desc: "Frische Erdbeeren, Mascarponecreme, Keksbrösel – hausgemacht." },
];

function MenuGroup({
  title,
  items,
  delay = 0,
  showTitle = true,
}: {
  title: string;
  items: MenuItem[];
  delay?: number;
  showTitle?: boolean;
}) {
  return (
    <FadeIn delay={delay} direction="up">
      <div>
        {showTitle && (
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-8">{title}</h3>
        )}
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.name} className="group flex flex-col">
              <div className="flex justify-between items-baseline gap-4 mb-1">
                <h4 className="text-base font-medium leading-snug">{item.name}</h4>
                <span className="text-base font-light whitespace-nowrap">{item.price} €</span>
              </div>
              {item.desc && (
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

/** Splits a list into `n` contiguous chunks of near-equal size (last chunks absorb the remainder). */
function splitEvenly<T>(items: T[], n: number): T[][] {
  const base = Math.floor(items.length / n);
  const remainder = items.length % n;
  const chunks: T[][] = [];
  let offset = 0;
  for (let i = 0; i < n; i++) {
    const size = base + (i < remainder ? 1 : 0);
    chunks.push(items.slice(offset, offset + size));
    offset += size;
  }
  return chunks;
}

export function MenuSection() {
  return (
    <section id="menu" className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Das Menü.</h2>
            <p className="text-muted-foreground font-serif italic text-xl">Handwerk auf dem Teller. Alles zur Abholung.</p>
          </FadeIn>
        </div>

        {/* Signature Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <FadeIn>
            <div className="group relative overflow-hidden bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={signatureUrl} alt="Pizza Hawa's Signature" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-baseline border-b border-border pb-4 mb-4">
                  <h3 className="text-2xl font-bold">Pizza Hawa's <span className="text-primary text-sm font-normal tracking-widest uppercase ml-2">Signature</span></h3>
                  <span className="text-xl font-light">13,90 €</span>
                </div>
                <p className="text-foreground/70 font-light">Sauce Hollandaise, Hähnchenbrust, Paprika, rote Zwiebeln, Brokkoli.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="group relative overflow-hidden bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={margheritaUrl} alt="Pizza Burrata" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-baseline border-b border-border pb-4 mb-4">
                  <h3 className="text-2xl font-bold">Pizza Burrata</h3>
                  <span className="text-xl font-light">12,90 €</span>
                </div>
                <p className="text-foreground/70 font-light">Olivenöl, Cherrytomaten und eine ganze frische Burrata.</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Pizza · 32 cm — split into three evenly balanced columns */}
        <FadeIn direction="up">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-8">Pizza · 32 cm</h3>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 mb-24">
          {splitEvenly(PIZZA, 3).map((column, i) => (
            <MenuGroup key={i} title="Pizza · 32 cm" items={column} delay={i * 0.05} showTitle={false} />
          ))}
        </div>

        {/* Pasta, Vorspeisen & Salate, Dessert */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          <MenuGroup title="Pasta" items={PASTA} delay={0} />
          <div className="space-y-16">
            <MenuGroup title="Vorspeisen" items={VORSPEISEN} delay={0.05} />
            <MenuGroup title="Salate" items={SALATE} delay={0.1} />
          </div>
          <div className="flex flex-col gap-16">
            <MenuGroup title="Dessert" items={DESSERT} delay={0.15} />
            <FadeIn delay={0.25}>
              <div className="group relative overflow-hidden bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={insalataUrl}
                    alt="Insalata Hawa's"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-baseline border-b border-border pb-3 mb-3">
                    <h3 className="text-lg font-bold">Insalata Hawa's</h3>
                    <span className="text-base font-light">11,90 €</span>
                  </div>
                  <p className="text-sm text-foreground/70 font-light">Gemischter Salat, Garnelen, Caesar-Dressing.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center text-xs text-muted-foreground/70 mt-16">
            Alle Pizzen mit Basilikum, Oregano und Mozzarella. * Zusatzstoffe auf Anfrage.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
