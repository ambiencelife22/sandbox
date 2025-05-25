'use client'

export default function Endgame() {
  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-semibold mb-2'>Endgame Framework</h2>
      <input
        id='endgameWhat'
        type='text'
        placeholder='ENDGAME (What)' 
        className='p-3 border rounded-md w-full'
      />
      <textarea
        id='endgameWhy'
        placeholder='WHY (Why it matters most)'
        className='p-3 border rounded-md w-full h-24'
      />
      <textarea
        id='endgameHow'
        placeholder='HOW (Steps to execute)'
        className='p-3 border rounded-md w-full h-32'
      />
    </section>
  )
}
