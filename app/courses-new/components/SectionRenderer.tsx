/* SectionRenderer.tsx */

'use client'

import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

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

export default function SectionRenderer({ section }: { section: Submodule }) {
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [multiSelect, setMultiSelect] = useState<Record<string, boolean>>({})

  switch (section.type) {
    case 'text':
  return (
    <div className='space-y-2'>
      <h3 className='text-xl font-semibold'>{section.title}</h3>
      <div className='text-gray-700 space-y-2'>
        {section.body.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
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
                onChange={(e) => setResponses({ ...responses, [q]: e.target.value })}
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
                  onChange={(e) =>
                    setMultiSelect({ ...multiSelect, [opt]: e.target.checked })
                  }
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
                  onChange={(e) => setResponses({ ...responses, [q]: e.target.value })}
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
            onChange={(e) => setResponses({ single: e.target.value })}
          />
        </div>
      )

    default:
      return null
  }
}