"use client";

import { TabKeyScene } from "@/components/landing-page/tab-key-scene"; 
import { Sparkles, WifiOff, ArrowRight } from "lucide-react";

export function BigTagline() {
  return (
    <div className="w-full h-full flex-col flex justify-center items-center text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem]">
      <h1>
        <span className="font-plus-jakarta-sans font-extrabold italic">NO</span>{" "}
        <span className="font-carity tracking-wider">WIFI?</span>{" "}
        
      </h1>
      <h1>
        <span className="font-carity tracking-wider">NO</span>{" "}
        <span className="font-plus-jakarta-sans font-extrabold italic">FEAR.</span>
      </h1>

      <h1 className="flex justify-center w-full">
        <TabKeyScene />
      </h1>
    </div>
  );
}
