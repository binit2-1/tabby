"use client";

import { TabKeyScene } from "@/components/landing-page/tab-key-scene"; 
import { Sparkles, WifiOff, ArrowRight } from "lucide-react";

export function BigTagline() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center z-10  ">
      <h1 className="text-7xl md:text-[200px] font-extrabold items-center justify-center selection:bg-[#FF6B00]">
        <span className="font-plus-jakarta-sans italic selection:bg-[#FF6B00] ">NO</span>{" "}
        <span className="font-carity selection:bg-[#FF6B00]">WIFI?</span>
      </h1>
      <h1 className="text-7xl md:text-[200px] font-extrabold items-center justify-center selection:bg-[#FF6B00] ">
        <span className="font-carity selection:bg-[#FF6B00]">NO</span>{" "}
        <span className="font-plus-jakarta-sans italic selection:bg-[#FF6B00] ">FEAR.</span>
      </h1>
      <h1 className="text-7xl md:text-[200px] font-extrabold flex items-center justify-center">
        <span className="font-plus-jakarta-sans italic mr-100 selection:bg-[#FF6B00] ">JUST</span>{" "}
        <span className="absolute inline-block w-45 h-30 md:w-85 md:h-70 left-275 mt-10">
          <TabKeyScene />
        </span>
      </h1>
      {/* ... ( buttons and subtext) ... */}
    </div>
  );
}
