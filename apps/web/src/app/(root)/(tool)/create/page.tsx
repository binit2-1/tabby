"use client"
import CodeEditor from '@/components/create-page/code-editor'


const Page = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center ">
      <div className='flex items-center justify-center h-full w-325 border-l-2 border-r-2 border-[#1f1f1f]'>
        <div className='flex h-full w-225 border-l-2 border-r-2 border-[#1f1f1f]'>
            <div className='flex flex-1 justify-center items-center mt-26.5'>
                <CodeEditor />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Page