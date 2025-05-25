// activitySoundManager.jsx
'use client'
import { useEffect, useState, useRef } from 'react'

// URL constants
const soundURLs = {
  correctActionSound: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fcorrect-action.m4a?alt=media&token=a1042c5a-5301-45db-a91e-7640269ba561',
  incorrectActionSound: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fincorrect-action.m4a?alt=media&token=e2bd36ac-0967-41dc-b959-0359471e575c',
  correctPieceSound: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fcorrect-piece.m4a?alt=media&token=a1042c5a-5301-45db-a91e-7640269ba561',
  incorrectPieceSound: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fincorrect-piece.m4a?alt=media&token=4868fc06-0da1-4637-9b29-455c41efd7f4',
  correctDropletBubbleSound: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fcorrect-droplet-bubble.m4a?alt=media&token=ec70f603-bee5-4df9-9494-20444f14233f',
  activityCompleteSound: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Factivity-complete.m4a?alt=media&token=69680fe8-15e8-4b62-a383-35e515077e33'
}

// Hook for managing individual sound
const useSound = (url) => {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    if (audioRef.current && audioRef.current.currentTime) {
      audioRef.current.currentTime = 0
    }
    setPlaying(!playing)
  }

  useEffect(() => {
    // Check if Audio is available (client-side) and then assign
    if (typeof Audio !== 'undefined') {
      audioRef.current = new Audio(url)
    }

    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.src = '' // clear the source
        audioRef.current.load() // Ensure it's fully released
      }
    }
  }, [url])

  useEffect(() => {
    if (audioRef.current) {
      playing ? audioRef.current.play() : audioRef.current.pause()
    }
  }, [playing])

  useEffect(() => {
    const handleEnd = () => setPlaying(false)
    
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEnd)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnd)
      }
    }
  }, [])

  return [playing, toggle, audioRef]
}

  const activitySoundManager = () => {
    const sounds = {} 
  
    for (let key of Object.keys(soundURLs)) {
      const [playing, toggle, audioRef] = useSound(soundURLs[key])
      sounds[key] = { playing, toggle, audioRef }
    }
  
    return sounds
  }

export default activitySoundManager