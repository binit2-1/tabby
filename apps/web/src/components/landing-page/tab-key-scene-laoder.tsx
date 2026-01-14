"use client"

import { useProgress } from "@react-three/drei"
import { useEffect, useRef } from "react"

export function TabKeySceneLoader({ onLoaded, onProgress }: { onLoaded?: () => void; onProgress?: (progress: number) => void }) {
    const { active, progress, loaded, total } = useProgress()
    const hasCalledRef = useRef(false)
    
    useEffect(() => {
        // Send progress updates
        if (onProgress) {
            onProgress(progress)
        }
        
        // Call onLoaded only when:
        // 1. Loading is no longer active (!active)
        // 2. Progress is 100%
        // 3. All items are loaded (loaded === total)
        // 4. We haven't called it yet
        if (!active && progress === 100 && loaded === total && !hasCalledRef.current && onLoaded) {
            hasCalledRef.current = true
            // Add small delay to ensure rendering completes
            setTimeout(() => {
                onLoaded()
            }, 500)
        }
    }, [active, progress, loaded, total, onLoaded, onProgress])
    
    // Don't render anything - just track loading state
    return null
}