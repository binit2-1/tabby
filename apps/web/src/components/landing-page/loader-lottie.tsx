"use client"
import Lottie from 'lottie-react'
import loadingAnimationLottie from '../../../public/loadingAnimationLottie.json'

interface LoaderProps {
    progress?: number;
    className?: string;
}


export function Loader({ progress, className = ""}: LoaderProps) {
    return (
    <div className={`flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-50 ${className}`}>
      <div className="w-56 h-56">
        <Lottie animationData={loadingAnimationLottie} loop={true} />
      </div>
      {/* {progress !== undefined && (
        <p className="mt-4 text-white font-mono text-sm">{progress.toFixed(0)}%</p>
      )} */}
    </div>
  );
}