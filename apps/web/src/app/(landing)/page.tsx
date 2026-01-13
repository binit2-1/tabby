"use client"

import { BigTagline } from '@/components/landing-page/hero-title'
import FlowingLine from '@/components/svg-animations/flowing-line'

const Page = () => {
  return (
    <main className='flex flex-col h-screen w-full bg-background overflow-hidden'>
      
      <div className="pt-28 w-full shrink-0">
        <FlowingLine className="w-full" />
      </div>

      <div className="flex flex-1 w-full h-full items-center justify-center mb-56">
        <BigTagline />
      </div>

      <div className="pb-28 w-full shrink-0">
        <FlowingLine className="w-full rotate-180" />
      </div>

    </main>
  )
}

export default Page