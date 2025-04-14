/* CourseModules.tsx */

import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'


import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { Module } from './CourseModulePage'

interface CourseModulesProps {
  courseId: string
}

export default async function CourseModules({ courseId }: CourseModulesProps) {
  try {
    const filePath = path.join(process.cwd(), 'app/courses-new/data', `${courseId}.json`)
    const fileContents = await fs.readFile(filePath, 'utf-8')
    const courseData = JSON.parse(fileContents)
    const modules: Module[] = courseData.modules
    const activeModule = modules[0]?.id || ''

    return (
      <div className='p-6 max-w-5xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4 capitalize'>
          {courseId.replace(/-/g, ' ')} Course
        </h1>

        <Tabs defaultValue={activeModule}>
          <TabsList className='grid grid-cols-2 md:grid-cols-4 gap-2'>
            {modules.map((module) => (
              <TabsTrigger key={module.id} value={module.id}>
                {module.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {modules.map((module) => (
            <TabsContent key={module.id} value={module.id}>
              <Card className='mt-4'>
                <CardContent className='space-y-4'>
                  <h2 className='text-xl font-semibold'>{module.title}</h2>
                  <p>{module.description}</p>
                  <Link href={`/courses-new/${courseId}/module/${module.id}`}>
                    Start Module
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    )
  } catch (error) {
    console.error('CourseModules error:', error)
    throw error
  }
}
