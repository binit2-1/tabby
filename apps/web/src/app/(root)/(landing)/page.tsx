'use client'
import { useState } from 'react'
import HeroTitle from '@/components/landing-page/hero-title'
import { Loader } from '@/components/landing-page/loader-lottie'

const page = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const handleLoaded = () => {
    // Wait 2.5 seconds after reaching 100% before showing the page
    setTimeout(() => setIsLoading(false), 2500)
  }

  const handleProgress = (progress: number) => {
    setLoadingProgress(progress)
  }

  return (
    <>
      {/* Fullscreen loader - covers entire viewport */}
      {isLoading && (
        <div className='fixed inset-0 z-[200] bg-background'>
          <Loader progress={loadingProgress} className='w-full h-full' />
        </div>
      )}

      {/* Main content - hidden while loading */}
      <div className={`w-screen min-h-screen flex flex-col items-center transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Spacer for fixed navbar */}
        <div className='h-26.5' />
        
        {/* Hero Section */}
        <div className='w-full flex flex-col justify-center items-center '>
          <HeroTitle onLoaded={handleLoaded} onProgress={handleProgress} />
        </div>

        {/* Test scroll content */}
        
      </div>
    </>
  )
}

export default page