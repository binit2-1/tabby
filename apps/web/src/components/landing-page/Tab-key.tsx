"use client";

import * as THREE from 'three'
import React, { useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useSpring, animated } from '@react-spring/three'
import { ThreeElements } from '@react-three/fiber' // <--- 1. IMPORT THIS

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh
    Plane001: THREE.Mesh
  }
  materials: {
    Mat_keycap: THREE.MeshStandardMaterial
    Mat_Base: THREE.MeshStandardMaterial
  }
  animations: THREE.AnimationClip[]
}

// 2. USE ThreeElements['group'] instead of React.JSX...
export function TabKeyModel(props: ThreeElements['group']) {
  const { nodes, materials } = useGLTF('/tab-key.glb') as unknown as GLTFResult
  
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Listen for Tab key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault(); // Prevent default tab behavior
        setActive(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const { positionY } = useSpring({
    positionY: active ? -0.02 : 0.142,  // More dramatic press (lower when active)
    config: { mass: 1, tension: 500, friction: 20 },
  });

  return (
    <group {...props} dispose={null}>
      
      <animated.mesh 
        geometry={nodes.Plane.geometry} 
        material={materials.Mat_keycap} 
        position-y={positionY} 
        position-x={0}
        position-z={0}
        scale={[0.5, 1, 0.5]} 
        onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
        onPointerDown={() => setActive(true)}
        onPointerUp={() => setActive(false)}
      />

      <mesh 
        geometry={nodes.Plane001.geometry} 
        material={materials.Mat_Base} 
        scale={[1, 1, 0.642]} 
      />
    </group>
  )
}

useGLTF.preload('/tab-key.glb')