"use client"
import CodeEditor from '@/components/create-page/code-editor'
import { RightSideBar } from '@/components/create-page/ui-blocks/rigth-sidebar'
import LeftSideBar from '@/components/create-page/ui-blocks/left-sidebar'
import { useState } from 'react'


const Page = () => {
  const [language, setLanguage] = useState<string>('javascript')

  return (
    <div className="flex h-screen w-full justify-center items-center relative">
      <div className='flex items-center justify-center h-full w-325 border-l-2 border-r-2 border-[#1f1f1f]'>
        <div className='flex h-full w-225 border-l-2 border-r-2 border-[#1f1f1f]'>
            <div className='flex flex-1 justify-center items-center mt-26.5'>
                <CodeEditor language={language} onLanguageChange={setLanguage} />
            </div>
        </div>
      </div>
      {/* Left sidebar - fills space between outer and inner left borders */}
      <div className='absolute left-[calc(50%-650px)] w-50 top-30 bottom-0 flex items-center justify-center'>
        <LeftSideBar />
      </div>
      {/* Right sidebar - fills space between inner and outer right borders */}
      <div className='absolute right-[calc(50%-650px)] w-50  top-30 bottom-0 flex justify-center'>
        <RightSideBar language={language} setLanguage={setLanguage} />
      </div>
    </div>
  )
}

export default Page