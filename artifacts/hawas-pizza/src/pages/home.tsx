import { HeroSection } from "@/components/sections/hero";
import { PhilosophySection } from "@/components/sections/philosophy";
import { MenuSection } from "@/components/sections/menu";
import { ProcessSection } from "@/components/sections/process";
import { TestimonialSection } from "@/components/sections/testimonials";
import { ReservationSection } from "@/components/sections/reservation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <PhilosophySection />
        <MenuSection />
        <ProcessSection />
        <TestimonialSection />
        <ReservationSection />
      </main>
      <Footer />
    </div>
  );
}
