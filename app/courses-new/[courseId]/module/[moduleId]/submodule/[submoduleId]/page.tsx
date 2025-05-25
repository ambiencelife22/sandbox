/* /app/courses-new/[courseId]/module/[moduleId]/submodule/[submoduleId]/page.tsx */

import SubmodulePage from './components/SubmodulePage'

export default async function Page(props: any) {
  const { courseId, moduleId, submoduleId } = props.params

  return await SubmodulePage({
    courseId,
    moduleId,
    submoduleId,
  })
}
