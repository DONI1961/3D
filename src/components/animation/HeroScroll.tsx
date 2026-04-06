import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";

interface HeroScrollProps {
  frameCount: number;
  sequencePath: string;
}

export function HeroScroll({ frameCount, sequencePath }: HeroScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(25);

  const { images, progress, isLoaded } = useImagePreloader(sequencePath, frameCount, "ezgif-frame-{index}.jpg");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Complete the video animation by 80% scroll progress so it pauses on the final frame 
  // before physically moving to the next section of the site.
  // We start the mapping at 25 to skip the initial black frames.
  const frameIndex = useTransform(scrollYProgress, [0, 0.8], [25, frameCount], { clamp: true });

  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      // Hard clamp bounds between [25, frameCount]
      const validIndex = Math.max(25, Math.min(Math.ceil(latest), frameCount));
      setCurrentFrameIndex(validIndex || 25);
    });
    return () => unsubscribe();
  }, [frameIndex, frameCount]);

  // Handle high-performance canvas rendering
  useEffect(() => {
    if (!canvasRef.current || !images[currentFrameIndex - 1]) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const img = images[currentFrameIndex - 1];

    // Maintain aspect ratio while covering canvas
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, [currentFrameIndex, images]);

  // Handle window resizing and DPR
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const dpr = window.devicePixelRatio || 1;
      // Set physical dimensions in pixels
      canvasRef.current.width = window.innerWidth * dpr;
      canvasRef.current.height = window.innerHeight * dpr;
      
      // Trigger a re-render by slightly nudging the state if needed, 
      // but the currentFrameIndex effect will handle it.
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

        {/* Loading State Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background">
            <div className="w-64">
              <div className="mb-4 flex justify-between text-[10px] uppercase tracking-[0.3em] text-accent">
                <span>Initializing Experience</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-[1px] w-full bg-white/10">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Cinematic Content Overlay */}
        <div className="relative z-10 h-full w-full">
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <h1 className="text-xs uppercase tracking-[1em] text-accent mb-8 font-medium">Bespoke Journeys</h1>
            <h2 className="text-7xl md:text-[10vw] font-serif tracking-widest uppercase leading-none mb-12">
              Beyond <br /> Luxury
            </h2>
            <p className="text-white/40 text-sm tracking-[0.3em] uppercase max-w-xl leading-relaxed">
              Where the world&apos;s most exclusive destinations meet uncompromised service.
            </p>
          </motion.div>

          <motion.div
            style={{ 
              opacity: useTransform(scrollYProgress, [0.8, 0.9], [0, 1]),
              y: useTransform(scrollYProgress, [0.8, 1], [50, 0])
            }}
            className="absolute bottom-24 left-12 right-12 flex justify-between items-end border-t border-white/10 pt-12"
          >
            <div className="max-w-md">
              <h3 className="text-accent text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">Unveiling Sanctuary</h3>
              <p className="text-white/60 text-sm font-serif italic leading-relaxed">
                &quot;The transition from travel to experience begins the moment you arrive.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
