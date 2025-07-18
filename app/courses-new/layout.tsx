// /app/courses-new/layout.tsx

'use client'

import type { ReactNode } from 'react'

export default function CoursesNewLayout({ children }: { children: ReactNode }) {
  return (
    <main className='min-h-screen w-full bg-[#FFFFFF] text-gray-800'>
        {children}
    </main>
  )
}
