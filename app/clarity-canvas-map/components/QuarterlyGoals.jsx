'use client'

export default function QuarterlyGoals() {
  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-semibold mb-2'>Quarterly Goals</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <textarea
          id='q1'
          placeholder='Q1 Goals (Jan–Mar)'
          className='p-3 border rounded-md w-full h-24'
        />
        <textarea
          id='q2'
          placeholder='Q2 Goals (Apr–Jun)'
          className='p-3 border rounded-md w-full h-24'
        />
        <textarea
          id='q3'
          placeholder='Q3 Goals (Jul–Sep)'
          className='p-3 border rounded-md w-full h-24'
        />
        <textarea
          id='q4'
          placeholder='Q4 Goals (Oct–Dec)'
          className='p-3 border rounded-md w-full h-24'
        />
      </div>
    </section>
  )
}
