/* /app/courses-new/[courseId]/module/[moduleId]/review/page.tsx */

import ModuleReview from './components/ModuleReview'
import clarityCanvas from '@/app/courses-new/data/ClarityCanvas.json'

export default function Page({ params }: { params: { courseId: string; moduleId: string } }) {
  const module = clarityCanvas.modules.find((m) => m.id === params.moduleId)
  const submodules = module?.submodules.map((s) => ({ id: s.id, title: s.title })) || []

  return <ModuleReview courseId={params.courseId} moduleId={params.moduleId} submodules={submodules} />
}
