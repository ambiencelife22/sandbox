'use client'

export default function VisionWorksheet() {
  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-semibold mb-2'>18-Month Vision</h2>
      <textarea
        id='vision'
        placeholder={`Where do you want to live and spend your time?\n\nWhat does your ideal work look and feel like?\n\nWhat kind of lifestyle do you want to support?\n\nWhat health and energy outcomes matter most to you?\n\nWhat do you want to experience in love, friendship, family, and travel?`}
        className='w-full p-4 border rounded-md h-80 whitespace-pre-wrap'
      />
    </section>
  )
}
