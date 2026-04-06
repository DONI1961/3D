"use client";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";

export function VillaTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const { images, isLoaded } = useImagePreloader("/sequence-2", 5, "frame_{index}.jpg");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const frameIndex = useTransform(springScroll, [0, 1], [0, images.length - 1]);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isLoaded || images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    let animationFrameId: number;

    const render = () => {
      const idx = Math.round(frameIndex.get());
      const img = images[idx];

      if (img && img.complete) {
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.width;
        const ih = img.height;
        const r = Math.max(cw / iw, ch / ih);
        const nw = iw * r;
        const nh = ih * r;
        const cx = (cw - nw) / 2;
        const cy = (ch - nh) / 2;

        context.drawImage(img, cx, cy, nw, nh);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isLoaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          width={windowSize.width * (typeof window !== "undefined" ? window.devicePixelRatio : 1)}
          height={windowSize.height * (typeof window !== "undefined" ? window.devicePixelRatio : 1)}
          className="w-full h-full object-cover grayscale-[0.1]"
          style={{ width: "100%", height: "100%" }}
        />
        
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-black/10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center px-12"
          >
            <h2 className="text-5xl md:text-[8vw] font-serif uppercase tracking-[0.1em] opacity-60 mb-12 leading-[1.1]">
              Bespoke <br /> Sanctuaries.
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 opacity-60 text-center px-4">
              <span className="text-[9px] uppercase tracking-[0.5em] whitespace-nowrap">Seaside Estates</span>
              <span className="text-[9px] uppercase tracking-[0.5em] whitespace-nowrap">Mountain Chalets</span>
              <span className="text-[9px] uppercase tracking-[0.5em] whitespace-nowrap">Penthouse Living</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
