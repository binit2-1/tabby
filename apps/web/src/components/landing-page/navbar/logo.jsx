"use client";
import { useState, useEffect } from "react";

// Import your SVG files directly
import defaultState from "../../../../public/logoAndStates/default.svg";
import press1 from "../../../../public/logoAndStates/press1.svg";
import press2 from "../../../../public/logoAndStates/press2.svg";
import press3 from "../../../../public/logoAndStates/press3.svg";

const pressStates = [press1, press2, press3];

// Helper to get image src
const getImageSrc = (img) => img.src || img;

export default function Logo() {
  const [activeImage, setActiveImage] = useState(defaultState);
  const [isClicking, setIsClicking] = useState(false);

  // Preload all images on mount for instant switching
  useEffect(() => {
    const imagesToPreload = [defaultState, ...pressStates];
    imagesToPreload.forEach((img) => {
      const preloadImg = new Image();
      preloadImg.src = getImageSrc(img);
    });
  }, []);

  const handleClick = () => {
    // Prevent double-clicking while animation is running
    if (isClicking) return;

    setIsClicking(true);

    // Pick a random press state (1, 2, or 3)
    const randomChoice = pressStates[Math.floor(Math.random() * pressStates.length)];

    // Show the pressed state
    setActiveImage(randomChoice);

    // Reset back to default after 200ms 
    setTimeout(() => {
      setActiveImage(defaultState);
      setIsClicking(false);
    }, 200);
  };

  return (
    <button 
      onClick={handleClick}
      className="border-none bg-transparent p-0 cursor-pointer outline-none transition-transform"
      aria-label="Home"
    >
      <img 
        src={getImageSrc(activeImage)}
        alt="Logo" 
        className="h-18 w-auto select-none"
        draggable="false"
      />
    </button>
  );
}