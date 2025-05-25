'use client'

import MissionStatement from './components/MissionStatement'
import FinancialSnapshot from './components/FinancialSnapshot'
import VisionWorksheet from './components/VisionWorksheet'
import Roadmap from './components/Roadmap'
import QuarterlyGoals from './components/QuarterlyGoals'
import Endgame from './components/Endgame'
import WeeklyFlow from './components/WeeklyFlow'
import PurposefulPause from './components/PurposefulPause'
import { useCallback, useState } from 'react'

const steps = [
  <MissionStatement key='mission' />,
  <FinancialSnapshot key='finance' />,
  <VisionWorksheet key='vision' />,
  <Roadmap key='roadmap' />,
  <QuarterlyGoals key='quarters' />,
  <Endgame key='endgame' />,
  <WeeklyFlow key='weekly' />,
  <PurposefulPause key='pause' />,
]

export default function LifePlanPage() {
  const [step, setStep] = useState(0)

  const handleSubmit = useCallback(async () => {
    const payload = {
      mission: (document.getElementById('mission') as HTMLTextAreaElement)?.value,
      fixedExpenses: (document.getElementById('fixedExpenses') as HTMLInputElement)?.value,
      variableExpenses: (document.getElementById('variableExpenses') as HTMLInputElement)?.value,
      income: (document.getElementById('income') as HTMLInputElement)?.value,
      surplus: (document.getElementById('surplus') as HTMLInputElement)?.value,
      goals: [
        (document.getElementById('goal1') as HTMLInputElement)?.value,
        (document.getElementById('goal2') as HTMLInputElement)?.value,
        (document.getElementById('goal3') as HTMLInputElement)?.value,
      ],
      vision: (document.getElementById('vision') as HTMLTextAreaElement)?.value,
      roadmap: [
        (document.getElementById('phase1') as HTMLInputElement)?.value,
        (document.getElementById('phase2') as HTMLInputElement)?.value,
        (document.getElementById('phase3') as HTMLInputElement)?.value,
        (document.getElementById('phase4') as HTMLInputElement)?.value,
      ],
      quarterly: {
        q1: (document.getElementById('q1') as HTMLTextAreaElement)?.value,
        q2: (document.getElementById('q2') as HTMLTextAreaElement)?.value,
        q3: (document.getElementById('q3') as HTMLTextAreaElement)?.value,
        q4: (document.getElementById('q4') as HTMLTextAreaElement)?.value,
      },
      endgame: {
        what: (document.getElementById('endgameWhat') as HTMLInputElement)?.value,
        why: (document.getElementById('endgameWhy') as HTMLTextAreaElement)?.value,
        how: (document.getElementById('endgameHow') as HTMLTextAreaElement)?.value,
      },
      weekly: (document.getElementById('weeklyFlow') as HTMLTextAreaElement)?.value,
      reflections: (document.getElementById('reflections') as HTMLTextAreaElement)?.value,
    }

    const res = await fetch('https://dummy.api/life-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await res.json()
    console.log(result)
  }, [])

  return (
    <main className='max-w-4xl mx-auto p-6 space-y-12'>
      <h1 className='text-3xl font-bold mb-8'>Clarity Canvas</h1>
      <h3>Not just a plan — a map to the life you actually want to live</h3>

      {steps[step]}

      <div className='flex justify-between'>
        {step > 0 && (
          <button
            type='button'
            onClick={() => setStep((s) => s - 1)}
            className='px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition'
          >
            Back
          </button>
        )}

        {step < steps.length - 1 ? (
          <button
            type='button'
            onClick={() => setStep((s) => s + 1)}
            className='ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
          >
            Next
          </button>
        ) : (
          <button
            type='button'
            onClick={handleSubmit}
            className='ml-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition'
          >
            Submit Plan
          </button>
        )}
      </div>
    </main>
  )
}