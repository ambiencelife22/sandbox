/* _DroppingSeed.jsx */
'use client'
import React, { useEffect, useState } from 'react'

// @@ Import aux hooks @@
import activitySoundManager from '../../components/activities/activitySoundManager'

function DroppingSeed({
  showDropSeed,
  onSeedDropped,
  showStartButton,
  imageLoaded,
  setImageLoaded,
}) {
  const HeartSeed =
    'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_actions%2Fimages_actions_global%2Fheart-drip.svg?alt=media&token=d719106f-6aef-4ee0-9cb9-9a3e60995797'

  // Sounds Constants
  const sounds = activitySoundManager()

  // Drop Seed effect
  useEffect(() => {
    if (showDropSeed) {
      sounds.correctPieceSound.toggle()

      // Set the logic here
      setTimeout(() => {
        onSeedDropped && onSeedDropped()
      }, 2200)
    }
  }, [showDropSeed])

  const handleImageLoad = () => {
    setImageLoaded(true)
  }
  const image = new Image()
  image.onload = handleImageLoad
  image.src = HeartSeed

  return (
    <>
      {!showStartButton && showDropSeed && imageLoaded && (
        <div className="heart_drip">
          <img src={HeartSeed} className="drop sm-drop" alt="Heart Droplet" />
        </div>
      )}
    </>
  )
}

export default React.memo(DroppingSeed)