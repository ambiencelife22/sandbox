/* [courseId]/CourseOverview.tsx */

import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

interface CourseOverviewProps {
  courseId: string
}

export default async function CourseOverview({ courseId }: CourseOverviewProps) {
  const normalizedId = courseId
    .replace(/-([a-z])/g, (_, char) => char.toUpperCase())
    .replace(/^./, (char) => char.toUpperCase())

  try {
    const filePath = path.join(
      process.cwd(),
      'app/courses-new/data',
      `${normalizedId}.json`
    )

    const fileContents = await fs.readFile(filePath, 'utf-8')
    const courseData = JSON.parse(fileContents)
    const modules = courseData.modules || []
    const activeModule = modules[0]?.id || ''

    return (
      <div className='p-6 max-w-5xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4 capitalize'>
          {courseId.replace(/-/g, ' ')} Course
        </h1>

        <Tabs defaultValue={activeModule}>
          <TabsList className='grid grid-cols-2 md:grid-cols-4 gap-2'>
            {modules.map((module: any) => (
              <TabsTrigger key={module.id} value={module.id}>
                {module.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {modules.map((module: any) => (
            <TabsContent key={module.id} value={module.id}>
              <Card className='mt-4'>
                <CardContent className='space-y-4'>
                  <h2 className='text-xl font-semibold'>{module.title}</h2>
                  <p>{module.description}</p>
                  <Link
                    className='inline-block mt-2 text-blue-600 underline'
                    href={`/courses-new/${courseId}/module/${module.id}`}
                  >
                    Start Module →
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    )
  } catch (error) {
    console.error('CourseOverview load error:', error)
    return <div className='text-red-600'>Error loading course data</div>
  }
}
