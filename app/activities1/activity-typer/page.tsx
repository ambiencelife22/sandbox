/* activity-typer/page.tsx */
'use client'
import React, { useState, useEffect, useRef } from 'react'

// @@ Import Timer @@
import TimeWidget from '../../(a-growers)/components/activities/Timer'

// @@ Import Timer Context @@
import { TimerProvider } from '../../(a-growers)/components/activities/_TimerContext'

// @@ Import Utility Hooks @@
import { motion } from 'framer-motion'

// @@ Import utility functions @@
import activitySoundManager from '../../(a-growers)/components/activities/activitySoundManager'

// @@ Import data hooks @@
import { fetchActionCorrectElementsData } from '../../../utils/(hooks-data)/activities/fetchActivityData'
import { createUserStats, saveCombinedActivityData, activityCorrectPhraseInteractions } from '../../../utils/(hooks-data)/activities/activityUserResults'

// @@ Import child functions @@
import TyperFunctions from './components/Typer'

// @@ Import external functions @@
import ActivityCompleteAnimation from '../../(a-growers)/components/activities/(activityComplete)/activityCompleteAnimation'
import { getUserActivityThemePoints } from '../../(libs)/helpers'


type SessionData = {
  userID?: string
  sessionID: number
  xTheme: string
  correctPiecesCount: number
  incorrectPiecesCount: number
  correctActionsCount: number
  incorrectActionsCount: number
  bonusBeansCount: number
}

interface ActivityDataType {
  id: string
  ot: string
  xTheme: string
  actionPhrase: string
  actionPhraseCorrect: string
  actionPhraseIncorrect: string
  actionThemeId: string
  activityScrambleArray: string[]
  themeImage: string
  actionIsCorrect: boolean
}

const flashAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}


function Typer() {

  const sessionInitialized = useRef(false)

  const [loading, setLoading] = useState(true)
  const [sessionID, setSessionID] = useState<number | null>(null)

  // Fetch correct and incorrect phrases using custom hooks
  const [correctPieces, setCorrectPieces] = useState(0)
  const [correctPiecesCount, setCorrectPiecesCount] = useState(0)
  const [correctActions, setCorrectActions] = useState(0)
  const [correctActionsCount, setCorrectActionsCount] = useState(0)

  const [incorrectPieces, setIncorrectPieces] = useState(0)
  const [incorrectPiecesCount, setIncorrectPiecesCount] = useState(0)
  const [incorrectActions, setIncorrectActions] = useState(0)
  const [incorrectActionsCount, setIncorrectActionsCount] = useState(0)

  const [bonusBeans, setBonusBeans] = useState(0)
  const [bonusBeansCount, setBonusBeansCount] = useState(0)
  const [finalResult, setFinalResult] = useState(false)
  const [Theme, setTheme] = useState('gratitude')

  const [activityThemeForData, setActivityThemeForData] = useState('gratitude')
  const [themeForThemeImage, setThemeForThemeImage] = useState('gratitude')

  const [correctPhrases, setCorrectPhrases] = useState<ActivityDataType[]>([])
  const [num, setNum] = useState<number>(0)
  const generateNewRandomNumber = (max: number) => {
    return Math.floor(Math.random() * max)
}


  // Keep track of correctly engaged activity phrase IDs
  const [correctlyEngagedActivityPhraseIDs, setCorrectlyEngagedActivityPhraseIDs] = useState<string[]>([])


  // const [ddsgVal, setDdsgVal] = useState(0)
  // const [ddaoeVal, setDdaoeVal] = useState(0)
  // const getddsgVal = () => {
  //   return ((ddsgVal - 2112244121))
  // }
  // const getddaoeVal = () => {
  //   return Math.round((ddaoeVal - 12345) / 7)
  // }

  const sounds = activitySoundManager()

  // Timer Constants
  const endTimer = () => {
    setFinalResult(true)
  }

  const [userID, setUserID] = useState('')
  const [sessionTimer, setSessionTimer] = useState(2)


  useEffect(() => {
    let savedSessionID = localStorage.getItem('sessionID')

    if (savedSessionID) {
      setSessionID(Number(savedSessionID))
      return
    }

    let newID = Date.now()
    setSessionID(newID)
    localStorage.setItem('sessionID', newID.toString())
  }, [])


  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session') || '[]')
    setUserID(session['uuid'])
    const sessionTimer = JSON.parse(localStorage.getItem('timer') || '2') // default to '2' if no timer value
    setSessionTimer(sessionTimer)
  })


  useEffect(() => {
    // Get the theme
    const Theme = localStorage.getItem('x:theme') || 'Gratitude'
    setActivityThemeForData(Theme)

    // Fetch the correct phrases using the centralized API function
    fetchActionCorrectElementsData(Theme).then(data => {
      setCorrectPhrases(shuffleArray(data))
      setLoading(false)
    }).catch(error => {
      console.error('Failed to fetch correct data:', error)
    })

}, [])


  // Fisher-Yates (aka Knuth) Shuffle
  function shuffleArray(array: ActivityDataType[]) {
    let shuffleArray = [...array]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]]
    }
    return shuffleArray
  }


  const resetActivitySessionData = () => {
    // Reset the local state
    sessionInitialized.current = false
    setCorrectPiecesCount(0)
    setIncorrectPiecesCount(0)
    setCorrectActionsCount(0)
    setIncorrectActionsCount(0)
    setBonusBeans(0)
    setFinalResult(false)

    // Reset the local storage data
    const initialData: SessionData = {
      userID: '',
      sessionID: sessionID!,
      xTheme: 'gratitude',
      correctPiecesCount: 0,
      incorrectPiecesCount: 0,
      correctActionsCount: 0,
      incorrectActionsCount: 0,
      bonusBeansCount: 0
    }
  }


  // Update results
  useEffect(() => {
    if (finalResult) {
      setBonusBeansCount(incorrectActionsCount === 0 ? 2 : 0)

      const userActivityStatsData = createUserStats(
        userID,
        sessionID!,
        sessionTimer,
        correctPieces,
        incorrectPieces,
        correctActions,
        incorrectActions,
        activityThemeForData,
        'Typer'
      )

      const interactionData: activityCorrectPhraseInteractions = {
        userID: userID,
        sessionID: sessionID!,
        activityType: 'Typer',
        xTheme: activityThemeForData,
        correctActivityInteractions: {},
        xCategory: 'Core'
      }

      correctlyEngagedActivityPhraseIDs.forEach(phraseID => {
        if (phraseID) {
          interactionData.correctActivityInteractions[phraseID] = interactionData.correctActivityInteractions[phraseID] || 0
          interactionData.correctActivityInteractions[phraseID] += 1
        }
      })

      const combinedData = {
        activityResultsTracking: userActivityStatsData,
        activityPhraseInteractions: interactionData
      }

      saveCombinedActivityData(combinedData)

      retrieveUserActivityProgress(userID)
    }
  }, [finalResult, correctlyEngagedActivityPhraseIDs])

  async function retrieveUserActivityProgress(uuid: string) {
    let userActivityProgressResults = await getUserActivityThemePoints(uuid)
  }

  function resetSessionScore() {
    setCorrectPieces(0)
    setCorrectPiecesCount(0)
    setCorrectActions(0)
    setCorrectActionsCount(0)
    setIncorrectPieces(0)
    setIncorrectPiecesCount(0)
    setIncorrectActions(0)
    setIncorrectActionsCount(0)
    // resetCurrentActivitySessionData()
  }




  const handleCorrectAction = (actionPhrase: string, theme: string, phraseID: string) => {
    setCorrectActions(prev => prev + 1) // Increase correct actions count for db
    setCorrectActionsCount(prev => prev + 1) // Increase correct count for ui and activityComplete

    const correspondingCorrectPhrase = correctPhrases.find((phrase: { actionPhrase: string }) => phrase.actionPhrase === actionPhrase)
    if (correspondingCorrectPhrase) {
      const phraseID = correspondingCorrectPhrase.id
      setCorrectlyEngagedActivityPhraseIDs(prev => [...prev, phraseID])
    }
  }


  const handleIncorrectAction = () => {
    setIncorrectActions(prev => prev + 1) // Increase incorrect actions count for db
    setIncorrectActionsCount(prev => prev + 1) // Increase incorrect count for activityComplete
  }

  const getNextPhraseIndex = () => {
    setNum((prevNum: number) => (prevNum + 1) % correctPhrases.length)
  }


  useEffect(() => {
    // Get the theme
    const Theme = localStorage.getItem('x:theme') || 'Gratitude'
    setActivityThemeForData(Theme)

    // Fetch the correct phrases using the centralized API function
    fetchActionCorrectElementsData(Theme).then(data => {
      setCorrectPhrases(shuffleArray(data))
      setLoading(false)
    }).catch(error => {
      console.error('Failed to fetch correct data:', error)
    })

  }, [])



  const [repeatedPhrases, setRepeatedPhrases] = useState<ActivityDataType[]>([])


  const themeImg = correctPhrases && correctPhrases.length > 0 ? correctPhrases[0].themeImage : 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_themes%2Ftheme-11aff-gratitude.svg?alt=media&token=7ae70c73-355f-47fe-91ef-fce1e8393218'


  return (
      <TimerProvider>
        <div className='activity_typer_background'>
          {finalResult ? (
            <div className='flex items-center justify-center h-screen'>
              <ActivityCompleteAnimation
                sounds={sounds}
                correctPiecesCount={correctPieces}
                incorrectPiecesCount={incorrectPieces}
                correctActionsCount={correctActionsCount}
                incorrectActionsCount={incorrectActionsCount}
                activityType='Typer'
              />
            </div>
          ) : (
            <div className='activity_typer_background'>
              <div className='typer_points_timer_div z-[100]'>
                <div className='points_timer_color1 timer text-2xl z-[99999]'>
                  <TimeWidget
                    activityType='Typer'
                    endTimerParentFunction={() => setFinalResult(true)}
                    resetCurrentScore={resetSessionScore}
                    resetCurrentActivitySessionData={resetActivitySessionData}
                  />
                </div>
                <div className='ambients3 points_timer_color2' tabIndex={0}>
                  <h2 className='text-2xl'>correct answers: {correctActionsCount}</h2>
                </div>
              </div>
              <div className='typer_theme_icon pt-4'>
                  <img src={themeImg} alt='typer theme image' />
                </div>
              <div className='typer'>
                <div className='justify-center m-auto'>
                  {correctPhrases && correctPhrases.length > 0 && (
                    <TyperFunctions
                      handleCorrectAction={handleCorrectAction}
                      handleIncorrectAction={handleIncorrectAction}
                      shuffledPhrases={correctPhrases}
                      getNextPhraseIndex={getNextPhraseIndex}
                      setRepeatedPhrases={setRepeatedPhrases}
                      num={num}
                      generateNewRandomNumber={generateNewRandomNumber}
                      sounds={sounds}
                      themeForThemeImage={themeForThemeImage}
                    />
                  )}
                </div>
              </div>
              
            </div>
          )}
        </div>
      </TimerProvider>
  )
}

export default Typer