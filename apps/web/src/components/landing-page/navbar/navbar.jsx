'use client'
import FlowingLine from '@/components/svg-animations/flowing-line'
import '../../../app/globals.css'

const Navbar = () => {
  return (
    <div className='w-full h-30 flex justify-center bg-background'>
        <FlowingLine className="absolute top-26.5 w-full " />
    </div>
  )
}

export default Navbar