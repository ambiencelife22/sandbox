/* /app/courses-new/[courseId]/module/[moduleId]/review/page.tsx */

import ModuleReview from './components/ModuleReview'
import clarityCanvas from '@/app/courses-new/data/ClarityCanvas.json'

export default async function Page(props: any) {
  const { courseId, moduleId } = props.params

  const normalizedCourseId = courseId
    .replace(/-([a-z])/g, (_: any, char: string) => char.toUpperCase())
    .replace(/^./, (char: string) => char.toUpperCase())

  const module = clarityCanvas.modules.find((m) => m.id === moduleId)

  const submodules =
    module?.submodules?.map((s) => ({
      id: s.id,
      title: s.title,
    })) || []

  return ModuleReview({
    courseId: normalizedCourseId,
    moduleId,
    submodules,
  })
}
