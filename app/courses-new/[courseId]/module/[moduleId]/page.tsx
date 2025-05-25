/* [courseId]/module/[moduleId]/page.tsx */

import ModuleOverview from './components/ModuleOverview'

export default async function Page(props: any) {
  const { courseId, moduleId } = props.params

  return await ModuleOverview({
    courseId,
    moduleId,
  })
}
