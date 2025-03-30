/* _ShuffleScrambleArray.tsx */

import { useState } from 'react'

interface DataType {
    id: string
    ot: string
    actionTheme: string
    actionPhrase: string
    actionPhraseCorrect: string
    actionPhraseIncorrect: string
    actionThemeId: string
    activityScrambleArray: string[]
    themeImage: string
    actionIsCorrect: boolean
}

export function useScrambleShuffleLogic() {
    const [correctPhrases, setCorrectPhrases] = useState<DataType[]>([])
    const [shuffledPieces, setShuffledPieces] = useState<DataType[]>([])

    const shuffleAndCombine = (correctElements: DataType[], incorrectPieces: any[]) => {
        let combinedArray: any[] = []
    
        correctElements.forEach(correctElement => {
          let selectedIncorrectPieces: any[] = []
          while (selectedIncorrectPieces.length < 4) {
            const randomIndex = Math.floor(Math.random() * incorrectPieces.length)
            const selectedPiece = incorrectPieces[randomIndex]
      
            if (!selectedIncorrectPieces.includes(selectedPiece)) {
              selectedIncorrectPieces.push(selectedPiece)
            }
          }
      
          combinedArray.push(correctElement, ...selectedIncorrectPieces)
        })
      
        for (let i = combinedArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [combinedArray[i], combinedArray[j]] = [combinedArray[j], combinedArray[i]]
        }
    
        setShuffledPieces(combinedArray)
    }

    return {
        correctPhrases,
        shuffledPieces,
        shuffleAndCombine
    }
}
