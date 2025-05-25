/* activityCompleteAnimation.jsx */
'use client'
import React, { useState, useEffect } from 'react'

// @@ Import utility hooks @@
import { motion } from 'framer-motion'

// @@ Import external functions @@
import useSessionData from '../../../../../utils/(hooks-data)/activities/useSessionData'

// @@ Import utility functions @@
// import activitySoundManager from '@/app/(a-growers)/components/activities/activitySoundManager.jsx'

// @@ Import aux hooks @@
import { ResultDisplay } from './activityResultsDisplay'
import { ambientFront, ambienceBack } from '../../../../components/(images)/ambients'

const initialState = {
  activityFinish: false,
  finalResults: false,
  accuracy: 0,
  bonusBeansCount: 0
}

const spinImage = {
  loop: {
    rotate: 220,
    transition: {
      duration: 2,
      repeat: Infinity
    }
  },
  reverseLoop: {
    rotate: -220,
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }
}

const getBonusBeansCount = (activityType, params) => {
  if (activityType === 'Seeds') return 0
  if (activityType === 'Typer') return 0
  if (activityType === 'Cards') return 0
  if (activityType === 'Scramble') return 0
  return 0  // Default case
}

const bonusBeansForAccuracy = {
  'Seeds': (params) => params.incorrectActionsCount === 0 && params.correctActionsCount > 0 ? 2 : 0,
  'Typer': (params) => params.incorrectActionsCount === 0 && params.correctActionsCount > 0 ? 4 : 0,
  'Cards': (params) => params.incorrectActionsCount === 0 && params.correctActionsCount > 0 ? 4 : 0,
  'Scramble': (params) => params.correctActionsCount > 0 
  ? (params.correctActionsCount + ((params.incorrectActionsCount + params.incorrectPiecesCount) === 0 ? 11 : 0))
  : 0
}

const ActivityCompleteAnimation = ({ 
    activityType,
    correctPiecesCount = 0,
    incorrectPiecesCount = 0,
    correctActionsCount,
    incorrectActionsCount,
    sounds
}) => {

  const [hasPlayedActivityCompleteSound, setHasPlayedActivityCompleteSound] = useState(false)

  const [state, setState] = useState(initialState)
  const [imageState, setImageState] = useState('front')

    // Sum of correct counts (both pieces and actions)
  const totalCorrect = correctPiecesCount + correctActionsCount
  const totalIncorrect = incorrectPiecesCount + incorrectActionsCount
  const totalActivitySessionInteractions = totalCorrect + totalIncorrect

  const bonusBeansBeforeAccuracy = getBonusBeansCount(activityType, { correctActionsCount })
  const [accuracyBonusBeansCount, setAccuracyBonusBeansCount] = useState(0)

  const {
    seedsSessionData = {},
    typerSessionData = {},
    cardsSessionData = {},
    scrambleSessionData = {}
  } = useSessionData(state.finalResults, activityType, totalCorrect, bonusBeansBeforeAccuracy, accuracyBonusBeansCount, incorrectPiecesCount + incorrectActionsCount)

  useEffect(() => {
    if (!hasPlayedActivityCompleteSound) {
      sounds.activityCompleteSound.toggle()
      setHasPlayedActivityCompleteSound(true)
  }
    let timer = setInterval(() => {
        if (imageState === 'front') {
            setImageState('back')
            clearInterval(timer)
            return // exit early after setting state
        } 
        if (imageState === 'back') {
            setState(prevState => ({ ...prevState, finalResults: true }))
            clearInterval(timer)
        }
    }, 2222)
    return () => clearInterval(timer)
  }, [imageState, hasPlayedActivityCompleteSound])

  useEffect(() => {
    const accuracyRatio = (totalCorrect / (totalActivitySessionInteractions || 1)) * 100
    const _accuracy = parseFloat(accuracyRatio.toFixed(2))

    // Calculate bonus based on accuracy and passed parameters
    const accuracyBonus = bonusBeansForAccuracy[activityType]({
        correctActionsCount: correctActionsCount,
        incorrectActionsCount: incorrectActionsCount,
        incorrectPiecesCount: incorrectPiecesCount
    })

    setAccuracyBonusBeansCount(accuracyBonus)
    setState(prevState => ({
        ...prevState,
        accuracy: _accuracy,
    }))
  }, [totalCorrect, totalIncorrect])



  return (
    <>
      {state.finalResults ? (
        <ResultDisplay
          totalCorrect={totalCorrect}
          accuracy={state.accuracy}
          bonusBeansFinalCount={bonusBeansBeforeAccuracy + accuracyBonusBeansCount}
          totalGain={totalCorrect + bonusBeansBeforeAccuracy + accuracyBonusBeansCount}
        />
      ) : (
        <motion.img
          src={imageState === 'front' ? ambientFront : ambienceBack}
          alt={imageState === 'front' ? 'your total' : 'finished activity'}
          className='animation_page_img2_container'
          initial={{ rotate: 0 }}
          animate={imageState === 'front' ? 'reverseLoop' : 'loop'}
          variants={spinImage}
        />
      )}
    </>
  )
}

export default React.memo(ActivityCompleteAnimation)
