'use client'
import FlowingLine from '@/components/svg-animations/flowing-line'
import Logo from './logo'
import '../../../app/globals.css'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname();
  const isDocs = pathname.startsWith('/docs');
  const isCreate = pathname.startsWith('/create');
  return (
    <div className='fixed top-0 left-0 z-50 w-full h-26.5 flex justify-center items-center bg-background'>
      <div className="flex flex-row absolute h-full top-0 w-full min-[1300px]:w-225 left-1/2 -translate-x-1/2 border-x-0 min-[1300px]:border-x-2 border-[#1f1f1f] items-center px-6 justify-between">
        <Link href="/" className='flex pb-5 -ml-6 items-center h-full'>
          <Logo />
        </Link>
        <div className='flex items-center gap-6 min-[1300px]:gap-12'>
          <Link href="/docs" className={`cursor-pointer ${isDocs ? 'text-[#FF5800]' : 'text-white'} hover:text-[#FF5800] transition-colors duration-300 font-plus-jakarta-sans italic font-bold text-[12px] min-[1300px]:text-base`}>DOCS</Link>
          <Link href="/create" className={`cursor-pointer ${isCreate ? 'text-[#FF5800]' : 'text-white'} hover:text-[#FF5800] transition-colors duration-300 font-plus-jakarta-sans italic font-bold text-[12px] min-[1300px]:text-base`}>DIVE IN</Link>
        </div>
      </div>
      <FlowingLine className="absolute top-26.5 w-full " />
    </div>
  )
}

export default Navbar