/* activity-cards/page.tsx */
'use client'
import React, { useState, useEffect, useRef } from 'react'

// @@ Import Timer @@
import TimeWidget from '../../(a-growers)/components/activities/Timer'

// @@ Import Timer Context @@
import { TimerProvider } from '../../(a-growers)/components/activities/_TimerContext'

// @@ Import utility functions @@
import activitySoundManager from '../../(a-growers)/components/activities/activitySoundManager'

// @@ Import data hooks @@
import { fetchActionCorrectElementsData, fetchActionIncorrectElementsData } from '../../../utils/(hooks-data)/activities/fetchActivityData'
import { createUserStats, saveCombinedActivityData, activityCorrectPhraseInteractions } from '../../../utils/(hooks-data)/activities/activityUserResults'
import { useShuffleLogic } from './components/_ShuffleCardsArray'

// @@ Import child functions @@
import CardsFunctions from './components/Cards'

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


function Cards() {

  const [isLoading, setIsLoading] = useState(true)
  const sessionInitialized = useRef(false)
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

  const [activityThemeForData, setActivityThemeForData] = useState('gratitude')
  const [themeForThemeImage, setThemeForThemeImage] = useState('gratitude')

  // Keep track of correctly engaged activity phrase IDs
  const [correctlyEngagedActivityPhraseIDs, setCorrectlyEngagedActivityPhraseIDs] = useState<string[]>([])

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


  function resetActivitySessionData() {
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
      const userActivityStatsData = createUserStats(
        userID,
        sessionID!,
        sessionTimer,
        correctPieces,
        incorrectPieces,
        correctActions,
        incorrectActions,
        activityThemeForData,
        'Cards'
      )

      const interactionData: activityCorrectPhraseInteractions = {
        userID: userID,
        sessionID: sessionID!,
        activityType: 'Cards',
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
      localStorage.setItem('activity:progress', dbstats)


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


  const handleCorrectAction = (actionPhrase: string, theme: string, phraseID: string) => {
    setCorrectActions(prev => prev + 1) // Increase correct actions count for db
    setCorrectActionsCount(prev => prev + 1) // Increase correct count for ui and activityComplete

    const correspondingCorrectPhrase = correctPhrases.find(phrase => phrase.actionPhrase === actionPhrase)
    if (correspondingCorrectPhrase) {
      const phraseID = correspondingCorrectPhrase.id
      setCorrectlyEngagedActivityPhraseIDs(prev => [...prev, phraseID])
    }
  }


  const handleIncorrectAction = () => {
    setIncorrectActions(prev => prev + 1) // Increase incorrect actions count for db
    setIncorrectActionsCount(prev => prev + 1) // Increase incorrect count for activityComplete
  }


  useEffect(() => {
    const xTheme = localStorage.getItem('x:theme') || 'gratitude'
    setActivityThemeForData(xTheme)
    setThemeForThemeImage(xTheme)

    Promise.all([
      fetchActionCorrectElementsData(xTheme),
      fetchActionIncorrectElementsData(xTheme)
    ])
      .then(([correctData, incorrectData]) => {
        setCorrectPhrases(correctData)
        const phraseID = correctData[0]?.id || ''
        setIncorrectPhrases(incorrectData)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Failed to fetch data:', error)
        setIsLoading(false)
      })
  }, [])


  const [repeatedPhrases, setRepeatedPhrases] = useState<ActivityDataType[]>([])

  const {
    correctPhrases,
    setCorrectPhrases,
    incorrectPhrases,
    setIncorrectPhrases,
    shuffledPhrases,
    num,
    generateNewRandomNumber,
  } = useShuffleLogic()


  return (
    <TimerProvider>
      <div className='activity_cards_background'>
        {finalResult ? (
          <ActivityCompleteAnimation
            sounds={sounds}
            correctPiecesCount={0}
            incorrectPiecesCount={0}
            correctActionsCount={correctActionsCount}
            incorrectActionsCount={incorrectActionsCount}
            activityType='Cards'
          />
        ) : (
          <>
            <div className='points_timer_div pjs'>
              <div className='points_timer_color1 timer'>
                <TimeWidget
                  activityType='Cards'
                  endTimerParentFunction={() => setFinalResult(true)}
                  resetCurrentScore={resetSessionScore}
                  resetCurrentActivitySessionData={resetActivitySessionData}
                />
              </div>
              <div className='ambients3 points_timer_color2' tabIndex={0}>
                <h2>correct answers: {correctActionsCount}</h2>
              </div>
            </div>
            <div className='cards'>
              <div className='container flex justify-center m-auto'>
                {shuffledPhrases.length > 0 && (
                  <CardsFunctions
                    handleCorrectAction={handleCorrectAction}
                    handleIncorrectAction={handleIncorrectAction}
                    shuffledPhrases={shuffledPhrases}
                    repeatedPhrases={repeatedPhrases}
                    setRepeatedPhrases={setRepeatedPhrases}
                    num={num}
                    generateNewRandomNumber={generateNewRandomNumber}
                    sounds={sounds}
                    themeForThemeImage={themeForThemeImage}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </TimerProvider>
  )
}

export default Cards
