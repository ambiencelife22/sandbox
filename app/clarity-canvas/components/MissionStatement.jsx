'use client'

export default function MissionStatement() {
  return (
    <section>
      <h2 className='text-xl font-semibold mb-2'>Mission Statement</h2>
      <textarea
        id='mission'
        placeholder='Why you do what you do, who you want to become, and the impact you want to have...'
        className='w-full p-4 border rounded-md h-40'
      />
    </section>
  )
}