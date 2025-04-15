/* WeeklyFlowPlanner.tsx */

'use client'

import { useState, useEffect } from 'react'

type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

type WeeklyFlow = Record<Day, string>

const defaultFlow: WeeklyFlow = {
  Monday: 'Light admin, client check-ins',
  Tuesday: 'Creative deep work, content, biz dev',
  Wednesday: 'Wellness reset, reflection, movement',
  Thursday: 'Execution, communication, project maintenance',
  Friday: 'Catch-up, soft planning, social touchpoints',
  Saturday: 'Optional work or full rest',
  Sunday: 'Weekly reset, prep, grounding practices',
}

export default function WeeklyFlowPlanner() {
  const [flow, setFlow] = useState<WeeklyFlow>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('weeklyFlow')
      if (stored) {
        try {
          return JSON.parse(stored) as WeeklyFlow
        } catch {
          return defaultFlow
        }
      }
    }
    return defaultFlow
  })

  useEffect(() => {
    localStorage.setItem('weeklyFlow', JSON.stringify(flow))
  }, [flow])

  const handleChange = (day: Day, value: string) => {
    setFlow((prev: WeeklyFlow) => ({ ...prev, [day]: value }))
  }

  const resetToDefault = () => {
    setFlow(defaultFlow)
  }

  return (
    <div className='max-w-3xl mx-auto p-4'>
      <h2 className='text-2xl font-semibold mb-4'>🗓️ Flexible Weekly Flow</h2>
      <p className='mb-6 text-sm text-gray-600'>
        Customize each day with a flow that supports your energy and priorities. Your entries are saved locally and editable anytime.
      </p>
      <div className='space-y-4'>
        {Object.entries(flow).map(([day, value]) => (
          <div key={day} className='flex flex-col'>
            <label className='font-medium mb-1 text-sm text-gray-700'>{day}</label>
            <textarea
              value={value as string}
              onChange={(e) => handleChange(day as Day, e.target.value)}
              rows={2}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring'
            />
          </div>
        ))}
      </div>
      <button
        onClick={resetToDefault}
        className='mt-6 bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded'
      >
        Reset to Suggested Flow
      </button>
    </div>
  )
}
