'use client'

import * as React from 'react'

export function Checkbox({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 ${className || ''}`}
      {...props}
    />
  )
}
