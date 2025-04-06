/* _SeedsStartButton.jsx */
import React from 'react'

const SeedsStartButton = ({ startActivity }) => {
  return (
    <div className='seeds_start_btn_div'>
      <button
        className='start_seeds_activity_btn'
        onClick={startActivity}
      >
        Start
      </button>
    </div>
  )
}

export default SeedsStartButton
