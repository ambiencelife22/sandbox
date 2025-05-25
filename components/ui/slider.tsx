// /components/ui/slider.tsx

'use client'

import * as RadixSlider from '@radix-ui/react-slider'
import React from 'react'

export function Slider({
  defaultValue = [5],
  min = 1,
  max = 10,
  step = 1,
  onValueChange,
}: {
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
}) {
  return (
    <RadixSlider.Root
      className='relative flex w-full touch-none select-none items-center py-4'
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      onValueChange={onValueChange}
    >
      <RadixSlider.Track className='relative h-1 w-full grow rounded-full bg-gray-300'>
        <RadixSlider.Range className='absolute h-full rounded-full bg-blue-500' />
      </RadixSlider.Track>
      <RadixSlider.Thumb className='block h-4 w-4 rounded-full bg-white border border-gray-400 shadow' />
    </RadixSlider.Root>
  )
}
