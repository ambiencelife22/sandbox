'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

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

async function saveResponse(
  courseId: string,
  moduleId: string,
  submoduleId: string,
  sectionId: string,
  response: string
) {
  const payload = {
    courseId,
    moduleId,
    submoduleId,
    sectionId,
    response,
    timestamp: new Date().toISOString(),
  }

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

export default function SectionRenderer({
  section,
  courseId,
  moduleId,
  submoduleId,
}: SectionRendererProps) {
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [multiSelect, setMultiSelect] = useState<Record<string, boolean>>({})
  const [ratings, setRatings] = useState<Record<string, number>>({})

  const handleSave = (sectionId: string, response: string) => {
    setResponses((prev) => ({ ...prev, [sectionId]: response }))
    saveResponse(courseId, moduleId, submoduleId, sectionId, response)
  }

  switch (section.type) {
    case 'text':
      return (
        <div className='space-y-2'>
          <h3 className='text-xl font-semibold'>{section.title}</h3>
          <div className='text-gray-700 space-y-2'>
            {section.body.split('\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      )

    case 'reflection':
    case 'visualization':
      return (
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold'>{section.title}</h3>
          {section.prompts.map((q, i) => (
            <div key={i}>
              <Label className='text-sm'>{q}</Label>
              <Textarea
                className='mt-1'
                value={responses[q] || ''}
                onChange={(e) => handleSave(q, e.target.value)}
              />
            </div>
          ))}
        </div>
      )

    case 'multiselect-reflection':
      return (
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold'>{section.title}</h3>
          <div className='space-y-2'>
            {section.options.map((opt, i) => (
              <div key={i} className='flex items-center gap-2'>
                <Checkbox
                  checked={multiSelect[opt] || false}
                  onChange={(e) => {
                    const checked = e.target.checked
                    const updated = { ...multiSelect, [opt]: checked }
                    setMultiSelect(updated)
                    saveResponse(courseId, moduleId, submoduleId, `option-${opt}`, String(checked))
                  }}
                />

                <Label>{opt}</Label>
              </div>
            ))}
          </div>
          <div className='space-y-2 pt-4'>
            {section.prompts.map((q, i) => (
              <div key={i}>
                <Label className='text-sm'>{q}</Label>
                <Textarea
                  className='mt-1'
                  value={responses[q] || ''}
                  onChange={(e) => handleSave(q, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )

    case 'single-reflection':
      return (
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold'>{section.title}</h3>
          <Label>{section.prompt}</Label>
          <Textarea
            className='mt-1'
            value={responses['single'] || ''}
            onChange={(e) => handleSave('single', e.target.value)}
          />
        </div>
      )

    case 'value-select-reflection':
      return (
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold'>{section.title}</h3>
          <p className='text-sm text-gray-600'>Select values that resonate with you.</p>
          {section.categories.map((category, i) => (
            <div key={i} className='space-y-2'>
              <Label className='font-medium'>{category}</Label>
              <Textarea
                placeholder='List values from this category...'
                value={responses[category] || ''}
                onChange={(e) => handleSave(category, e.target.value)}
              />
            </div>
          ))}
          {section.prompts.map((prompt, i) => (
            <div key={i}>
              <Label className='text-sm'>{prompt}</Label>
              <Textarea
                className='mt-1'
                value={responses[prompt] || ''}
                onChange={(e) => handleSave(prompt, e.target.value)}
              />
            </div>
          ))}
        </div>
      )

    case 'mission-builder':
      return (
        <div className='space-y-6'>
          <h3 className='text-xl font-semibold'>{section.title}</h3>
          <p className='text-sm italic text-gray-600'>Starter: {section.starter}</p>
          <div className='space-y-2'>
            <p className='text-sm text-gray-500'>Examples:</p>
            <ul className='list-disc list-inside text-sm text-gray-700'>
              {section.examples.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
          </div>
          {section.prompts.map((prompt, i) => (
            <div key={i}>
              <Label className='text-sm'>{prompt}</Label>
              <Textarea
                className='mt-1'
                value={responses[prompt] || ''}
                onChange={(e) => handleSave(prompt, e.target.value)}
              />
            </div>
          ))}
        </div>
      )

    case 'rating-reflection':
      return (
        <div className='space-y-6'>
          <h3 className='text-xl font-semibold'>{section.title}</h3>
          <p className='text-sm text-gray-600'>Rate each area (1–10)</p>
          <div className='space-y-4'>
            {section.areas.map((area, i) => (
              <div key={i}>
                <Label>{area}</Label>
                <Slider
                  defaultValue={[ratings[area] || 5]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={([value]) => {
                    setRatings({ ...ratings, [area]: value })
                    saveResponse(courseId, moduleId, submoduleId, `rating-${area}`, String(value))
                  }}
                />
              </div>
            ))}
          </div>
          <div className='pt-4'>
            <Label>{section.prompt}</Label>
            <Textarea
              className='mt-1'
              value={responses['rating-prompt'] || ''}
              onChange={(e) => handleSave('rating-prompt', e.target.value)}
            />
          </div>
        </div>
      )

    default:
      return null
  }
}
