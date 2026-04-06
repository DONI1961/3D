"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Destinations", href: "#destinations" },
    { name: "Experiences", href: "#experiences" },
    { name: "Concierge", href: "#concierge" },
    { name: "Journal", href: "#journal" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif tracking-[0.3em] uppercase">
          Travel <span className="text-accent">Co.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <button className="px-8 py-2 border border-white/20 hover:border-accent hover:bg-accent/10 transition-all text-xs uppercase tracking-widest">
            Reserve
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col justify-center p-12 space-y-10 animate-in fade-in duration-500">
          <div className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-4xl font-serif tracking-[0.2em] uppercase hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <button 
            className="w-full py-6 border border-accent bg-accent/5 text-accent uppercase tracking-[0.3em] text-xs font-bold mt-8"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Reserve Now
          </button>
        </div>
      )}
    </nav>
  );
}
