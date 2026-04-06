"use client";
import { useState, useEffect, useRef } from "react";

export const useImagePreloader = (path: string, count: number, template: string) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const loadingRef = useRef(false);

  useEffect(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const loadImage = (index: number) => {
      const img = new Image();
      // Template examples: "ezgif-frame-{index}.jpg" or "frame_{index}.jpg"
      const paddedIndex = index.toString().padStart(3, "0");
      img.src = `${path}/${template.replace("{index}", paddedIndex)}`;
      
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / count) * 100));
        
        // Progressive Loading Fix: 
        // Unlock the UI as soon as the first visible frame (25) or 15% is loaded
        // This prevents users on tunnels or slow networks from getting stuck forever.
        if (loadedCount >= 25 || loadedCount === count) {
          setIsLoaded(true);
        }
        if (loadedCount === count) {
          setImages([...loadedImages]);
        }
      };
      
      img.onerror = () => {
        console.error(`Failed to load image at ${img.src}`);
        loadedCount++;
        if (loadedCount >= 25 || loadedCount === count) {
          setIsLoaded(true);
        }
        if (loadedCount === count) {
          setImages([...loadedImages]);
        }
      };

      loadedImages[index - 1] = img;
      // We set the images reference immediately so the UI can draw whatever is ready
      setImages([...loadedImages]);
    };

    for (let i = 1; i <= count; i++) {
      loadImage(i);
    }
  }, [path, count, template]);

  return { images, progress, isLoaded };
};
