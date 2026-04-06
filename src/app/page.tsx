"use client";
import { HeroScroll } from "@/components/animation/HeroScroll";
import { Destinations } from "@/components/sections/Destinations";
import { GlobeShowcase } from "@/components/sections/GlobeShowcase";
import { VillaTransition } from "@/components/animation/VillaTransition";
import { ReservationModal } from "@/components/ui/ReservationModal";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section id="hero">
        <HeroScroll frameCount={199} sequencePath="/hero-sequence" />
      </section>

      {/* Destinations Section */}
      <Destinations />

      {/* Globe Experience */}
      <GlobeShowcase />

      {/* Luxury Estate Transition */}
      <VillaTransition />

      {/* CTA Section */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-xs uppercase tracking-[0.4em] text-accent font-medium mb-8">Ready to begin?</h2>
          <h1 className="text-3xl md:text-7xl font-serif tracking-[0.2em] uppercase mb-12 leading-[1.2]">
            Your Bespoke <br className="hidden md:block" /> Journey Awaits.
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-16 leading-relaxed">
            Our private concierges are available 24/7 to design your perfect escape. Experience the world on your terms.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-16 py-6 border border-accent hover:bg-accent/10 transition-all text-xs uppercase tracking-widest text-accent font-bold"
          >
            Request Private Access
          </button>
        </div>
      </section>

      {/* Booking Modal */}
      <ReservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
