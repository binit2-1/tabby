"use client";

import { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { TabKeyModel } from "./Tab-key";

function ResponsiveCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const updateZoom = () => {
      const width = window.innerWidth;
      if (width < 640) {
        camera.zoom = 80;  // Mobile
      } else if (width < 768) {
        camera.zoom = 110; // Small tablets
      } else if (width < 1024) {
        camera.zoom = 120; // Tablet
      } else {
        camera.zoom = 150; // Desktop
      }
      camera.updateProjectionMatrix();
    };

    updateZoom();
    window.addEventListener("resize", updateZoom);
    return () => window.removeEventListener("resize", updateZoom);
  }, [camera]);

  return null;
}

export function TabKeyScene() {
  return (
    <div className="absolute flex justify-center font-plus-jakarta-sans w-140 h-30 sm:h-40 md:h-42 lg:h-52 lg:w-170 font-extrabold italic">
      <span className="ml-17 sm:ml-0 md:-ml-20 lg:-ml-30">JUST</span>
      <Canvas 
        shadows
        orthographic
        camera={{ position: [5, 20, 5], zoom: 150 }}
        dpr={[1, 2]}
        className="w-full h-full"
      >
        {/* Handles dynamic zoom on resize */}
        <ResponsiveCamera />

        {/* LIGHTING: Essential for the orange to look bright */}
        <ambientLight intensity={0.1} />
        <directionalLight 
          position={[-20, -60, -5]} 
          intensity={10} 
          castShadow 
          shadow-bias={1}
        />
        
        {/* ANIMATION: Makes the key float gently */}
        <Float speed={5} rotationIntensity={0.2} floatIntensity={0.2} floatingRange={[-0.1, 0.1]}>
           {/* Blender Model */}
           <TabKeyModel rotation={[-Math.PI / 600, Math.PI / 4,  0]} />
        </Float>

        {/* REALISM: Soft shadow underneath */}
        <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
        
        {/* REFLECTIONS: Adds subtle shininess to the plastic */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}