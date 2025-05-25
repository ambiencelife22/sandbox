'use client'

import { useState } from 'react'

export default function FinancialSnapshot() {
  const [step, setStep] = useState(0)

  const totalSteps = 7

  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-semibold mb-2'>Financial Snapshot</h2>

      {step === 0 && (
        <input
          id='fixedExpenses'
          type='text'
          placeholder='Fixed Expenses (rent, loans, etc.)'
          className='p-3 border rounded-md w-full'
        />
      )}

      {step === 1 && (
        <input
          id='variableExpenses'
          type='text'
          placeholder='Variable Expenses (food, shopping, etc.)'
          className='p-3 border rounded-md w-full'
        />
      )}

      {step === 2 && (
        <input
          id='income'
          type='text'
          placeholder='Estimated Monthly Income'
          className='p-3 border rounded-md w-full'
        />
      )}

      {step === 3 && (
        <input
          id='surplus'
          type='text'
          placeholder='Monthly Surplus / Deficit'
          className='p-3 border rounded-md w-full'
        />
      )}

      {step === 4 && (
        <input
          id='goal1'
          type='text'
          placeholder='Top Financial Goal 1 (6–18 months)'
          className='p-3 border rounded-md w-full'
        />
      )}

      {step === 5 && (
        <input
          id='goal2'
          type='text'
          placeholder='Top Financial Goal 2 (6–18 months)'
          className='p-3 border rounded-md w-full'
        />
      )}

      {step === 6 && (
        <input
          id='goal3'
          type='text'
          placeholder='Top Financial Goal 3 (6–18 months)'
          className='p-3 border rounded-md w-full'
        />
      )}

      <div className='flex justify-between pt-4'>
        {step > 0 && (
          <button
            type='button'
            onClick={() => setStep(step - 1)}
            className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
          >
            Back
          </button>
        )}
        {step < totalSteps - 1 && (
          <button
            type='button'
            onClick={() => setStep(step + 1)}
            className='ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Next
          </button>
        )}
      </div>
    </section>
  )
}
