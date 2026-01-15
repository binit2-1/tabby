"use client"
import CodeEditor from '@/components/create-page/code-editor'
import { RightSideBar } from '@/components/create-page/ui-blocks/rigth-sidebar'
import LeftSideBar from '@/components/create-page/ui-blocks/left-sidebar'
import { useState } from 'react'


const Page = () => {
  const [language, setLanguage] = useState<string>('javascript')

  return (
    <div className="flex h-screen w-full justify-center items-center ">
      <div className='flex items-center justify-center h-full w-325 border-l-2 border-r-2 border-[#1f1f1f]'>
        <div className='flex h-full w-225 border-l-2 border-r-2 border-[#1f1f1f]'>
            <div className='flex flex-1 justify-center items-center mt-26.5'>
                <CodeEditor language={language} onLanguageChange={setLanguage} />
            </div>
        </div>
        {/* Left sidebar between inner and outer left borders */}
        <div className='absolute left-92 top-30 bottom-0'>
          <LeftSideBar />
        </div>
        {/* Right sidebar between inner and outer right borders */}
        <div className='absolute right-81 top-30 bottom-0'>
          <RightSideBar language={language} setLanguage={setLanguage} />
        </div>
      </div>
    </div>
  )
}

export default Page