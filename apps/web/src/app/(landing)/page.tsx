'use client'
import HeroTitle from '@/components/landing-page/hero-title'
import Navbar from '@/components/landing-page/navbar/navbar'


const page = () => {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center '>
      <Navbar />
      <HeroTitle />
    </div>
  )
}

export default page