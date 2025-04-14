/* /app/courses-new/[courseId]/module/[moduleId]/submodule/[submoduleId].tsx */

import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import { motion } from 'framer-motion'
import path from 'path'
import Link from 'next/link'

import CourseModulePage from '@/app/courses-new/components/CourseModulePage'
import SectionRenderer from '@/app/courses-new/components/SectionRenderer'
import { Button } from '@/components/ui/button'

export default async function Page({
  params,
}: {
  params: {
    courseId: string
    moduleId: string
    submoduleId: string
  }
}) {
  const { courseId, moduleId, submoduleId } = params

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

    const submodules = module.submodules
    const currentIndex = submodules.findIndex((s: any) => s.id === submoduleId)
    const current = submodules[currentIndex]
    if (!current) return notFound()

    const nextSubmodule = submodules[currentIndex + 1] || null
    const prevSubmodule = submodules[currentIndex - 1] || null
    const stepText = `Step ${currentIndex + 1} of ${submodules.length}`

    return (
      <CourseModulePage title={current.title} subtitle={stepText}>
        <SectionRenderer section={current} />

        <div className='pt-4'>
          <Link href={`/courses-new/${courseId}/module/${moduleId}`}>
            <Button variant='ghost'>← Back to Module Overview</Button>
          </Link>
        </div>

        <div className='pt-6 flex justify-between'>
          {prevSubmodule ? (
            <Link
              href={`/courses-new/${courseId}/module/${moduleId}/submodule/${prevSubmodule.id}`}
            >
              <Button variant='outline'>← {prevSubmodule.title}</Button>
            </Link>
          ) : (
            <div />
          )}

          {nextSubmodule && (
            <Link
              href={`/courses-new/${courseId}/module/${moduleId}/submodule/${nextSubmodule.id}`}
            >
              <Button>Next: {nextSubmodule.title} →</Button>
            </Link>
          )}
        </div>
      </CourseModulePage>
    )
  } catch (error) {
    console.error('Submodule page error:', error)
    return notFound()
  }
}