/* courses-new/page.tsx */

'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Temporary static list (you can later load from JSON or API)
const courseList = [
  {
    id: 'clarity-canvas',
    title: 'Clarity Canvas',
    subtitle: 'Reset your path. Align your life.',
    description:
      'A self-guided journey to rediscover your purpose, design a fulfilling lifestyle, and gain momentum for what matters most.',
    emoji: '🧭'
  },
  {
    id: 'reset-finances',
    title: 'Reset Finances (Coming Soon)',
    subtitle: 'Take back control of your money',
    description:
      'Build a simplified, empowering relationship with your finances. Create clarity, flow, and freedom through intentional money habits.',
    emoji: '💸'
  }
]

export default function CoursesNewIndex() {
  return (
    <div className='max-w-5xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>🌱 Explore Your Courses</h1>

      <div className='grid md:grid-cols-2 gap-6'>
        {courseList.map((course) => (
          <Card key={course.id} className='hover:shadow-md transition'>
            <CardContent className='p-6 space-y-3'>
              <h2 className='text-xl font-semibold flex items-center gap-2'>
                <span>{course.emoji}</span> {course.title}
              </h2>
              <p className='text-gray-600 text-sm'>{course.subtitle}</p>
              <p className='text-gray-500 text-sm'>{course.description}</p>
              <Button asChild>
                <Link href={`/courses-new/${course.id}`}>Enter Course</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
