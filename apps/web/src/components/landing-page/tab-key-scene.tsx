"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { TabKeyModel } from "./Tab-key";
import { Suspense } from "react";
import { TabKeySceneLoader } from "./tab-key-scene-laoder"; // added import

// Responsive model that scales based on canvas size using R3F's reactive state
function ResponsiveTabKey() {
  // useThree is reactive — re-renders automatically on resize
  // size.width is in pixels, matching Tailwind breakpoints
  const { size } = useThree();

  // Tailwind breakpoints: sm=640, md=768, lg=1024, xl=1280
  let modelScale = 1;
  if (size.width < 640) {
    modelScale = 0.5; // Mobile (< sm)
  } else if (size.width < 768) {
    modelScale = 1.25; // Small tablets (sm to md)
  } else if (size.width < 1024) {
    modelScale = 1.5; // Tablets (md to lg)
  } else {
    modelScale = 2; // Desktop (lg+)
  }

  return (
    <Float
      speed={5}
      rotationIntensity={0.2}
      floatIntensity={0.2}
      floatingRange={[-0.1, 0.1]}
    >
      <TabKeyModel
        rotation={[-Math.PI / 600, Math.PI / 4, 0]}
        scale={[modelScale, modelScale, modelScale]}
      />
    </Float>
  );
}

export function TabKeyScene(props: { className?: string; onLoaded?: () => void; onProgress?: (progress: number) => void }) {
  return (
    <div className={props.className}>
      <Canvas
        shadows
        orthographic
        camera={{ position: [5, 20, 5], zoom: 100 }}
        dpr={[1, 2]}
      >
        {/* Canvas loader: uses useProgress + Html */}
        <TabKeySceneLoader onLoaded={props.onLoaded} onProgress={props.onProgress} />

        {/* LIGHTING */}
        <ambientLight intensity={0.1} />
        <directionalLight
          position={[-20, -60, -5]}
          intensity={10}
          castShadow
          shadow-bias={1}
        />

        {/* RESPONSIVE MODEL - scales automatically with viewport */}
        <Suspense fallback={null}>
          <ResponsiveTabKey />

          {/* SHADOW */}
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.4}
            scale={10}
            blur={2.5}
            far={4}
          />

          {/* REFLECTIONS */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
