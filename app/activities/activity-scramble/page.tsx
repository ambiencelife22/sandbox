/* activity-scramble/page.tsx */
'use client'
import React, { useState, useEffect, useRef } from 'react'

// @@ Import Timer @@
import TimeWidget from '../../(a-growers)/components/activities/Timer'

// @@ Import external structure functions @@
import { ActivitiesLoadingAnimation } from '@/components/ui/loading-animation'

// @@ Import Timer Context @@
import { TimerProvider } from '../../(a-growers)/components/activities/_TimerContext'

// @@ Import utility functions @@
import activitySoundManager from '../../(a-growers)/components/activities/activitySoundManager'

// @@ Import data hooks @@
import { fetchActionCorrectElementsData, fetchActionIncorrectPiecessData } from '@/utils/(hooks-data)/activities/fetchActivityData'
import { createUserStats, saveCombinedActivityData, activityCorrectPhraseInteractions } from '@/utils/(hooks-data)/activities/activityUserResults'

// @@ Import child functions @@
import ScrambleFunctions from './components/Scramble'

// @@ Import external functions @@
import ActivityCompleteAnimation from '../../(a-growers)/components/activities/(activityComplete)/activityCompleteAnimation'

import { getUserActivityThemePoints } from '@/app/(libs)/helpers'
// !! Milestone !! 44 Action Incorrect Pieces


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

interface ActionCorrectElement {
  id: number
  activityScrambleArray: any[]
  actionPhraseCorrect: string
  actionPhrase: string
  themeImage: string
}


function Scramble() {

  const [isLoading, setIsLoading] = useState(true)
  const sessionInitialized = useRef(false)
  const [sessionID, setSessionID] = useState<number | null>(null)
  const [correctPhrases, setCorrectPhrases] = useState<ActivityDataType[]>([])

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

  const [activityThemeForData, setActivityThemeForData] = useState('gratitude')
  const [themeForThemeImage, setThemeForThemeImage] = useState('gratitude')

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

  const [actionCorrectElements, setActionCorrectElements] = useState<ActionCorrectElement[] | null>(null)
  const [incorrectPiecesData, setIncorrectPiecesData] = useState(null)

  const sounds = activitySoundManager()
  
  useEffect(() => {
    const xTheme = localStorage.getItem('x:theme') || 'gratitude'
    setActivityThemeForData(xTheme)
    setThemeForThemeImage(xTheme)
  
    Promise.all([
      fetchActionCorrectElementsData(xTheme),
      fetchActionIncorrectPiecessData()
    ])
      .then(([correctData, incorrectData]) => {
        setCorrectPhrases(correctData)
        setActionCorrectElements(correctData)
        setIncorrectPieces(incorrectData)
        setIncorrectPiecesData(incorrectData)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Failed to fetch data:', error)
        setIsLoading(false)
      })
  }, [])
  


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
    const sessionTimer = JSON.parse(localStorage.getItem('timer') || '2')
    setSessionTimer(sessionTimer)
  })

  function resetActivitySessionData() {
    // Reset the local state
    sessionInitialized.current = false
    setCorrectPiecesCount(0)
    setIncorrectPiecesCount(0)
    setCorrectActionsCount(0)
    setIncorrectActionsCount(0)
    setBonusBeansCount(0)
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
      const userActivityStatsData = createUserStats(
        userID,
        sessionID!,
        sessionTimer,
        correctPieces,
        incorrectPieces,
        correctActions,
        incorrectActions,
        activityThemeForData,
        'Scramble'
      )

      const interactionData: activityCorrectPhraseInteractions = {
        userID: userID,
        sessionID: sessionID!,
        activityType: 'Scramble',
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
  }


  const handleCorrectPieces = () => {
    // setDdsgVal((prev) => prev + 1 + 2112244121) // Obfuscated increase correct pieces for db
    setCorrectPieces((prev) => prev + 1)  // Increase correct pieces for db
    setCorrectPiecesCount((prev) => prev + 1) // Increase correct pieces for ui
  }


  const handleCorrectAction = (actionPhrase: string, xTheme: string, phraseID: string) => {
    setCorrectActions((prev) => prev + 1) // Increase correct actions count for db
    setCorrectActionsCount((prev) => prev + 1) // Increase correct actions count for ui
    setBonusBeans(bonusBeans + 1) // Increase bonus beans for db
    setBonusBeansCount(bonusBeansCount + 1) // Increase bonus beans for ui

    const correspondingCorrectPhrase = correctPhrases.find(phrase => phrase.actionPhrase === actionPhrase)
    if (correspondingCorrectPhrase) {
      const phraseID = correspondingCorrectPhrase.id
      setCorrectlyEngagedActivityPhraseIDs(prev => [...prev, phraseID])
    }
  }


  const handleIncorrectPiece = () => {
    setIncorrectPieces((prev) => prev + 1) // Increase incorrect pieces count for db
    setIncorrectPiecesCount((prev) => prev + 1) // Increase incorrect pieces count for ui
  }

  const handleIncorrectAction = () => {
    setIncorrectActions((prev) => prev + 1) // Increase incorrect actions count for db
    setIncorrectActionsCount((prev) => prev + 1) // Increase incorrect count for activityComplete
  }


  const themeImg = actionCorrectElements && actionCorrectElements.length > 0 ? actionCorrectElements[0].themeImage : 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_themes%2Ftheme-11aff-gratitude.svg?alt=media&token=7ae70c73-355f-47fe-91ef-fce1e8393218'


  return (
    <TimerProvider>
      <div className='activity_scramble_background'>
        <div className='scramble_theme_icon'>
          <img src={themeImg} alt='scramble theme image' />
        </div>
        {finalResult ? (
          <ActivityCompleteAnimation
            sounds={sounds}
            correctPiecesCount={correctPieces}
            incorrectPiecesCount={incorrectPieces}
            correctActionsCount={correctActionsCount}
            incorrectActionsCount={incorrectActionsCount}
            activityType='Scramble'
          />
        ) : isLoading ? (
          // Display the DotsLoadingAnimation while isLoading is true
          <ActivitiesLoadingAnimation />
        ) : (
          <>
            <div className='points_timer_div pjs'>
              <div className='points_timer_color1 timer'>
                <TimeWidget
                  activityType='Scramble'
                  endTimerParentFunction={() => setFinalResult(true)}
                  resetCurrentScore={resetSessionScore}
                  resetCurrentActivitySessionData={resetActivitySessionData}
                />
              </div>
              <div className='ambients3 points_timer_color2' tabIndex={0}>
                <h2>correct answers: {correctActionsCount}</h2>
              </div>
            </div>
            <div className='scramble'>
              <div className='justify-center m-auto'>
                <ScrambleFunctions
                  handleCorrectCount={handleCorrectPieces}
                  handleIncorrectCount={handleIncorrectPiece}
                  handleCorrectAction={handleCorrectAction}
                  handleIncorrectAction={handleIncorrectAction}
                  actionCorrectElements={actionCorrectElements}
                  incorrectPhrases={incorrectPiecesData}
                  sounds={sounds}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </TimerProvider>
  )
}

export default Scramble
