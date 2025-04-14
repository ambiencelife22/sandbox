/* SectionRenderer.tsx */

'use client'

import { useState, useEffect, useMemo } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'

const API_URL_LINK = 'https://api.example.com/save-response'

export type Submodule =
  | {
      id: string
      title: string
      type: 'text'
      body: string
    }
  | {
      id: string
      title: string
      type: 'reflection' | 'visualization'
      prompts: string[]
    }
  | {
      id: string
      title: string
      type: 'multiselect-reflection'
      options: string[]
      prompts: string[]
    }
  | {
      id: string
      title: string
      type: 'single-reflection'
      prompt: string
    }
  | {
      id: string
      title: string
      type: 'value-select-reflection'
      categories: string[]
      prompts: string[]
    }
  | {
      id: string
      title: string
      type: 'mission-builder'
      starter: string
      examples: string[]
      prompts: string[]
    }
  | {
      id: string
      title: string
      type: 'rating-reflection'
      areas: string[]
      prompt: string
    }

interface SectionRendererProps {
  section: Submodule
  courseId: string
  moduleId: string
  submoduleId: string
}

async function saveResponse(courseId: string, moduleId: string, submoduleId: string, sectionId: string, response: string) {
  const payload = { courseId, moduleId, submoduleId, sectionId, response, timestamp: new Date().toISOString() }
  const key = `reflection-${courseId}-${moduleId}-${submoduleId}-${sectionId}`
  localStorage.setItem(key, JSON.stringify(payload))

  try {
    await fetch(API_URL_LINK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.warn('External API failed, saved locally only.', err)
  }
}

export default function SectionRenderer({ section, courseId, moduleId, submoduleId }: SectionRendererProps) {
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [multiSelect, setMultiSelect] = useState<Record<string, boolean>>({})
  const [ratings, setRatings] = useState<Record<string, number>>({})

  const handleSave = (sectionId: string, response: string) => {
    setResponses((prev) => ({ ...prev, [sectionId]: response }))
    saveResponse(courseId, moduleId, submoduleId, sectionId, response)
  }

  useEffect(() => {
    const prefix = `reflection-${courseId}-${moduleId}-${submoduleId}`
    const newResponses: Record<string, string> = {}
    const newMulti: Record<string, boolean> = {}
    const newRatings: Record<string, number> = {}

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(prefix)) {
        const stored = localStorage.getItem(key)
        if (!stored) return
        try {
          const { sectionId, response } = JSON.parse(stored)
          if (section.type === 'multiselect-reflection' && section.options.includes(sectionId.replace('option-', ''))) {
            newMulti[sectionId.replace('option-', '')] = response === 'true'
          } else if (section.type === 'rating-reflection' && sectionId.startsWith('rating-')) {
            newRatings[sectionId.replace('rating-', '')] = parseInt(response)
          } else {
            newResponses[sectionId] = response
          }
        } catch (err) {
          console.warn('Error loading localStorage', err)
        }
      }
    })

    setResponses(newResponses)
    setMultiSelect(newMulti)
    setRatings(newRatings)
  }, [section, courseId, moduleId, submoduleId])

  // 🔄 Progress Tracking
  const { completed, total } = useMemo(() => {
    let completed = 0
    let total = 0
    const check = (val?: string) => !!val?.trim()

    switch (section.type) {
      case 'reflection':
      case 'visualization':
        total = section.prompts.length
        completed = section.prompts.filter((p) => check(responses[p])).length
        break
      case 'multiselect-reflection':
        total = section.prompts.length + section.options.length
        completed = section.prompts.filter((p) => check(responses[p])).length
        completed += section.options.filter((o) => multiSelect[o]).length
        break
      case 'single-reflection':
        total = 1
        completed = check(responses['single']) ? 1 : 0
        break
      case 'value-select-reflection':
        total = section.categories.length + section.prompts.length
        completed = section.categories.filter((c) => check(responses[c])).length
        completed += section.prompts.filter((p) => check(responses[p])).length
        break
      case 'mission-builder':
        total = section.prompts.length
        completed = section.prompts.filter((p) => check(responses[p])).length
        break
      case 'rating-reflection':
        total = section.areas.length + 1
        completed = section.areas.filter((a) => ratings[a] > 0).length
        if (check(responses['rating-prompt'])) completed++
        break
    }

    return { completed, total }
  }, [section, responses, multiSelect, ratings])

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  // 🔘 UI helpers
  const Check = ({ show }: { show: boolean }) => show ? <span className='ml-2 text-green-600'>✔️</span> : null

  const ProgressBar = () => (
    <div className='mb-4'>
      <div className='h-2 rounded-full bg-gray-200 w-full overflow-hidden'>
        <div
          className='h-full bg-gradient-to-r from-gray-300 via-emerald-400 to-green-500 rounded-full transition-all'
          style={{ width: `${percent}%` }}
        />
      </div>
      {percent < 100 && (
        <div className='mt-2 text-right'>
          <Button size='sm' variant='ghost' onClick={markAsComplete}>
            ✔️ Mark as Complete
          </Button>
        </div>
      )}
    </div>
  )

  // 🪄 Mark as complete logic
  const markAsComplete = () => {
    const updates: Record<string, string> = {}
    const multi: Record<string, boolean> = {}
    const rate: Record<string, number> = {}

    if (section.type === 'reflection' || section.type === 'visualization') {
      section.prompts.forEach((p) => {
        if (!responses[p]) updates[p] = '✔️'
      })
    } else if (section.type === 'multiselect-reflection') {
      section.options.forEach((o) => {
        if (!multiSelect[o]) multi[o] = true
      })
      section.prompts.forEach((p) => {
        if (!responses[p]) updates[p] = '✔️'
      })
    } else if (section.type === 'single-reflection') {
      if (!responses['single']) updates['single'] = '✔️'
    } else if (section.type === 'value-select-reflection') {
      section.categories.forEach((c) => {
        if (!responses[c]) updates[c] = '✔️'
      })
      section.prompts.forEach((p) => {
        if (!responses[p]) updates[p] = '✔️'
      })
    } else if (section.type === 'mission-builder') {
      section.prompts.forEach((p) => {
        if (!responses[p]) updates[p] = '✔️'
      })
    } else if (section.type === 'rating-reflection') {
      section.areas.forEach((a) => {
        if (!ratings[a]) rate[a] = 10
      })
      if (!responses['rating-prompt']) updates['rating-prompt'] = '✔️'
    }

    setResponses((prev) => ({ ...prev, ...updates }))
    setMultiSelect((prev) => ({ ...prev, ...multi }))
    setRatings((prev) => ({ ...prev, ...rate }))

    Object.entries(updates).forEach(([k, v]) => saveResponse(courseId, moduleId, submoduleId, k, v))
    Object.entries(multi).forEach(([k]) => saveResponse(courseId, moduleId, submoduleId, `option-${k}`, 'true'))
    Object.entries(rate).forEach(([k, v]) => saveResponse(courseId, moduleId, submoduleId, `rating-${k}`, String(v)))
  }

  // 🎨 Unified layout
  return (
    <div className='space-y-6'>
      <ProgressBar />

      <h3 className='text-xl font-semibold'>{section.title}</h3>

      {section.type === 'text' && (
        <div className='text-gray-700 space-y-2'>
          {section.body.split('\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}

      {['reflection', 'visualization'].includes(section.type) && 'prompts' in section && (
        <div className='space-y-4'>
          {section.prompts.map((p, i) => (
            <div key={i}>
              <Label className='text-sm flex items-center'>{p}<Check show={!!responses[p]} /></Label>
              <Textarea value={responses[p] || ''} onChange={(e) => handleSave(p, e.target.value)} className='mt-1' />
            </div>
          ))}
        </div>
      )}

      {section.type === 'multiselect-reflection' && (
        <div className='space-y-4'>
          <div className='space-y-2'>
            {section.options.map((o) => (
              <div key={o} className='flex items-center gap-2'>
                <Checkbox
                  checked={multiSelect[o] || false}
                  onChange={(e) => {
                    const checked = e.target.checked
                    setMultiSelect((prev) => ({ ...prev, [o]: checked }))
                    saveResponse(courseId, moduleId, submoduleId, `option-${o}`, String(checked))
                  }}
                />
                <Label className='flex items-center'>{o}<Check show={multiSelect[o]} /></Label>
              </div>
            ))}
          </div>
          {section.prompts.map((p, i) => (
            <div key={i}>
              <Label className='text-sm flex items-center'>{p}<Check show={!!responses[p]} /></Label>
              <Textarea value={responses[p] || ''} onChange={(e) => handleSave(p, e.target.value)} className='mt-1' />
            </div>
          ))}
        </div>
      )}

      {section.type === 'single-reflection' && (
        <div>
          <Label className='flex items-center'>{section.prompt}<Check show={!!responses['single']} /></Label>
          <Textarea value={responses['single'] || ''} onChange={(e) => handleSave('single', e.target.value)} className='mt-1' />
        </div>
      )}

      {section.type === 'value-select-reflection' && (
        <div className='space-y-4'>
          {section.categories.map((c) => (
            <div key={c}>
              <Label className='flex items-center'>{c}<Check show={!!responses[c]} /></Label>
              <Textarea value={responses[c] || ''} onChange={(e) => handleSave(c, e.target.value)} className='mt-1' />
            </div>
          ))}
          {section.prompts.map((p) => (
            <div key={p}>
              <Label className='flex items-center'>{p}<Check show={!!responses[p]} /></Label>
              <Textarea value={responses[p] || ''} onChange={(e) => handleSave(p, e.target.value)} className='mt-1' />
            </div>
          ))}
        </div>
      )}

      {section.type === 'mission-builder' && (
        <div className='space-y-4'>
          <p className='text-sm italic'>Starter: {section.starter}</p>
          <ul className='list-disc text-sm pl-5 text-gray-600'>
            {section.examples.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
          {section.prompts.map((p) => (
            <div key={p}>
              <Label className='flex items-center'>{p}<Check show={!!responses[p]} /></Label>
              <Textarea value={responses[p] || ''} onChange={(e) => handleSave(p, e.target.value)} className='mt-1' />
            </div>
          ))}
        </div>
      )}

      {section.type === 'rating-reflection' && (
        <div className='space-y-4'>
          {section.areas.map((a) => (
            <div key={a}>
              <Label className='flex items-center'>{a}<Check show={ratings[a] > 0} /></Label>
              <Slider
                defaultValue={[ratings[a] || 5]}
                min={1}
                max={10}
                step={1}
                onValueChange={([val]) => {
                  setRatings((prev) => ({ ...prev, [a]: val }))
                  saveResponse(courseId, moduleId, submoduleId, `rating-${a}`, String(val))
                }}
              />
            </div>
          ))}
          <div>
            <Label className='flex items-center'>{section.prompt}<Check show={!!responses['rating-prompt']} /></Label>
            <Textarea
              value={responses['rating-prompt'] || ''}
              onChange={(e) => handleSave('rating-prompt', e.target.value)}
              className='mt-1'
            />
          </div>
        </div>
      )}
    </div>
  )
}
