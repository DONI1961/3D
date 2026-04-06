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
        if (loadedCount === count) {
          setIsLoaded(true);
          setImages(loadedImages);
        }
      };
      
      img.onerror = () => {
        console.error(`Failed to load image at ${img.src}`);
        loadedCount++;
        if (loadedCount === count) {
          setIsLoaded(true);
          setImages(loadedImages);
        }
      };

      loadedImages[index - 1] = img;
    };

    for (let i = 1; i <= count; i++) {
      loadImage(i);
    }
  }, [path, count, template]);

  return { images, progress, isLoaded };
};
