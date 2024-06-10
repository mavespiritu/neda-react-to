import Header from '@/layouts/Header'
import Sidebar from '@/layouts/Sidebar'
import React from 'react'

interface ChildrenProps {
    children: React.ReactNode
}

const ProtectedWrapper = ({ children } : ChildrenProps) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] font-inter">
      <div className="hidden border-r bg-muted/40 md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col overflow-hidden">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-x-hidden">
          { children }
        </main>
      </div>
    </div>
  )
}

export default ProtectedWrapper