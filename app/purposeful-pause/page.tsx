'use client'
import { useState } from 'react'
import { Textarea } from '../../components/ui/textarea'
import { Button } from '../../components/ui/button'

interface Reflection {
  created: string
  aligned: string
  adjust: string
  energized: string
  release: string
}

interface Question {
  key: keyof Reflection
  label: string
}

export default function MemberReflectionTemplate() {
  const [reflection, setReflection] = useState<Reflection>({
    created: '',
    aligned: '',
    adjust: '',
    energized: '',
    release: ''
  })

  const [step, setStep] = useState<number>(0)

  const questions: Question[] = [
    {
      key: 'created',
      label: 'What did I create or move forward this week?',
    },
    {
      key: 'aligned',
      label: 'Where did I feel aligned?',
    },
    {
      key: 'adjust',
      label: 'What needs adjusting?',
    },
    {
      key: 'energized',
      label: 'What energized me?',
    },
    {
      key: 'release',
      label: 'What can I release or delegate?',
    },
  ]

  const handleSubmit = async () => {
    const payload = {
      reflection,  // Spread the reflection object directly here
      createdAt: new Date().toISOString(),
      memberId: 'user-id-placeholder',
    }

    try {
      const res = await fetch('/api/reflections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        alert('Reflection submitted!')
        setReflection({
          created: '',
          aligned: '',
          adjust: '',
          energized: '',
          release: ''
        })
      } else {
        alert('Error submitting reflection')
      }
    } catch (err) {
      console.error(err)
      alert('Submission failed')
    }
  }

  const currentQuestion = questions[step]

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Purposeful Pause</h1>
      <div className="space-y-4">
        <h2 className="pjs">{currentQuestion.label}</h2>
        <Textarea
          value={reflection[currentQuestion.key]}
          onChange={(e) =>
            setReflection({ ...reflection, [currentQuestion.key]: e.target.value })
          }
          placeholder="Write your response here..."
        />
        <div className="flex justify-between">
          {step > 0 && (
            <Button onClick={() => setStep(step - 1)} variant="outline">
              Back
            </Button>
          )}
          {step < questions.length - 1 ? (
            <Button onClick={() => setStep(step + 1)} className="ml-auto">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="ml-auto">
              Submit Reflection
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}