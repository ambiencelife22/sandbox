import CourseModules from '../components/CourseModules.js'

export default async function Page({ params }) {
  const { courseId } = params

  const normalizedId = courseId
    .replace(/-([a-z])/g, (_, char) => char.toUpperCase())
    .replace(/^./, (char) => char.toUpperCase())

  return await CourseModules({ courseId: normalizedId, routeId: courseId })
}
