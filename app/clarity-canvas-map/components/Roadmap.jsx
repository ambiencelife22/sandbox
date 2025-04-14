'use client'

export default function Roadmap() {
  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-semibold mb-2'>18-Month Roadmap</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <input
          id='phase1'
          type='text'
          placeholder='Phase 1'
          className='p-3 border rounded-md w-full'
        />
        <input
          id='phase2'
          type='text'
          placeholder='Phase 2'
          className='p-3 border rounded-md w-full'
        />
        <input
          id='phase3'
          type='text'
          placeholder='Phase 3'
          className='p-3 border rounded-md w-full'
        />
        <input
          id='phase4'
          type='text'
          placeholder='Phase 4'
          className='p-3 border rounded-md w-full'
        />
      </div>
    </section>
  )
}
