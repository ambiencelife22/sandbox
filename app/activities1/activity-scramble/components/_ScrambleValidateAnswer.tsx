/* _ScrambleValidateAnswer.tsx */
type HandleActionPieceClickProps = {
  clickedId: number
  actionCorrectElements: any[]
  activeSentenceIndex: number
  activeItems: number
  handleCorrectCount: () => void
  handleIncorrectCount: () => void
  sounds: any
  incorrectAttempts: number
}

export const handleActionPieceClick = ({
  clickedId,
  actionCorrectElements,
  activeSentenceIndex,
  activeItems,
  handleCorrectCount,
  handleIncorrectCount,
  sounds,
  incorrectAttempts,
}: HandleActionPieceClickProps) => {
  const result = {
    nextActiveItem: activeItems,
    newIncorrectAttempts: incorrectAttempts,
    shouldPlayIncorrectSound: false,
    showHint: false,
    correctActionCompleted: false,
    incorrectActionCompleted: false,
    newClickedIds: [] as number[],  // Explicitly mention the type as number array
  }

  // Additional check for undefined values
  if (
    actionCorrectElements && 
    actionCorrectElements[activeSentenceIndex] &&
    actionCorrectElements[activeSentenceIndex].activityScrambleArray &&
    typeof actionCorrectElements[activeSentenceIndex].activityScrambleArray[activeItems] !== 'undefined' &&
    clickedId === actionCorrectElements[activeSentenceIndex].activityScrambleArray[activeItems].id
  ) {
    result.nextActiveItem = activeItems + 1
    sounds.correctPieceSound.toggle()
    handleCorrectCount()
    
    if (activeItems >= actionCorrectElements[activeSentenceIndex].activityScrambleArray.length - 1) {
      result.correctActionCompleted = true
    }

    result.newClickedIds.push(clickedId)
    return result  // Exit early
  }

  handleIncorrectCount()
  result.newIncorrectAttempts = incorrectAttempts + 1

  if (result.newIncorrectAttempts === 1 || result.newIncorrectAttempts === 2) {
    sounds.incorrectPieceSound.toggle()
    result.shouldPlayIncorrectSound = true
  }

  if (result.newIncorrectAttempts === 2) {
    result.showHint = true
  }

  if (result.newIncorrectAttempts === 3) {
    result.incorrectActionCompleted = true
  }

  return result
}
