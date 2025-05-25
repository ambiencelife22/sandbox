/* /app/courses-new/[courseId]/review/page.tsx */
'use client'

import { use } from 'react'
import CourseReview from './components/CourseReview'
import clarityCanvas from '@/app/courses-new/data/ClarityCanvas.json'

export default function Page(promiseProps: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(promiseProps.params)

  const normalizedCourseId = courseId
    .replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    .replace(/^./, (c) => c.toUpperCase())

  const modules = clarityCanvas.modules.map((m) => ({
    id: m.id,
    title: m.title,
    submodules: m.submodules.map((s: any) => ({ id: s.id, title: s.title })),
  }))

  return <CourseReview courseId={normalizedCourseId} modules={modules} />
}
