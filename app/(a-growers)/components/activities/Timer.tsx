/* Timer.tsx */
'use client'
import React, { useState, useEffect, useRef } from 'react'

import { useTimer } from './_TimerContext'

// @@ Import Timer UI Functions @@
import {ActivityPausePlayButtons, OverlayPausePlayButtons } from './_TimerPausePlayButtons'
import { ActivityOverlayResetButton, ActivityOverlayStopButton } from './_TimerStopResetButtons'

interface Props {
  endTimerParentFunction: (minutes: number, seconds: number) => void
  resetCurrentScore: () => void
  updateTimeDisplay?: (mins: number, secs: number) => void
  resetCurrentActivitySessionData: () => void
  activityType: 'Seeds' | 'Typer' | 'Cards' | 'Scramble'
}

const activityButtonColors = {
  'Seeds': '#F1F1F1',
  'Typer': '#F1F1F1',
  'Cards': '#F1F1F1',
  'Scramble': '#F1F1F1',
}

interface PausePlayButtonFunctionality {
  isPaused: boolean
  onClick: () => void
  overlay?: boolean // Determines whether this is for the overlay or the activity screen
}


const TimeWidget: React.FC<Props> = ({
  endTimerParentFunction,
  resetCurrentActivitySessionData,
  resetCurrentScore,
  activityType
}) => {
  const activityButtonColor = activityButtonColors[activityType]
  const [pauseOverlaySeconds, setPauseOverlaySeconds] = useState(0) // These are dummy seconds and do not affect the timer
  const { isPaused, setIsPaused } = useTimer() // Using TimerContext.tsx
  const intervalId = useRef<NodeJS.Timeout | null>(null)
  const [isPauseOverlayVisible, setIsPauseOverlayVisible] = useState(false)
  const [timerEnded, setTimerEnded] = useState(false)

  // Get the initial timer value from local storage or use a default value
  const [time, setTime] = useState<{ minutes: number, seconds: number }>({ minutes: -22, seconds: -22 })


  const formatTime = (time: number): string => {
    if (time === -22) return '--'
    return time < 10 ? '0' + time : time.toString()
  }
  

  useEffect(() => {
    // Fetch the timer value from local storage when the component mounts (client-side)
    const initialTimerValue = parseInt(localStorage.getItem('timer') || '2')
    setTime({ minutes: initialTimerValue, seconds: 0 })
  }, [])

  const [displayMinutes, setDisplayMinutes] = useState<string | number>('--')
  const [displaySeconds, setDisplaySeconds] = useState<string | number>('--')

  const decrementTime = () => {
    if (time.seconds > 0) {
        setTime(prev => ({ ...prev, seconds: prev.seconds - 1 }))
        return
    }
    
    if (time.minutes > 0) {
      setTime(prev => ({ minutes: prev.minutes - 1, seconds: 59 }))
        return
    }
  }

  useEffect(() => {
    const setInitialTime = setTimeout(() => {
        setDisplayMinutes(time.minutes)
        setDisplaySeconds(time.seconds)
    }, 1100)

    return () => clearTimeout(setInitialTime)
}, [time.minutes, time.seconds])

  useEffect(() => {
    {/*
      This function handles the visibility changes of the document
      When the document becomes hidden, it pauses the timer
      When the document becomes visible again, it shows the pause screen
    */}
    const handleVisibilityChange = () => {
      if (timerEnded) return
      if (document.hidden) {
        setIsPaused(true)
        if (intervalId.current) {
          clearInterval(intervalId.current)
        }
      }
      if (!document.hidden) {
        setIsPauseOverlayVisible(true)
      }
    }
  
    document.addEventListener('visibilitychange', handleVisibilityChange)
  
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])  

  useEffect(() => {
    {/*
      This function updates the timer every second.
      It counts the seconds down one by one until it reaches zero, then it reduces the minutes by one
      When both minutes and seconds reach zero, it calls the endTimerParentFunction
    */}
    let interval: NodeJS.Timeout | null = null
    if (!isPaused) {
      if (time.minutes === 0 && time.seconds === 0) {
          setTimerEnded(true)
          endTimerParentFunction(time.minutes, time.seconds)
      }
      intervalId.current = setInterval(decrementTime, 1100)
    }
    return () => {
      if (intervalId.current) {
          clearInterval(intervalId.current)
      }
    }  
  }, [time.minutes, time.seconds, isPaused])

  useEffect(() => {

    return () => {
        if (intervalId.current) {
            clearInterval(intervalId.current)
        }
        // Reset the timer state to its initial state when the component unmounts
        setTime({ minutes: -22, seconds: -22 }) 
        setDisplayMinutes('--')
        setDisplaySeconds('--')
        setIsPaused(false)
        setIsPauseOverlayVisible(false)
        setTimerEnded(false)
    }
  }, [])


  const handlePause = () => {
    {/*
      This function handles the pausing and resuming of the timer
      It toggles the isPaused state
      When the timer is paused, it stops the timer and updates the pause overlay seconds
      When the timer is resumed, it clears the intervalId.current
    */}
    
    // If a timer is currently running, stop it.
    if (intervalId.current) {
      clearInterval(intervalId.current)
    }

    // Before pausing, update the pauseOverlaySeconds to reflect the current seconds value.
    setPauseOverlaySeconds(time.seconds)

    // Toggle the pause state
    setIsPaused((prev) => !prev)

    // Handle the visibility of the pause screen
    HandlePauseScreen()
  }
  
  function HandlePauseScreen() {
    if (isPauseOverlayVisible) {
      setIsPauseOverlayVisible(false)
    }

    if (!isPauseOverlayVisible) {
      setIsPauseOverlayVisible(true)
    }
  }

  function ResetTimer() {
    // 1. Pause the timer if it's running.
    if (!isPaused) {
      setIsPaused(true)
      if (intervalId.current) {
          clearInterval(intervalId.current)
      }
  }

    // 2. Reset the timer values.
    setTime({
      minutes: parseInt(localStorage.getItem('timer') || '2'),
      seconds: 0
    })
    
    // 3. Reset the session data.
    resetCurrentActivitySessionData() // Resetting current session data

    // 4. Reset the activity score.
    resetCurrentScore() // Resetting the score of the activity
  }

  function StopSessionReturnHome() {
    if (typeof window !== 'undefined') {
      window.location.href = window.location.origin + '/activities'
    }
  }

  return (
    <>
      <div className='main_timer_display'>
        {formatTime(time.minutes)}:{formatTime(time.seconds)}
      </div>
        <div className='pause_play_container'>
          <ActivityPausePlayButtons isPaused={isPaused} onClick={handlePause} activityButtonColor={activityButtonColor} />
        </div>
        <div className={isPauseOverlayVisible ? 'overlay_pause_screen isPauseOverlayVisibleStyle' : 'overlay_pause_screen'}>
            <div className='timer_popup'>
                <div className='timer_popup_container'>
                    <div className='timer_popup_content'>
                        <div className='timer_popup_header'>
                            <h2>Activity paused</h2>
                        </div>
                        <div className='time_remaining_container'>
                            <h2>Time Remaining</h2>
                            <div className='timer_popup_body' style={{ alignSelf: 'center' }}>
                            {formatTime(time.minutes)}:{formatTime(time.seconds)}
                            </div>
                        </div>
                    </div>
                    <div className='button_container'>
                      <ActivityOverlayResetButton onClick={ResetTimer} />
                      <ActivityOverlayStopButton onClick={StopSessionReturnHome} />
                      <OverlayPausePlayButtons isPaused={isPaused} onClick={handlePause} activityButtonColor={''} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default TimeWidget

