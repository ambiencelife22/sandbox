/* /app/courses-new/[courseId]/module/[moduleId]/page.tsx */

import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CourseModulePage from '../../../components/CourseModulePage'

export default async function Page({
  params,
}: {
  params: {
    courseId: string
    moduleId: string
  }
}) {
  const { courseId, moduleId } = params

  const normalizedCourseId = courseId
    .replace(/-([a-z])/g, (_, char) => char.toUpperCase())
    .replace(/^./, (char) => char.toUpperCase())

  try {
    const filePath = path.join(
      process.cwd(),
      'app/courses-new/data',
      `${normalizedCourseId}.json`
    )
    const fileContents = await fs.readFile(filePath, 'utf-8')
    const courseData = JSON.parse(fileContents)

    const module = courseData.modules.find((m: any) => m.id === moduleId)
    if (!module) return notFound()

    return (
      <CourseModulePage title={module.title} subtitle={module.description}>
        <ul className='space-y-3'>
          {module.submodules?.map((sub: any) => (
            <li key={sub.id}>
              <Link
                className='text-blue-600 underline hover:text-blue-800'
                href={`/courses-new/${courseId}/module/${moduleId}/submodule/${sub.id}`}
              >
                {sub.title}
              </Link>
            </li>
          ))}
        </ul>
      </CourseModulePage>
    )
  } catch (err) {
    console.error(err)
    return notFound()
  }
}