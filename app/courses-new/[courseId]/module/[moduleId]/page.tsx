/* [courseId]/module/[moduleId]/page.tsx */

import ModuleOverview from './components/ModuleOverview'

export default async function Page({
  params,
}: {
  params: { courseId: string; moduleId: string }
}) {
  return await ModuleOverview({
    courseId: params.courseId,
    moduleId: params.moduleId,
  })
}
