/* /app/courses-new/[courseId]/page.tsx */

import CourseModules from '../components/CourseModules'

export default async function Page({
  params,
}: {
  params: {
    courseId: string
  }
}) {
  const { courseId } = params

  const normalizedId = courseId
    .replace(/-([a-z])/g, (_, char) => char.toUpperCase())
    .replace(/^./, char => char.toUpperCase())

  return await CourseModules({ courseId: normalizedId, routeId: courseId })
}
