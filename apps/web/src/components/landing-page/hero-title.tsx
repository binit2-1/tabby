import React from "react";
import { TabKeyScene } from "./tab-key-scene";

const HeroTitle = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-center mt-10 text-center text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-extrabold italic overflow-x-clip overflow-y-visible">
      <h1 className="w-full">
        <span className="block">
          <span className="font-plus-jakarta-sans">NO</span>{" "}
          <span className="font-carity">WIFI?</span>
        </span>
        <span className="block">
          <span className="font-carity">NO</span>{" "}
          <span className="font-plus-jakarta-sans">FEAR.</span>
        </span>
        <span className="block">
          <span className="font-plus-jakarta-sans">JUST</span>{" "}
          <span className="text-background">JUS</span>
          <span><TabKeyScene className="absolute h-full w-full top-22 left-20 sm:top-40 sm:left-38 md:top-50 md:left-48 lg:top-60 lg:left-58" /></span>
        </span>
      </h1>
    </div>
  );
};

export default HeroTitle;
