/* [moduleId].tsx */

import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import CourseModulePage from '../../../components/CourseModulePage'

export async function generateStaticParams() {
  // Placeholder: You can dynamically generate static paths here later
  return []
}

export default async function ModulePage({ params }: { params: { courseId: string; moduleId: string } }) {
  const { courseId, moduleId } = params

  try {
    const filePath = path.join(process.cwd(), 'app/courses-new/data', `${courseId}.json`)
    const fileContents = await fs.readFile(filePath, 'utf-8')
    const courseData = JSON.parse(fileContents)

    const module = courseData.modules.find((m: any) => m.id === moduleId)
    if (!module) return notFound()

    return (
      <CourseModulePage title={module.title} subtitle={module.description}>
        {/* TODO: Load dynamic inputs, journal prompts, and saved data */}
        <p className="text-sm text-gray-400">Module content coming soon...</p>
      </CourseModulePage>
    )
  } catch (error) {
    return notFound()
  }
}