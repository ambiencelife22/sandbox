import React, { useEffect } from 'react'

function TutorialCountDown({ hours = 0, minutes = 0, seconds = 0 }) {
  const [paused, setPaused] = React.useState(false)
  const [over, setOver] = React.useState(false)
  const [time, setTime] = React.useState({
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds),
  })
  

  const tick = () => {
    if (paused || over) return
  
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      setOver(true)
    }
  
    if (time.seconds === 0 && !(time.hours === 0 && time.minutes === 0)) {
      const newMinutes = time.minutes - 1
      const newSeconds = 59
  
      setTime({
        minutes: newMinutes,
        seconds: newSeconds,
      })
    }
  
    if (time.seconds !== 0) {
      const newMinutes = time.minutes
      const newSeconds = time.seconds - 1
  
      setTime({
        minutes: newMinutes,
        seconds: newSeconds,
      })
    }
  }
  

  // const reset = () => {
  //   setTime({
  //     hours: parseInt(hours),
  //     minutes: parseInt(minutes),
  //     seconds: parseInt(seconds)
  //   })
  //   setPaused(false)
  //   setOver(false)
  // }

  useEffect(() => {
    setInterval(() => {
      setTime({
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: parseInt(seconds),
      })
      setPaused(false)
      setOver(false)
    }, 11000)

  }, [])

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 1100)
    return () => clearInterval(timerID)
  })

  return (
    <div>
      <p>{`${time.minutes
        .toString()
        .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</p>
      <div>{over ? 'Time\'s up!' : ''}</div>
    </div>
  )
}

export default TutorialCountDown