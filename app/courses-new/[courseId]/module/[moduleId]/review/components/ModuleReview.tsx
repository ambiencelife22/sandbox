/* ModuleReview.tsx */

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ModuleReviewProps {
  courseId: string
  moduleId: string
  submodules: {
    id: string
    title: string
  }[]
}

type StoredEntry = {
  sectionId: string
  response: string
  timestamp?: string
}

export default function ModuleReview({ courseId, moduleId, submodules }: ModuleReviewProps) {
  const [data, setData] = useState<Record<string, StoredEntry[]>>({})

  useEffect(() => {
    const prefix = `reflection-${courseId}-${moduleId}`
    const grouped: Record<string, StoredEntry[]> = {}

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(prefix)) {
        try {
          const stored = localStorage.getItem(key)
          if (!stored) return
          const { submoduleId, sectionId, response, timestamp } = JSON.parse(stored)

          if (!grouped[submoduleId]) grouped[submoduleId] = []
          grouped[submoduleId].push({ sectionId, response, timestamp })
        } catch (err) {
          console.warn('Failed to parse localStorage key:', key, err)
        }
      }
    })

    submodules.forEach((sub) => {
      if (!grouped[sub.id]) grouped[sub.id] = []
    })

    setData(grouped)
  }, [courseId, moduleId, submodules])

  const handlePrint = () => window.print()

  const handleDownload = () => {
    const lines: string[] = []

    lines.push(`Module Review: ${courseId} / Module ${moduleId}`)
    lines.push(`Generated on: ${new Date().toLocaleString()}`)
    lines.push('='.repeat(50))

    submodules.forEach((sub) => {
      lines.push(`\n${sub.title}`)
      lines.push('-'.repeat(sub.title.length))

      const entries = data[sub.id] || []
      if (entries.length === 0) {
        lines.push('No responses saved.')
      }

      entries
        .sort((a, b) => a.sectionId.localeCompare(b.sectionId))
        .forEach((entry) => {
          const label = entry.sectionId
          const response = entry.response?.trim() || 'I didn’t respond to this.'
          lines.push(`\n${label}\n→ ${response}`)
        })
    })

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `ModuleReview-${courseId}-${moduleId}.txt`
    link.click()
  }

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6 print:bg-white'>
      {/* 🔙 Back to Module Overview */}
      <Link
        href={`/courses-new/${courseId}/module/${moduleId}`}
        className='inline-block mb-4 print:hidden'
      >
        <Button variant='ghost'>← Back to Module Overview</Button>
      </Link>

      <h1 className='text-3xl font-bold mb-2'>🧾 Module Review</h1>
      <p className='text-gray-600 mb-6'>
        Course: <strong>{courseId}</strong> | Module: <strong>{moduleId}</strong>
      </p>

      {submodules.map((sub) => (
        <Card key={sub.id} className='print:border-black'>
          <CardContent className='p-6 space-y-4'>
            <h2 className='text-xl font-semibold'>{sub.title}</h2>
            <Separator />

            {data[sub.id]?.length > 0 ? (
              data[sub.id]
                .sort((a, b) => a.sectionId.localeCompare(b.sectionId))
                .map((entry, i) => (
                  <div key={i}>
                    <p className='text-sm text-gray-500 mb-1'>
                      <strong>{entry.sectionId}</strong>
                    </p>
                    <p className='text-gray-800 whitespace-pre-wrap'>
                      {entry.response?.trim() || 'I didn’t respond to this.'}
                    </p>
                  </div>
                ))
            ) : (
              <p className='text-sm text-gray-500'>No responses saved for this submodule.</p>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Button Bar */}
      <div className='pt-8 flex flex-col md:flex-row gap-4 justify-end print:hidden'>
        <Button variant='outline' onClick={handleDownload}>
          📄 Download as .txt
        </Button>
        <Button onClick={handlePrint}>🖨️ Print</Button>
      </div>
    </div>
  )
}
