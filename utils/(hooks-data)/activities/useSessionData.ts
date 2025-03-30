// useSessionData.ts
import { useEffect } from 'react'

import useLocalStorage from '../../useLocalStorage'

type SessionDataType = {
    sessionID: number
    correctCount: number
    bonusBeans: number
    incorrectCount: number
}

const initialActivityState: SessionDataType = {
    sessionID: 0,
    correctCount: 0,
    bonusBeans: 0,
    incorrectCount: 0
}

type ActivityType =  'Seeds' | 'Typer' |'Cards' | 'Scramble'

const useSessionData = (
    finalResults: boolean,
    activityType: ActivityType,
    correctCount: number,
    bonusBeans: number,
    incorrectCount: number
) => {
    const [sessionData, setSessionData] = useLocalStorage('sessionData', initialActivityState)

    const [seedsSessionData, setSeedsSessionData] = useLocalStorage('seedsSessionData', initialActivityState)
    const [typerSessionData, setTyperSessionData] = useLocalStorage('typerSessionData', initialActivityState)
    const [cardsSessionData, setCardsSessionData] = useLocalStorage('cardsSessionData', initialActivityState)
    const [scrambleSessionData, setScrambleSessionData] = useLocalStorage('scrambleSessionData', initialActivityState)

    const activityHandlers = {
        'Seeds': setSeedsSessionData,
        'Typer': setTyperSessionData,
        'Cards': setCardsSessionData,
        'Scramble': setScrambleSessionData,
    }

    // useEffect(() => {
    //     if (finalResults) {
    //         const newSessionData: SessionDataType = {
    //             sessionID: Date.now(),
    //             correctCount,
    //             bonusBeans,
    //             incorrectCount
    //         }

    //         const newSessionDataLog = [...sessionLog, newSessionData]
    //         setSessionLog(newSessionDataLog)

    //         if (activityHandlers[activityType]) {
    //             activityHandlers[activityType](newSessionData)
    //         }

    //         if (!activityHandlers[activityType]) {
    //             console.error("Invalid activity type:", activityType)
    //         }

    //         const updatedTotalData = {
    //             correctCount: totalData.correctCount + correctCount,
    //             bonusBeans: totalData.bonusBeans + bonusBeans,
    //             incorrectCount: totalData.incorrectCount + incorrectCount
    //         }
    //         setTotalData(updatedTotalData)
    //     }
    // }, [finalResults, activityType, correctCount, bonusBeans, incorrectCount])

    return {
        sessionData,
        seedsSessionData,
        typerSessionData,
        cardsSessionData,
        scrambleSessionData
    }
}

export default useSessionData