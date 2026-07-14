import { FadeIn } from "@/components/animations/fade-in";
import { Input } from "@/components/ui/premium-input";
import { Button } from "@/components/ui/premium-button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ReservationSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Anfrage gesendet.",
        description: "Wir melden uns in Kürze mit einer Bestätigung bei Ihnen.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="reservierung" className="py-32 bg-background">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Ein Tisch für Sie.</h2>
          <p className="text-muted-foreground font-serif italic text-xl mb-16">
            Reservieren Sie Ihren Abend in Barmbek.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pl-3">Name</label>
                <Input id="name" required placeholder="Ihr Name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pl-3">Email</label>
                <Input id="email" type="email" required placeholder="ihre.email@beispiel.de" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label htmlFor="date" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pl-3">Datum</label>
                <Input id="date" type="date" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="time" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pl-3">Uhrzeit</label>
                <Input id="time" type="time" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="guests" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pl-3">Personen</label>
                <Input id="guests" type="number" min="1" max="10" required placeholder="2" />
              </div>
            </div>

            <div className="pt-8 text-center">
              <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full md:w-auto md:min-w-[200px]">
                Anfragen
              </Button>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
