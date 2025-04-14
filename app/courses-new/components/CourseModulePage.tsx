/* CourseModulePage.tsx */

'use client'

import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface CourseModulePageProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export type Module = {
  id: string
  title: string
  description: string
}

interface CourseModulesProps {
  courseId: string   // TitleCase - used for file loading
  routeId: string    // kebab-case - used for URL construction
}

export default function CourseModulePage({ title, subtitle, children }: CourseModulePageProps) {
  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-1'>{title}</h1>
      {subtitle && <p className='text-gray-600 mb-4'>{subtitle}</p>}

      <Card>
        <CardContent className='space-y-6 p-6'>
          {children}
        </CardContent>
      </Card>
    </div>
  )
}