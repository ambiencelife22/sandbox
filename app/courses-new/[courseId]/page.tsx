/* /app/courses-new/[courseId]/page.tsx */

import CourseModules from '../components/CourseModules'

type PageProps = {
  params: {
    courseId: string
    moduleId: string
  }
}

export default async function ModulePage({ params }: PageProps) {
  const { courseId, moduleId } = params

  const normalizedId = courseId
    .replace(/-([a-z])/g, (_, char) => char.toUpperCase())
    .replace(/^./, char => char.toUpperCase())

  return await CourseModules({ courseId: normalizedId, routeId: courseId })
}
