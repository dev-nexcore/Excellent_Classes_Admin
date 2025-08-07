"use client"
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import Sidebar from './Home/sidebar'
import Navbar from './Home/navbar'

const LayoutWrapper = ({children}) => {
    const pathname = usePathname()
    const [sidebarOpen,setSidebarOpen] = useState(false)

    const noLayoutPages = ["/" , "/forgetpassword"];

    const hideLayout = noLayoutPages.includes(pathname);

  return (
   <>
   {hideLayout ? (children) : (
    <div className='min-h-screen bg-[#F4F9FF]'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

        <div className={`md:ml-60 min-h-screen flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-60' : ''}`}>
            <Navbar onSidebarToggle ={() => setSidebarOpen(!sidebarOpen)}/>
             <main className="flex-1 px-4 md:px-6 py-4 mt-16 sm:mt-10 md:mt-12">
              {children}
            </main>
        </div>
    </div>
   )}
   </>
  )
}

export default LayoutWrapper
