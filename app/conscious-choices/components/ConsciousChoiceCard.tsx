/* ConsciousChoiceCard.tsx */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import './conscious-choices.css'

interface ConsciousChoiceCardProps {
  title: string
  tagline: string
  description: string
  features: string[]
  url: string
  image?: string
}

export default function ConsciousChoiceCard({
  title,
  tagline,
  description,
  features,
  url,
  image,
}: ConsciousChoiceCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="w-full h-80 perspective"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 bg-white border border-[#1A1D1A] rounded-xl flex flex-col items-center justify-center text-center backface-hidden p-6">
          {image && (
            <img
              src={image}
              alt={title}
              className="w-20 h-20 object-contain mb-4"
            />
          )}
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-gray-500 text-sm">{tagline}</p>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 bg-white border border-[#1A1D1A] rounded-xl flex flex-col items-center justify-center text-center backface-hidden p-6 rotateY-180">
          <h4 className="text-lg font-bold mb-2">{title}</h4>
          <p className="text-gray-500 text-sm mb-4">{description}</p>
          <ul className="text-gray-600 text-sm list-disc list-inside mb-4">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto text-sm font-semibold text-green-700 underline"
          >
            Visit Website
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
