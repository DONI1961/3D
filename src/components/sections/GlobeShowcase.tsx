"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

export function GlobeShowcase() {
  const containerRef = useRef(null);

  const stats = [
    { label: "Private Island", value: "24", unit: "Prop" },
    { label: "Bespoke Tours", value: "540", unit: "+" },
    { label: "Global Reach", value: "128", unit: "Loc" },
    { label: "Guest Satisfaction", value: "99.8", unit: "%" },
  ];

  return (
    <section className="relative min-h-screen py-32 flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        <img
          src="/globe-loop.png"
          alt="Globe Background"
          className="w-full h-full object-cover scale-110 opacity-40 blur-[2px]"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-xs uppercase tracking-[0.8em] text-accent mb-6 block">Our Legacy</span>
          <h2 className="text-6xl md:text-8xl font-serif tracking-[0.2em] uppercase leading-none">
            A World Without <br /> Boundaries
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 uppercase tracking-[0.3em]">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="text-4xl md:text-5xl font-serif mb-4 flex items-baseline justify-center">
                {stat.value}
                <span className="text-sm font-sans ml-1 text-accent">{stat.unit}</span>
              </div>
              <div className="text-[9px] text-white/40 group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
