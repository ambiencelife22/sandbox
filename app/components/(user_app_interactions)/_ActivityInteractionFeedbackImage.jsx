/* _ActivityInteractionFeedbackImage */
import React from 'react'
import { CheckMark, XMark } from '@/app/components/SVG'

function ActivityInteractionFeedbackImage({ isCorrect }) {
  return (
    <div className="correct_image_active">
      <div className="active done">
        {isCorrect ? <CheckMark /> : <XMark />}
      </div>
    </div>
  )
}

export default ActivityInteractionFeedbackImage