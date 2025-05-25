/* activityUserResults.tsx */

import { API_URL } from '../../../app/pages/api/ud/TEMPlogUserActivityData'

// User Activity Points Tracking
type userActivityStats = {
    userID: string
    sessionID: number
    sessionTimer: number
    correctPieces: number
    incorrectPieces: number
    correctActions: number
    incorrectActions: number
    xTheme: string
    bonusBeans: number
    activityType: string
}

// Define the logic for each activity type in a centralized location.
const activityConfigurations: { [key: string]: (params: any) => number } = {
    'Seeds': (params) => 2,
    'Typer': (params) => (params.incorrectActions === 0 && params.correctActions > 0) ? 4 : 0,
    'Cards': (params) => (params.incorrectActions === 0 && params.correctActions > 0) ? 4 : 0,
    'Scramble': (params) => params.correctActions > 0 
        ? (params.correctActions + (params.incorrectActions + params.incorrectPieces === 0 ? 11 : 0))
        : 0,
}

// Utility function to create a userStats instance
function createUserStats(
    userID: string, 
    sessionID: number, 
    sessionTimer: number, 
    correctPieces: number,
    incorrectPieces: number,
    correctActions: number,
    incorrectActions: number,
    xTheme: string,
    activityType: string,
): userActivityStats {
    const bonusCalculation = activityConfigurations[activityType]
    if (!bonusCalculation) {
        throw new Error(`Unknown activity type: ${activityType}`)
    }

    return {
        userID,
        sessionID,
        sessionTimer,
        correctPieces,
        incorrectPieces,
        correctActions,
        incorrectActions,
        xTheme,
        bonusBeans: bonusCalculation({
            correctActions,
            incorrectActions,
            correctPieces,
            incorrectPieces,
        }),
        activityType,
    }
}



// User Activity Phrase Tracking
type activityCorrectPhraseInteractions = {
    userID: string
    sessionID: number
    activityType: string  // Activity type
    xTheme: string         // Theme (examples: gratitude, happiness)
    correctActivityInteractions: { [phraseID: string]: number }  // Dictionary of phraseID to count
    xCategory: string
}

type CombinedActivityData = {
    activityResultsTracking: userActivityStats,
    activityPhraseInteractions: activityCorrectPhraseInteractions
}

async function saveCombinedActivityData(data: CombinedActivityData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return response.json()
    } catch (error) {
        console.error('Error saving data to database:', error)
        throw error
    }
}

export { createUserStats, saveCombinedActivityData, type activityCorrectPhraseInteractions }
