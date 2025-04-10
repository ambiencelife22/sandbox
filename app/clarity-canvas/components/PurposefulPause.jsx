'use client'

export default function PurposefulPause() {
  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-semibold mb-2'>Purposeful Pause – Weekly Reflection</h2>
      <textarea
        id='reflections'
        placeholder={`What did I take action on this week that matters?\n\nWhen did I feel like I was truly myself?\n\nWhat felt off or out of sync?\n\nWhat gave me that 'I want more of this' feeling?\n\nWhat can I ask for help with or simplify?`}
        className='w-full p-4 border rounded-md h-60 whitespace-pre-wrap'
      />
    </section>
  )
}
