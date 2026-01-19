import React from "react";
import { TabKeyScene } from "./tab-key-scene";

interface HeroTitleProps {
  onLoaded?: () => void;
  onProgress?: (progress: number) => void;
}

const HeroTitle = ({ onLoaded, onProgress }: HeroTitleProps) => {
  return (
    <div className="relative w-full h-full flex justify-center items-center mt-10 text-center text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-extrabold italic overflow-x-clip overflow-y-visible">
      <h1 className="w-full">
        <span className="block">
          <span className="font-plus-jakarta-sans text-white">NO</span>{" "}
          <span className="font-carity text-white">WIFI?</span>
        </span>
        <span className="block">
          <span className="font-carity text-white">NO</span>{" "}
          <span className="font-plus-jakarta-sans text-white">FEAR.</span>
        </span>
        <span className="block">
          <span className="font-plus-jakarta-sans text-white">JUST</span>{" "}
          <span className="text-[#0A0A0A]">JUS</span>
          <span><TabKeyScene onLoaded={onLoaded} onProgress={onProgress} className="absolute h-full w-full top-22 left-20 sm:top-40 sm:left-38 md:top-50 md:left-48 lg:top-60 lg:left-58" /></span>
        </span>
      </h1>
    </div>
  );
};

export default HeroTitle;
