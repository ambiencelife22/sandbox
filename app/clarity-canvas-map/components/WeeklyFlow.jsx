'use client'

export default function WeeklyFlow() {
  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-semibold mb-2'>Flexible Weekly Flow</h2>
      <textarea
        id='weeklyFlow'
        placeholder='Sketch your ideal week rhythm here. What do you want each day to focus on?'
        className='w-full p-4 border rounded-md h-40'
      />

      <div className='mt-4'>
        <label className='block font-medium mb-2'>Daily Habits Checklist (customize as needed):</label>
        <ul className='list-disc list-inside space-y-1 text-gray-700'>
          <li>■ Moved my body</li>
          <li>■ Ate well + hydrated</li>
          <li>■ Business or career step</li>
          <li>■ Personal connection</li>
          <li>■ Financial check-in</li>
          <li>■ Mindful moment</li>
        </ul>
      </div>
    </section>
  )
}
