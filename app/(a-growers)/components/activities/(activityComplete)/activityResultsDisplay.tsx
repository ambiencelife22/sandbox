/* activityResultsDisplay.tsx */
import React from 'react'

// @@ Import structure functions @@
import Link from 'next/link'


interface ResultDisplayProps {
  totalCorrect: number
  accuracy: number
  bonusBeansFinalCount: number
  totalGain: number
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ totalCorrect, accuracy, bonusBeansFinalCount, totalGain }) => {

  return (
    <div className='final_card_container'>
      <p>Total Correct: {totalCorrect}</p>
      <p>Accuracy: {accuracy}%</p>
      <p>Bonus: {bonusBeansFinalCount}</p>
      <p>Total: {totalGain}</p>
      <Link href={'/activities'} aria-describedby={'back to activities'} className='signupBtn2 font-[Plus Jakarta Sans] mt-8 block rounded-xl bg-[#54005C] pt-3 text-center text-lg'>Back To Activities</Link>
    </div>
  )
}

