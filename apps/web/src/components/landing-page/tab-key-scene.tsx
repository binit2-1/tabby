"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { TabKeyModel } from "./Tab-key"; // Import your working model

export function TabKeyScene() {
  return (
    <div className="absolute inset-0">
      <Canvas 
        shadows
        orthographic
        // Orthographic camera gives that distinct "isometric" look
        camera={{ position: [5, 20, 5], zoom: 150 }}
        dpr={[1, 2]} // High res for sharp edges
      >
        {/* LIGHTING: Essential for the orange to look bright */}
        <ambientLight intensity={0.7} />
        <directionalLight 
          position={[-20, -50, -60]} 
          intensity={10} 
          castShadow 
          shadow-bias={1}
        />
        
        {/* ANIMATION: Makes the key float gently */}
        <Float speed={5} rotationIntensity={0.2} floatIntensity={0.2} floatingRange={[-0.1, 0.1]}>
           {/* Your Blender Model */}
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