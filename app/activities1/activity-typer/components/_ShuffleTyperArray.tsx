/* _ShuffleTyperArray.tsx */
import { useState, useEffect } from 'react'

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

export function useShuffleLogic() {
    const [correctPhrases, setCorrectPhrases] = useState<ActivityDataType[]>([])
    const [shuffledPhrases, setShuffledPhrases] = useState<ActivityDataType[]>([])
    const [num, setNum] = useState(0)

    const generateNewRandomNumber = () => {
        setNum(Math.floor(Math.random() * shuffledPhrases.length))
    }

    // Fisher-Yates (aka Knuth) Shuffle
    function shuffleArray(array: ActivityDataType[]) {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
        }
        return shuffledArray
    }

    useEffect(() => {
        setShuffledPhrases(shuffleArray(correctPhrases))
    }, [correctPhrases])

    useEffect(() => {
        generateNewRandomNumber()
    }, [shuffledPhrases])

    return {
        correctPhrases,
        setCorrectPhrases,
        shuffledPhrases,
        num,
        setNum,
        generateNewRandomNumber,
    }
}
