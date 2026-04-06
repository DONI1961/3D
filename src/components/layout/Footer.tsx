"use client";
import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-background border-t border-white/5 pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-serif tracking-widest uppercase mb-6">
              Travel <span className="text-accent">Co.</span>
            </h2>
            <p className="text-gray-400 max-w-sm text-sm font-light leading-relaxed mb-8">
              Experience the world&apos;s most exclusive destinations through our meticulously curated bespoke concierge service. We don&apos;t just plan travels; we curate memories that last a lifetime.
            </p>
            <div className="flex gap-8">
              <a href="#" className="p-2 -m-2"><Globe className="hover:text-accent cursor-pointer transition-colors" size={20} /></a>
              <a href="#" className="p-2 -m-2"><Mail className="hover:text-accent cursor-pointer transition-colors" size={20} /></a>
              <a href="#" className="p-2 -m-2"><Phone className="hover:text-accent cursor-pointer transition-colors" size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] font-medium text-white/50 mb-6">Services</h3>
            <ul className="space-y-4 text-xs uppercase tracking-widest">
              <li><Link href="/" className="hover:text-accent transition-colors">Private Jet Charter</Link></li>
              <li><Link href="/" className="hover:text-accent transition-colors">Bespoke Journeys</Link></li>
              <li><Link href="/" className="hover:text-accent transition-colors">Yacht Concierge</Link></li>
              <li><Link href="/" className="hover:text-accent transition-colors">Luxury Real Estate</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] font-medium text-white/50 mb-6">Support</h3>
            <ul className="space-y-4 text-xs uppercase tracking-widest">
              <li><Link href="/" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/" className="hover:text-accent transition-colors">Membership</Link></li>
              <li><Link href="/" className="hover:text-accent transition-colors">Legal & Privacy</Link></li>
              <li><Link href="/" className="hover:text-accent transition-colors">Press</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-32 flex flex-col md:flex-row justify-between items-center gap-10 relative z-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 text-center md:text-left">
            &copy; {currentYear} Travel Co. Bespoke Concierge. <span className="hidden md:inline">|</span> <br className="md:hidden" /> All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-[10px] uppercase tracking-[0.4em] font-medium">
            <span className="hover:text-accent cursor-pointer text-white/70 transition-colors">Member of IATA</span>
            <span className="w-px h-4 bg-white/20 hidden md:block" />
            <span className="hover:text-accent cursor-pointer text-white/70 transition-colors">CLIA Preferred Partner</span>
          </div>
        </div>

        <div className="mt-72 text-center select-none pointer-events-none opacity-[0.015] pb-24">
          <h1 className="text-[20vw] font-serif tracking-[0.5em] uppercase leading-none">
            Travel Co.
          </h1>
        </div>
      </div>
    </footer>
  );
}
