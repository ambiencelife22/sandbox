/* SeedsController.jsx */
import React, { useState, useEffect, useRef } from 'react'
XMLDocument
// @@ Import external hooks @@
import { CheckMarkWhite } from '../../../components/SVG'

// @@ Import partner functions @@
import DragDrop from './SeedsDragDrop'
import DroppingSeed from './_DroppingSeed.jsx'
import AnimatedSeed from './_AnimatedSeedBloom'
import SeedsShowCorrectPhrase from './_SeedsShowCorrectPhrase'

// @@ Import utility functions @@
import activitySoundManager from '../../components/activities/activitySoundManager'

// @@ Import utility context hooks
import { useSeedsActions } from './__SeedsActionContext'

function SeedsController({
  id,
  actionPhrase,
  added,
  resetSeeds,
  setResetSeeds,
  setAdded,
  setDone,
  done,
  PictureList,
  setRandomNumber,
  handlePhraseInteraction,
  handleNextPhrase,
  showStartButton,
  setShowStartButton
}) {

  const [seedsActionReady, setSeedsActionReady] = useState(false)
  const [showSeedsCorrectCheckMark, setShowSeedsCorrectCheckMark] = useState(false)
  const [showDropIcon, setShowDropIcon] = useState(false)
  const [showDropped, setShowDroppedSentence] = useState(false)
  const [showAnimatedSeed, setShowAnimatedSeed] = useState(false)
  const [showDragDrop, setShowDragDrop] = useState(false)
  const [isDraggableSeedPhrase, setIsDraggableSeedPhrase] = useState(true)
  const [showSeedsCorrectPhrase, setShowSeedsCorrectPhrase] = useState(false)
  const [onSeedDropped, setOnSeedDropped] = useState(false)
  const [cycleStep, setCycleStep] = useState('start')

  const [imageLoaded, setImageLoaded] = useState(false)

  const { handleCorrectSeedsActions, isPaused } = useSeedsActions()

  const sounds = activitySoundManager()

  const timeout1 = useRef(null)
  const timeout2 = useRef(null)

  const showDropIconRef = useRef(showDropIcon)

  useEffect(() => {
    showDropIconRef.current = showDropIcon
  }, [showDropIcon])

  useEffect(() => {
    if (showSeedsCorrectCheckMark) {
        setShowDragDrop(false)
    }
  }, [showSeedsCorrectCheckMark])

  useEffect(() => {
    if (isPaused) return
    if (showStartButton === false) {
        switch (cycleStep) {
          case 'start':
            setShowDropIcon(true)
            setCycleStep('dropping')
            break
          case 'dropping':
            timeout1.current = setTimeout(() => {
              setShowDropIcon(false)
              setShowAnimatedSeed(true)
              setCycleStep('animating')
            }, 2800)
            break
          case 'animating':
            timeout2.current = setTimeout(() => {
              setShowAnimatedSeed(false)
              setSeedsActionReady(true)
              setShowDragDrop(true)
              setCycleStep('dragAndDrop')
            }, 2200)
            break
          case 'dragAndDrop':
            if (added) {
              sounds.correctActionSound.toggle()
              setIsDraggableSeedPhrase(false)
              setShowSeedsCorrectCheckMark(true)
              handleCorrectSeedsActions(actionPhrase)
              setCycleStep('correctAnimation')
            }
            break
          case 'correctAnimation':
            // Log the interaction
            timeout1.current = setTimeout(() => {
              setShowSeedsCorrectCheckMark(false)
              setShowSeedsCorrectPhrase(true)
            }, 2200)
            timeout2.current = setTimeout(() => {
              setShowSeedsCorrectPhrase(false)
              setIsDraggableSeedPhrase(false)
              setResetSeeds(true)
              setAdded(false)
              setSeedsActionReady(false)
              setShowDragDrop(false)
              setCycleStep('start') // Starting the new cycle
              handleNextPhrase()
            }, 4400)
            break
          default:
            break
        }
    }
    return () => {
      clearTimeout(timeout1.current)
      clearTimeout(timeout2.current)
    }
  }, [cycleStep, added, isPaused, showStartButton])

  const startActivity = () => {
    // Hide the start button
    setShowStartButton(false)
    
    // Set the initial cycle step to start the activity
    setCycleStep('start')
  }


  return (
    <>
      {showStartButton === true ? (
      <div className="seeds_start_btn_div">
        <button
          className="start_seeds_activity_btn shadow-xl hover:shadow-2xl"
          onClick={startActivity}
        >
          Start
        </button>
      </div>
    ) : (
        <>
        <div className='answer_valid_indicator_container seeds_valid'>
          {showSeedsCorrectCheckMark === true ? <CheckMarkWhite /> : null}
          {showSeedsCorrectPhrase && <SeedsShowCorrectPhrase phrase={actionPhrase} />}
        </div>
        <div className='dripping_icon'>
          {seedsActionReady === false ? (
            <>
            <DroppingSeed
              showDropSeed={showDropIcon}
              onSeedDropped={onSeedDropped}
              showStartButton={showStartButton}
              setImageLoaded={setImageLoaded}
              imageLoaded={imageLoaded}
            />
            <AnimatedSeed isActive={showAnimatedSeed} />
          </>
          ) : (
            <>
              {showDragDrop && (
                <DragDrop
                  id={id}
                  phrase={actionPhrase}
                  added={added}
                  showDropped={showDropped}
                  PictureList={PictureList}
                  setAdded={setAdded}
                  setShowDroppedSentence={setShowDroppedSentence}
                  setDone={setDone}
                  showSeedsCorrectCheckMark={showSeedsCorrectCheckMark} 
                  isDraggableSeedPhrase={isDraggableSeedPhrase}
                />
              )}
            </>
          )}
        </div>
        </>
      )}
    </>
  )
}

export default SeedsController
