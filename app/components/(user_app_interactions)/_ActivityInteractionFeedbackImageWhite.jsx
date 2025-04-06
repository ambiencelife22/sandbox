/* _ActivityInteractionFeedbackImageWhite */
import React from 'react'
import { CheckMarkWhite, XMark } from '@/app/components/SVG'

function ActivityInteractionFeedbackImageWhite({ type }) {
  return (
    <div className={type === 'correct' ? 'correct_image_active' : 'incorrect_image_active'}>
      <div className='active done'>
        {type === 'correct' ? <CheckMarkWhite /> : <XMark />}
      </div>
    </div>
  )
}

export default ActivityInteractionFeedbackImageWhite
