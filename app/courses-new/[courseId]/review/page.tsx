/* /app/courses-new/[courseId]/review/page.tsx */

'use client'

import CourseReview from './components/CourseReview'
import clarityCanvas from '@/app/courses-new/data/ClarityCanvas.json'

export default function Page(props: any) {
  const { courseId } = props.params

  const normalizedCourseId = courseId
    .replace(/-([a-z])/g, (_: any, c: string) => c.toUpperCase())
    .replace(/^./, (c: string) => c.toUpperCase())

  const modules = clarityCanvas.modules.map((m) => ({
    id: m.id,
    title: m.title,
    submodules: m.submodules.map((s: any) => ({ id: s.id, title: s.title })),
  }))

  return (
    <CourseReview
      courseId={normalizedCourseId}
      modules={modules}
    />
  )
}
