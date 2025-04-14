/* [submoduleId].tsx */

import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import CourseModulePage from '../../../../../components/CourseModulePage'
import SectionRenderer, { Submodule } from '../../../../../components/SectionRenderer'

export default async function SubmodulePage({
  params
}: {
  params: { courseId: string; moduleId: string; submoduleId: string }
}) {
  const { courseId, moduleId, submoduleId } = params

  const normalizedCourseId = courseId.replace(/-([a-z])/g, (_, char) => char.toUpperCase()).replace(/^./, char => char.toUpperCase())

  try {
    const filePath = path.join(process.cwd(), 'app/courses-new/data', `${normalizedCourseId}.json`)
    const fileContents = await fs.readFile(filePath, 'utf-8')
    const courseData = JSON.parse(fileContents)

    const module = courseData.modules.find((m: any) => m.id === moduleId)
    if (!module) return notFound()

    const submodule = module.submodules.find((s: any) => s.id === submoduleId)
    if (!submodule) return notFound()

    return (
      <CourseModulePage title={submodule.title}>
        <SectionRenderer section={submodule as Submodule} />
      </CourseModulePage>
    )
  } catch (err) {
    console.error(err)
    return notFound()
  }
}
