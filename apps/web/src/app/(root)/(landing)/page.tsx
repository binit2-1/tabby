'use client'
import HeroTitle from '@/components/landing-page/hero-title'

const page = () => {
  return (
    <div className='w-screen min-h-screen flex flex-col items-center'>
      {/* Spacer for fixed navbar */}
      <div className='h-26.5' />
      
      {/* Hero Section */}
      <div className='w-full flex flex-col justify-center items-center '>
        <HeroTitle />
      </div>

      {/* Test scroll content */}
      
    </div>
  )
}

export default page