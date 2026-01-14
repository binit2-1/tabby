// src/components/AnimatedFavicon.js
"use client";
import { useEffect } from "react";

const frames = [
  "/logoAndStates/default.svg", 
  "/logoAndStates/press1.svg",
  "/logoAndStates/press2.svg",
  "/logoAndStates/press3.svg",
];

export default function AnimatedFavicon() {
  useEffect(() => {
    let frameIndex = 0;
    
    // Select the existing favicon link
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;

    // Create it if it doesn't exist
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    const interval = setInterval(() => {
      link.href = frames[frameIndex];
      frameIndex = (frameIndex + 1) % frames.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // IMPORTANT: A component must return null or JSX, not void
  return null;
}