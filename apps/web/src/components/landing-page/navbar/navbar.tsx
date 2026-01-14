'use client'
import FlowingLine from '@/components/svg-animations/flowing-line'
import Logo from './logo'
import '../../../app/globals.css'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 z-50 w-full h-26.5 flex justify-center items-center bg-background'>
      <div className="hidden lg:flex lg:flex-row lg:absolute h-full top-0 w-225 left-1/2 -translate-x-1/2 border-x-2 border-[#1f1f1f] items-center px-6 justify-between">
        <Link href="/" className='flex pb-5 -ml-6 items-center h-full'>
          <Logo />
        </Link>
        <div className='flex items-center gap-12'>
          <Link href="/docs" className='cursor-pointer font-plus-jakarta-sans italic font-bold'>DOCS</Link>
          <Link href="/create" className='cursor-pointer font-plus-jakarta-sans italic font-bold'>DIVE IN</Link>
        </div>
      </div>
      <div className="lg:hidden flex flex-row absolute w-screen h-full top-0 left-1/2 -translate-x-1/2 border-x-2 border-[#1f1f1f] items-center px-6 justify-between">
        <Link href="/" className='flex pb-5 -ml-6 items-center h-full'>
          <Logo />
        </Link>
        <div className='flex pb-5 -ml-6 items-center gap-6 text-[12px]'>
          <Link href="/docs" className='cursor-pointer font-plus-jakarta-sans italic font-bold'>DOCS</Link>
          <Link href="/create" className='cursor-pointer font-plus-jakarta-sans italic font-bold'>DIVE IN</Link>
        </div>
      </div>
      <FlowingLine className="absolute top-26.5 w-full " />
    </div>
  )
}

export default Navbar