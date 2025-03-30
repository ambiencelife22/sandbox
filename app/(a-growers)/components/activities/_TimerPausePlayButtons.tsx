/* TimerPausePlayButtons.tsx */
import React from 'react'

// @@ Import Timer Buttons @@
import { playButton, pauseButton } from './_TimerButtons'

interface ActivityButtonProps {
    isPaused: boolean
    onClick: () => void
    activityButtonColor: string
  }

// The main activity screen button
const ActivityPausePlayButtons: React.FC<ActivityButtonProps> = ({ isPaused, onClick, activityButtonColor }) => {
  return (
    <button className='pause_play sm' onClick={onClick}>

        {isPaused 
            ? <svg viewBox='-10 0 250 220' aria-label='play button' role='img'>
                <g>
                    <path fill={activityButtonColor} d='M110,0C49.346,0,0,49.347,0,109.999C0,170.653,49.346,220,110,220s110-49.347,110-110.001C220,49.347,170.654,0,110,0z M110,208.422c-54.27,0-98.42-44.149-98.42-98.423c0-54.271,44.15-98.421,98.42-98.421s98.422,44.149,98.422,98.421C208.422,164.272,164.27,208.422,110,208.422z'/>
                    <path fill={activityButtonColor} d='M166.375,104.983L86.154,58.669c-1.791-1.031-3.998-1.031-5.789,0c-1.791,1.035-2.895,2.949-2.895,5.016v92.631c0,2.066,1.104,3.98,2.895,5.016c0.896,0.516,1.895,0.773,2.895,0.773s2-0.258,2.895-0.773l80.221-46.314c1.791-1.037,2.895-2.949,2.895-5.018C169.27,107.933,168.166,106.021,166.375,104.983z M89.049,146.288V73.712l62.854,36.287L89.049,146.288z'/>
                </g>
              </svg>
            : <svg viewBox='-10 0 250 220' aria-label='pause button' role='img'>
                <g>
                    <path fill={activityButtonColor} d='M110,0C49.346,0,0,49.347,0,109.999C0,170.653,49.346,220,110,220s110-49.347,110-110.001
                        C220,49.347,170.654,0,110,0z M110,208.422c-54.27,0-98.422-44.149-98.422-98.423c0-54.271,44.152-98.422,98.422-98.422
                        s98.421,44.15,98.421,98.422C208.421,164.272,164.27,208.422,110,208.422z'/>
                    <path fill={activityButtonColor} d='M133.158,69.474c-3.197,0-5.789,2.592-5.789,5.789v69.474c0,3.197,2.592,5.789,5.789,5.789
                        s5.789-2.592,5.789-5.789V75.263C138.947,72.065,136.355,69.474,133.158,69.474z'/>
                    <path fill={activityButtonColor} d='M86.842,69.474c-3.197,0-5.789,2.592-5.789,5.789v69.474c0,3.197,2.592,5.789,5.789,5.789
                        c3.197,0,5.789-2.592,5.789-5.789V75.263C92.63,72.065,90.039,69.474,86.842,69.474z'/>
                </g>
            </svg>     
        }
    </button>
  )
}

// The overlay button
const OverlayPausePlayButtons: React.FC<ActivityButtonProps> = ({ isPaused, onClick }) => {
  return (
    <button className='pause_play_overlay' onClick={onClick}>
      {isPaused 
            ? <svg viewBox='-22 -11 264 242' aria-label='play button' role='img'>
                <g>
                    <path fill='#907AD6' d='M110,0C49.346,0,0,49.347,0,109.999C0,170.653,49.346,220,110,220s110-49.347,110-110.001C220,49.347,170.654,0,110,0z M110,208.422c-54.27,0-98.42-44.149-98.42-98.423c0-54.271,44.15-98.421,98.42-98.421s98.422,44.149,98.422,98.421C208.422,164.272,164.27,208.422,110,208.422z'/>
                    <path fill='#907AD6' d='M166.375,104.983L86.154,58.669c-1.791-1.031-3.998-1.031-5.789,0c-1.791,1.035-2.895,2.949-2.895,5.016v92.631c0,2.066,1.104,3.98,2.895,5.016c0.896,0.516,1.895,0.773,2.895,0.773s2-0.258,2.895-0.773l80.221-46.314c1.791-1.037,2.895-2.949,2.895-5.018C169.27,107.933,168.166,106.021,166.375,104.983z M89.049,146.288V73.712l62.854,36.287L89.049,146.288z'/>
                </g>
              </svg>
            : <svg viewBox='-22 -11 264 242' aria-label='pause button' role='img'>
                <g>
                    <path fill='#907AD6' d='M110,0C49.346,0,0,49.347,0,109.999C0,170.653,49.346,220,110,220s110-49.347,110-110.001
                        C220,49.347,170.654,0,110,0z M110,208.422c-54.27,0-98.422-44.149-98.422-98.423c0-54.271,44.152-98.422,98.422-98.422
                        s98.421,44.15,98.421,98.422C208.421,164.272,164.27,208.422,110,208.422z'/>
                    <path fill='#907AD6' d='M133.158,69.474c-3.197,0-5.789,2.592-5.789,5.789v69.474c0,3.197,2.592,5.789,5.789,5.789
                        s5.789-2.592,5.789-5.789V75.263C138.947,72.065,136.355,69.474,133.158,69.474z'/>
                    <path fill='#907AD6' d='M86.842,69.474c-3.197,0-5.789,2.592-5.789,5.789v69.474c0,3.197,2.592,5.789,5.789,5.789
                        c3.197,0,5.789-2.592,5.789-5.789V75.263C92.63,72.065,90.039,69.474,86.842,69.474z'/>
                </g>
            </svg>     
        }
      {/* <img src={isPaused ? playButton : pauseButton} alt={isPaused ? 'Resume Timer' : 'Pause Timer'} /> */}
      <span className='timer_button_subtitle'>{isPaused ? 'Resume' : 'Pause'}</span>
    </button>
  )
}

export { ActivityPausePlayButtons, OverlayPausePlayButtons }
