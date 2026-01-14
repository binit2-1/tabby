"use client"

import { useProgress } from "@react-three/drei"
import { useEffect, useRef } from "react"

export function TabKeySceneLoader({ onLoaded, onProgress }: { onLoaded?: () => void; onProgress?: (progress: number) => void }) {
    const { active, progress } = useProgress()
    const hasCalledRef = useRef(false)
    
    useEffect(() => {
        // Send progress updates
        if (onProgress) {
            onProgress(progress)
        }
        
        // Call onLoaded when loading completes
        if (!active && !hasCalledRef.current && onLoaded) {
            hasCalledRef.current = true
            onLoaded()
        }
    }, [active, progress, onLoaded, onProgress])
    
    // Don't render anything - just track loading state
    return null
}