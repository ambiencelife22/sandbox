/* Scramble.jsx */
import { useEffect, useState } from 'react'

// @@ Import external functions @@
import ActivityInteractionFeedbackImageWhite from '../../../components/(user_app_interactions)/_ActivityInteractionFeedbackImageWhite'
import shuffleScrambleArray from './_ShuffleScrambleArray'

import { motion, useCycle } from 'framer-motion'

const shakeAnimation = {
  x: [0, -11, 11, -11, 11, 0],
  transition: {
    duration: 1.1
  }
}


function ScrambleFunctions({
  handleCorrectCount,
  handleIncorrectCount,
  handleCorrectAction,
  handleIncorrectAction,
  actionCorrectElements,
  incorrectPhrases,
  sounds,
}) {

  const [showNextAction] = useState(false)
  const [done, setDone] = useState(false)
  const [showScrambleCorrectCheckMark, setShowScrambleCorrectCheckMark] = useState(false)
  const [showCorrectPhrase, setShowCorrectPhrase] = useState(false)
  const [showScrambleIncorrectXMark, setShowScrambleIncorrectXMark] = useState(false)
  const [showIncorrectPhrase, setShowIncorrectPhrase] = useState(false)
  const [shuffledMixedPieces, setShuffledMixedPieces] = useState([])

  // Screen Size
  const [windowWidth, setWindowWidth] = useState(1000) // default to a larger size if you prefer


  useEffect(() => {
    // Only run this effect client-side
    if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth)
      
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
      
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }
  }, [])


  const scramble_div = 
    windowWidth < 600 ? 'scramble_container_responsive' : 'scramble_container'
  const phrase_div = 
    windowWidth < 600 ? 'pieces_responsive' : 'pieces'


  const [activeItems, setActiveItems] = useState(0)
  const [incorrectAttempts, setIncorrectAttempts] = useState(0)
  const [disableItems, setDisableItems] = useState(false)
  const [clickedIds, setClickedIds] = useState([])
  const [clickedCorrectAnswers, setClickedCorrectAnswers] = useState([])
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0)
  const [activeIncorrectPieces, setActiveIncorrectPieces] = useState([])
  const [hideFullPhrase, setHideFullPhrase] = useState(false)

  
  const [showHint, setShowHint] = useState(false)


  const handleActionPieceClick = (clickedId) => {
    if (clickedId === actionCorrectElements[activeSentenceIndex].activityScrambleArray[activeItems].id) {
        setActiveItems(activeItems + 1)
        sounds.correctPieceSound.toggle()
        handleCorrectCount()  // This is a correct piece
        
        if (activeItems >= actionCorrectElements[activeSentenceIndex].activityScrambleArray.length - 1) {
            correctReset()  // This means action is correct
        }

        if (!clickedIds.includes(clickedId)) {
            setClickedIds([...clickedIds, clickedId])
        }
        return
    }

    // This is an incorrect piece
    handleIncorrectCount()

    setIncorrectAttempts(prev => {
        const newAttempts = prev + 1

        if (newAttempts === 1 || newAttempts === 2) {
            sounds.incorrectPieceSound.toggle()
        }

        if (newAttempts === 2) {
            setTimeout(() => {
                setShowHint(true)

                setTimeout(() => {
                    setShowHint(false)
                }, 1100)

            }, 400)
        }

        return newAttempts
    })

    if (incorrectAttempts + 1 === 3) {
        incorrectReset()  // This means the action is incorrect
    }
  }

  const correctReset = () => {
    setDone(true)
    setShowScrambleCorrectCheckMark(true)
    sounds.correctActionSound.toggle()
    handleCorrectAction(actionCorrectElements[activeSentenceIndex].actionPhrase)

    setTimeout(() => {
        setHideFullPhrase(true)
        setShowScrambleCorrectCheckMark(false)
        setShowCorrectPhrase(true)
        setClickedCorrectAnswers([])
    }, 2200)

    setTimeout(() => {
      resetBoardState()
        setShowCorrectPhrase(false)
        setShowHint(false)  
    }, 4400)
  }


  const incorrectReset = () => {
    setDone(true)
    setHideFullPhrase(true)
    setShowScrambleIncorrectXMark(true)
    sounds.incorrectActionSound.toggle()
    handleIncorrectAction()

    setTimeout(() => {
      setHideFullPhrase(true)
      setShowScrambleIncorrectXMark(false)
      setShowIncorrectPhrase(true)
      setClickedCorrectAnswers([])
    }, 2200)

    setTimeout(() => {
      resetBoardState()
        setShowIncorrectPhrase(false)
        setShowHint(false)  
    }, 4400)
  }

  const resetBoardState = () => {
    setTimeout(() => {
        setupRandomActionPieces()
        setShowCorrectPhrase(false)
        setDone(false)
        setDisableItems(false)
        setIncorrectAttempts(0)
        setClickedIds([])
        setActiveItems(0)
        setClickedCorrectAnswers([])
        setHideFullPhrase(false) 
    }, 400)
  }


  useEffect(() => {
    setClickedCorrectAnswers(
        clickedIds.map(
            (clickedId) =>
                actionCorrectElements[activeSentenceIndex].activityScrambleArray.find(
                    (activityScramblePiece) => activityScramblePiece.id === clickedId
                ).scramblePiece
        )
    )
  }, [clickedIds])

  
  function setupRandomActionPieces() {
    if (!actionCorrectElements || !incorrectPhrases) {
        return
    }

    const randomSentenceIndex = Math.floor(Math.random() * actionCorrectElements.length)
    setActiveSentenceIndex(randomSentenceIndex)

    const shuffledIncorrectAnswers = shuffleScrambleArray([...incorrectPhrases]).slice(0, 4)
    setActiveIncorrectPieces(shuffledIncorrectAnswers)

    const mixedItems = [...actionCorrectElements[randomSentenceIndex].activityScrambleArray, ...shuffledIncorrectAnswers]
    const shuffledMixedItems = shuffleScrambleArray(mixedItems)
    
    setShuffledMixedPieces(shuffledMixedItems)
  }

  useEffect(() => {
    if (actionCorrectElements && incorrectPhrases) {
      setupRandomActionPieces()
    }
  }, [actionCorrectElements, incorrectPhrases])

  return (
    <div className='scramble_main_container'>
        <>
        {!showCorrectPhrase && !hideFullPhrase ? (
          <div className='full_phrase'>
            <div className={'correct_phrase'}>
              <p className='correct_piece'>{clickedCorrectAnswers.join(' ')}</p>
            </div>
          </div>
        ) : null}
        </>
      {!showNextAction && (
        <>
          {done === true ? (
            <div className='scramble_validate_answer_div'>
              {showScrambleCorrectCheckMark && <ActivityInteractionFeedbackImageWhite type='correct' />}
              {showScrambleIncorrectXMark && <ActivityInteractionFeedbackImageWhite type='incorrect' />}
              {showCorrectPhrase ? (
                <div className='scramble_validated_answer_div'>
                  <div className='accurate_phrase_div'>
                    <div className='correct_phrase_div'>
                      <p> {actionCorrectElements[activeSentenceIndex].actionPhraseCorrect}</p>
                    </div>
                  </div>
                </div>
              ) : null}
              {showIncorrectPhrase ? (
                <div className='scramble_validated_answer_div'>
                  <div className='inaccurate_phrase_div'>
                    <div className='incorrect_phrase_div'>
                      <p>
                          The correct empowering phrase was:
                      </p>
                      <p>
                        {actionCorrectElements[activeSentenceIndex].actionPhrase}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

          ) : (

            <div className='outer_scramble_container relative'>
              <div className={scramble_div}>
                <>
                  <div className={phrase_div}>
                    {shuffledMixedPieces.map((val, ind) => (
                        <div key={val.id}>
                            {clickedIds.includes(val.id) ? null : (
                                <motion.p 
                                    onClick={() => handleActionPieceClick(val.id)} 
                                    className={`scramble_pill`}
                                    animate={val.id === actionCorrectElements[activeSentenceIndex].activityScrambleArray[activeItems].id && showHint ? shakeAnimation : {}}
                                >
                                    {val.scramblePiece ? val.scramblePiece : val.actionIncorrectPiece}
                                </motion.p>   
                            )}
                        </div>
                    ))}
                </div>
                </>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ScrambleFunctions
