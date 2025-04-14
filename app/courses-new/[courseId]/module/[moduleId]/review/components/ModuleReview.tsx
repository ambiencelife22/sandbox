/* ModuleReview.tsx */

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

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

    // Add blanks for any submodules without storage data
    submodules.forEach((sub) => {
      if (!grouped[sub.id]) grouped[sub.id] = []
    })

    setData(grouped)
  }, [courseId, moduleId, submodules])

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6 print:bg-white'>
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
                      {entry.response?.trim() || "I didn’t respond to this."}
                    </p>
                  </div>
                ))
            ) : (
              <p className='text-sm text-gray-500'>No responses saved for this submodule.</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
