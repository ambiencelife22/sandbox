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
    <div className='max-w-4xl mx-auto px-4 py-10'>
      <div className='bg-white border border-gray-200 rounded-2xl shadow-sm p-6'>
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>🗓️ Flexible Weekly Flow</h2>
        <p className='text-gray-600 text-sm mb-6'>
          Design a rhythm that supports your energy, priorities, and season. Your entries are saved locally and editable anytime.
        </p>

        <div className='space-y-5'>
          {Object.entries(flow).map(([day, value]) => (
            <div key={day} className='flex flex-col'>
              <label className='mb-1 font-medium text-sm text-gray-700'>{day}</label>
              <textarea
                value={value}
                onChange={(e) => handleChange(day as Day, e.target.value)}
                rows={2}
                className='w-full border border-gray-300 bg-gray-50 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
              />
            </div>
          ))}
        </div>

        <div className='mt-8 text-right'>
          <button
            onClick={resetToDefault}
            className='inline-block text-sm font-medium text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition'
          >
            Reset to Suggested Flow
          </button>
        </div>
      </div>
    </div>
  )
}
