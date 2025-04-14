/* /app/courses-new/[courseId]/module/[moduleId]/submodule/[submoduleId]/page.tsx */

import SubmodulePage from './components/SubmodulePage'

export default async function Page({
  params,
}: {
  params: {
    courseId: string
    moduleId: string
    submoduleId: string
  }
}) {
  return await SubmodulePage({
    courseId: params.courseId,
    moduleId: params.moduleId,
    submoduleId: params.submoduleId,
  })
}
