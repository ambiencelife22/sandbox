/* activity-seeds/page.tsx */
'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'

// @@ Import Timer @@
import TimeWidget from '../../(a-growers)/components/activities/Timer'

// @@ Import Timer Context @@
import { TimerProvider } from '../../(a-growers)/components/activities/_TimerContext'

// @@ Import Utility Hooks @@
import { motion } from 'framer-motion'

// @@ Import utility functions @@
import activitySoundManager from '../../(a-growers)/components/activities/activitySoundManager'

// @@ Import data hooks @@
import { fetchActionCorrectElementsData } from '@/utils/(hooks-data)/activities/fetchActivityData'
import { createUserStats, saveCombinedActivityData, activityCorrectPhraseInteractions } from '@/utils/(hooks-data)/activities/activityUserResults'

// @@ Import utility context hooks
import { SeedsActionProvider } from './components/__SeedsActionContext'

// @@ Import child functions @@
import ActivitySeeds from './components/Seeds'

// @@ Import external functions @@
import ActivityCompleteAnimation from '../../(a-growers)/components/activities/(activityComplete)/activityCompleteAnimation'
import { getUserActivityThemePoints } from '@/app/(libs)/helpers'

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


function Seeds() {

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

  const [showStartButton, setShowStartButton] = useState(true)

  // Keep track of correctly engaged activity phrase IDs
  const [
    correctlyEngagedActivityPhraseIDs,
    setCorrectlyEngagedActivityPhraseIDs
  ] = useState<string[]>([])

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
      return  // This return will exit from the useEffect if savedSessionID is found.
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
      setCorrectPhrases(data)
    }).catch(error => {
      console.error('Failed to fetch correct data:', error)
    })

  }, [])


  const [correctPhrases, setCorrectPhrases] = useState<ActivityDataType[]>([])
  const [PictureList, setPictureList] = useState<ActivityDataType[]>([])


  // Fisher-Yates (aka Knuth) Shuffle
  function shuffleArray(array: ActivityDataType[]) {
    let shuffleArray = [...array]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]]
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
        'Seeds'
      )

      const interactionData: activityCorrectPhraseInteractions = {
        userID: userID,
        sessionID: sessionID!,
        activityType: 'Seeds',
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
      let dbstats = retrieveUserActivityProgress(userID)
      //@ts-ignore
      localStorage.setItem("activity:progress", dbstats)
    }
  }, [finalResult, correctlyEngagedActivityPhraseIDs])


  async function retrieveUserActivityProgress(uuid: string) {
    let userActivityProgressResults = await getUserActivityThemePoints(uuid)
    return userActivityProgressResults

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


  useEffect(() => {
    const Theme = localStorage.getItem('x:theme') || 'gratitude'
    fetchActionCorrectElementsData(Theme)
      .then(data => {
        const shuffledData = shuffleArray(data)
        setCorrectPhrases(data)
        setPictureList([shuffledData[Math.floor(Math.random() * shuffledData.length)]])
        setLoading(false)
      })
      .catch(error => {
        console.error('Failed to fetch correct data:', error)
        setLoading(false)
      })
  }, [])

  // Shuffle Next phrase
  const handleNextPhrase = () => {
    const shuffleData = shuffleArray(correctPhrases)

    setPictureList([
      shuffleData[Math.floor(Math.random() * shuffleData.length)],
    ])
  }

  const handleCorrectSeedsActions = useCallback((actionPhrase: string, xTheme: string, phraseID: string) => {

    setCorrectActions(prev => prev + 1)
    setCorrectActionsCount(prev => prev + 1)

    // Now using the state set by the fetch:
    const correspondingCorrectPhrase = correctPhrases.find(phrase => phrase.actionPhrase === actionPhrase)
    if (correspondingCorrectPhrase) {
      const phraseID = correspondingCorrectPhrase.id
      setCorrectlyEngagedActivityPhraseIDs(prev => [...prev, phraseID])
    }
  }, [correctPhrases])


  const themeImg = PictureList && PictureList.length > 0 ? PictureList[0].themeImage : 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_themes%2Ftheme-11aff-gratitude.svg?alt=media&token=7ae70c73-355f-47fe-91ef-fce1e8393218'


  return (
    loading ?
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={flashAnimation}
        transition={{ duration: 1.1, repeat: Infinity, repeatType: 'reverse' }}
        className="seeds_loading_div">
        Loading...
      </motion.div> :
      <TimerProvider>
        <div className='seeds_theme_icon'>
          <img src={themeImg} alt='ambience.Life theme image' />
        </div>
        <SeedsActionProvider handleCorrectSeedsActions={handleCorrectSeedsActions} sessionID={sessionID!} userID={userID}>
          <div className='activity_seeds_background'>
            {finalResult ? (
              <ActivityCompleteAnimation
                sounds={sounds}
                correctPiecesCount={0}
                incorrectPiecesCount={0}
                correctActionsCount={correctActionsCount}
                incorrectActionsCount={0}
                activityType='Seeds'
              />
            ) : (
              <>
                <div className="points_timer_div pjs">
                  {!showStartButton ? (
                    <>
                      <div className="points_timer_color1 timer">
                        <TimeWidget
                          activityType="Seeds"
                          endTimerParentFunction={() => setFinalResult(true)}
                          resetCurrentScore={resetSessionScore}
                          resetCurrentActivitySessionData={
                            resetActivitySessionData
                          }
                        />
                      </div>
                      <div className="ambients3 points_timer_color1" tabIndex={0}>
                        <h2>correct answers: {correctActionsCount}</h2>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className='seeds'>
                  <ActivitySeeds
                    PictureList={PictureList}
                    setFinalResult={setFinalResult}
                    finalResult={finalResult}
                    handleNextPhrase={handleNextPhrase}
                    showStartButton={showStartButton}
                    setShowStartButton={setShowStartButton}
                  />
                </div>
              </>
            )}
          </div>
        </SeedsActionProvider>
      </TimerProvider>
  )
}

export default Seeds