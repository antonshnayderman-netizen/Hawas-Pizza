import { FadeIn } from "@/components/animations/fade-in";
import margheritaUrl from "@assets/pizza-margherita.jpg";
import signatureUrl from "@assets/pizza-signature.jpg";

const MENU_ITEMS = [
  { name: "Pizza Margherita", price: "9,90", desc: "San Marzano Tomaten, Mozzarella, frisches Basilikum." },
  { name: "Pizza Salami", price: "11,90", desc: "Tomatensauce, Mozzarella, italienische Salami." },
  { name: "Pizza Peperoni", price: "12,90", desc: "Tomatensauce, Mozzarella, würzige Peperoniwurst." },
  { name: "Pizza Prosciutto Funghi", price: "12,90", desc: "Hinterschinken, frische Champignons." },
  { name: "Pizza Vegetarisch", price: "12,90", desc: "Gegrilltes Saisongemüse, rote Zwiebeln." },
  { name: "Pizza Tonno e Cipolla", price: "12,90", desc: "Thunfisch, rote Zwiebeln, schwarze Oliven." },
  { name: "Pizza Calzone", price: "14,90", desc: "Gefüllt mit Ricotta, Schinken, Salami, Champignons." },
  { name: "Pasta Carbonara", price: "12,90", desc: "Guanciale, Pecorino, Ei, schwarzer Pfeffer." },
];

export function MenuSection() {
  return (
    <section id="menu" className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-24">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Das Menü.</h2>
            <p className="text-muted-foreground font-serif italic text-xl">Handwerk auf dem Teller.</p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Visual Showcase */}
          <div className="space-y-12">
            <FadeIn>
              <div className="group relative overflow-hidden bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={signatureUrl} alt="Pizza Hawas Signature" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-baseline border-b border-border pb-4 mb-4">
                    <h3 className="text-2xl font-bold">Pizza Hawa's <span className="text-primary text-sm font-normal tracking-widest uppercase ml-2">Signature</span></h3>
                    <span className="text-xl font-light">13,90 €</span>
                  </div>
                  <p className="text-foreground/70 font-light">Frische Burrata, Prosciutto di Parma, Rucola, Kirschtomaten, Parmesan-Späne, Trüffelöl.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="group relative overflow-hidden bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={margheritaUrl} alt="Pizza Burrata" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-baseline border-b border-border pb-4 mb-4">
                    <h3 className="text-2xl font-bold">Pizza Burrata</h3>
                    <span className="text-xl font-light">12,90 €</span>
                  </div>
                  <p className="text-foreground/70 font-light">San Marzano Tomaten, eine ganze frische Burrata, Pesto Genovese, Basilikum.</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Text Menu */}
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              {MENU_ITEMS.map((item, i) => (
                <FadeIn key={item.name} delay={i * 0.1} direction="up">
                  <div className="group flex flex-col">
                    <div className="flex justify-between items-baseline mb-2 relative">
                      <h4 className="text-lg font-medium bg-secondary/30 pr-4 relative z-10">{item.name}</h4>
                      <div className="flex-grow border-b border-dashed border-border/60 mx-4 relative top-[-6px]"></div>
                      <span className="text-lg bg-secondary/30 pl-4 relative z-10">{item.price} €</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
              
              <FadeIn delay={0.8} direction="up">
                 <div className="mt-12 pt-8 border-t border-border">
                    <h4 className="text-lg font-medium mb-4">Dolci & Antipasti</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-muted-foreground">Bruschetta (4 Stück)</span>
                        <span>7,90 €</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-muted-foreground">Tiramisu della Casa</span>
                        <span>6,50 €</span>
                      </div>
                    </div>
                 </div>
              </FadeIn>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
