/* /app/courses-new/[courseId]/page.tsx */

import CourseModules from '../components/CourseModules'

type PageProps = {
  params: {
    courseId: string
  }
}

export default async function Page({ params }: PageProps) {
  const { courseId } = params

  const normalizedId = courseId
    .replace(/-([a-z])/g, (_, char) => char.toUpperCase())
    .replace(/^./, char => char.toUpperCase())

  return await CourseModules({ courseId: normalizedId, routeId: courseId })
}
