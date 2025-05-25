/* _CardsValidateAnswer.jsx */
export const validateCardsAnswer = (
  phrases,
  num,
  handleAccurateAnswerAnimation,
  handleIncurateAnswerAnimation,
  handleCorrectAction,
  handleIncorrectAction,
  generateNewRandomNumber,
  ButtonBehaviour
) => {
  const currentPhrase = phrases[num]

  if (ButtonBehaviour === 1 && currentPhrase.actionIsCorrect === '1') {
    handleAccurateAnswerAnimation()
    handleCorrectAction(currentPhrase.actionPhrase, currentPhrase.actionTheme, currentPhrase.id)
  }

  if (ButtonBehaviour === 0 && currentPhrase.actionIsCorrect === '0') {
    handleAccurateAnswerAnimation()
    handleCorrectAction(currentPhrase.actionPhrase, currentPhrase.actionTheme, currentPhrase.id)
  }

  if (
    (ButtonBehaviour === 1 && currentPhrase.actionIsCorrect !== '1') ||
    (ButtonBehaviour === 0 && currentPhrase.actionIsCorrect !== '0')
  ) {
    handleIncurateAnswerAnimation()
    handleIncorrectAction()
  }

  setTimeout(() => {
    generateNewRandomNumber()
  }, 4400)
}
