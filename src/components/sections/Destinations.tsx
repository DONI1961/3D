"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Maldives",
    category: "Private Island",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    name: "Bora Bora",
    category: "Overwater Villa",
    image: "https://images.unsplash.com/photo-1500932334442-8761ee4810a7?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    name: "Amalfi Coast",
    category: "Coastal Estate",
    image: "https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 4,
    name: "Seychelles",
    category: "Sanctuary",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1000",
  },
];

export function Destinations() {
  return (
    <section id="destinations" className="relative z-20 py-48 px-6 bg-background -mt-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.5em] text-accent font-medium mb-6"
            >
              The Collection
            </motion.h3>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif tracking-widest uppercase leading-tight"
            >
              Curated <br /> Destinations
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-sm text-sm font-light leading-relaxed mb-4"
          >
            From the deep blue of the Indian Ocean to the sun-drenched cliffs of the Mediterranean, our collection represents the pinnacle of global travel.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[600px] overflow-hidden cursor-pointer"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 h-full w-full object-cover grayscale-[100%] brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-12 left-10 right-10">
                <p className="text-[9px] uppercase tracking-[0.5em] text-accent mb-4 font-bold">
                  {dest.category}
                </p>
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-3xl font-serif tracking-[0.2em] uppercase leading-tight">{dest.name}</h3>
                  <ArrowUpRight className="text-white/20 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" size={28} />
                </div>
              </div>

              <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
