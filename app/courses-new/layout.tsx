// /app/courses-new/layout.tsx

'use client'

import type { ReactNode } from 'react'

export default function CoursesNewLayout({ children }: { children: ReactNode }) {
  return (
    <main className='min-h-screen w-full bg-[#FFFFFF] text-gray-800'>
      <div className='max-w-4xl mx-auto px-4 py-10 sm:py-14 lg:py-20'>
        {children}
      </div>
    </main>
  )
}
