'use client'
import FlowingLine from '@/components/svg-animations/flowing-line'
import '../../../app/globals.css'

const Navbar = () => {
  return (
    <div className='relative w-full h-30 flex justify-center items-center bg-background'>
      
      <div className="hidden lg:block lg:absolute h-full w-0.5 left-[calc(50%-450px)] bg-[#1f1f1f]" />
      <div className="hidden lg:block lg:absolute h-full w-0.5 left-[calc(50%+450px)] bg-[#1f1f1f]" />

      <FlowingLine className="absolute top-26.5 w-full " />
    </div>
  )
}

export default Navbar