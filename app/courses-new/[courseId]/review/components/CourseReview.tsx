/* CourseReview.tsx */

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CourseReviewProps {
  courseId: string
  modules: {
    id: string
    title: string
    submodules: {
      id: string
      title: string
    }[]
  }[]
}

type StoredEntry = {
  sectionId: string
  response: string
  timestamp?: string
}

export default function CourseReview({ courseId, modules }: CourseReviewProps) {
  const [data, setData] = useState<Record<string, StoredEntry[]>>({})

  useEffect(() => {
    const prefix = `reflection-${courseId}`
    const grouped: Record<string, StoredEntry[]> = {}

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(prefix)) {
        try {
          const stored = localStorage.getItem(key)
          if (!stored) return
          const { moduleId, submoduleId, sectionId, response, timestamp } = JSON.parse(stored)

          const fullKey = `${moduleId}-${submoduleId}`
          if (!grouped[fullKey]) grouped[fullKey] = []
          grouped[fullKey].push({ sectionId, response, timestamp })
        } catch (err) {
          console.warn('Failed to parse key:', key, err)
        }
      }
    })

    setData(grouped)
  }, [courseId])

  const handlePrint = () => window.print()

  const handleDownload = () => {
    const lines: string[] = []
    lines.push(`Course Review: ${courseId}`)
    lines.push(`Generated on: ${new Date().toLocaleString()}`)
    lines.push('='.repeat(60))

    modules.forEach((mod) => {
      lines.push(`\nModule ${mod.id}: ${mod.title}`)
      lines.push('-'.repeat(9 + mod.title.length))

      mod.submodules.forEach((sub) => {
        lines.push(`\n→ ${sub.title}`)
        const entries = data[`${mod.id}-${sub.id}`] || []
        if (entries.length === 0) {
          lines.push('   No responses saved.')
        } else {
          entries
            .sort((a, b) => a.sectionId.localeCompare(b.sectionId))
            .forEach((entry) => {
              const response = entry.response?.trim() || 'I didn’t respond to this.'
              lines.push(`\n   ${entry.sectionId}\n   → ${response}`)
            })
        }
      })
    })

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `CourseReview-${courseId}.txt`
    link.click()
  }

  return (
    <div className='max-w-5xl mx-auto p-6 space-y-6'>
      {/* 🔙 Back to Course button (hidden on print) */}
      <Link href={`/courses-new/${courseId}`} className='inline-block mb-4 print:hidden'>
        <Button variant='ghost'>← Back to Course</Button>
      </Link>

      <h1 className='text-3xl font-bold mb-2'>📘 Full Course Review</h1>
      <p className='text-gray-600 mb-6'>
        All responses recorded in your <strong>{courseId}</strong> journey.
      </p>

      {modules.map((mod) => (
        <div key={mod.id} className='space-y-4'>
          <h2 className='text-2xl font-semibold'>{mod.title}</h2>

          {mod.submodules.map((sub) => {
            const entries = data[`${mod.id}-${sub.id}`] || []

            return (
              <Card key={sub.id} className='print:border-black'>
                <CardContent className='p-6 space-y-4'>
                  <h3 className='text-xl font-semibold'>{sub.title}</h3>
                  <Separator />

                  {entries.length > 0 ? (
                    entries
                      .sort((a, b) => a.sectionId.localeCompare(b.sectionId))
                      .map((entry, i) => (
                        <div key={i}>
                          <p className='text-sm text-gray-500 mb-1'>
                            <strong>{entry.sectionId}</strong>
                          </p>
                          <p className='text-gray-800 whitespace-pre-wrap'>
                            {entry.response?.trim() || "I didn’t respond to this."}
                          </p>
                        </div>
                      ))
                  ) : (
                    <p className='text-sm text-gray-500'>No responses saved for this submodule.</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ))}

      {/* 📄 Download + 🖨️ Print (hidden on print) */}
      <div className='pt-8 flex flex-col md:flex-row gap-4 justify-end print:hidden'>
        <Button variant='outline' onClick={handleDownload}>
          📄 Download Full Course
        </Button>
        <Button onClick={handlePrint}>
          🖨️ Print
        </Button>
      </div>
    </div>
  )
}
