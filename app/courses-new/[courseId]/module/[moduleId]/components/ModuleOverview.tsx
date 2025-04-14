/* [courseId]/module/[moduleId]/components/CourseOverview.tsx */
import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CourseModulePage from '@/app/courses-new/components/CourseModulePage'
import { Button } from '@/components/ui/button'

interface ModuleOverviewProps {
  courseId: string
  moduleId: string
}

export default async function ModuleOverview({ courseId, moduleId }: ModuleOverviewProps) {
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
        <div className='mb-6'>
          <Link href={`/courses-new/${courseId}`}>
            <Button variant='outline'>← Back to Course</Button>
          </Link>
        </div>

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
  } catch (error) {
    console.error('ModuleOverview error:', error)
    return notFound()
  }
}