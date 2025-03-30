/* Cards.jsx */
import { useEffect, useState, useRef } from 'react'

// @@ Import external functions @@
import AnimateTrash from '../../../(a-growers)/components/activities/AnimateTrash'
import AnimateHeart from '../../../(a-growers)/components/activities/AnimateHeart'

// @@ Import aux hooks @@
import { HeartFull } from '../../../(a-growers)/components/activities/AnimateHeart'
import { TrashClosed } from '../../../(a-growers)/components/activities/AnimateTrash'
import { CheckMark, XMark } from '../../../components/SVG'

// @@ Import partner functions @@
import CardPhrase from './_CardPhrase'

// @@ Import partner hooks @@
import { validateCardsAnswer } from './_CardsValidateAnswer'

function CardsFunctions({
  handleCorrectAction,
  handleIncorrectAction,
  shuffledPhrases = [],
  num,
  generateNewRandomNumber,
  repeatedPhrases,
  setRepeatedPhrases,
  sounds,
  themeForThemeImage
}) {

  // Initial empty states for correct and incorrect phrases
  const [phrases, setPhrases] = useState(shuffledPhrases)

  // Additional State Variables Declared
  const [active, setActive] = useState(false)
  const [active2, setActive2] = useState(false)
  const [active3, setActive3] = useState(false)
  const [displayAnswer, setDisplayAnswer] = useState(false)
  const [wait, setWait] = useState(false)
  

  // User Defaults
  const [users, setUsers] = useState(['Ari', 'Ella', 'Sel', 'D'])
  const [currentUser, setCurrentUser] = useState('Jake')


  // Animated Icons Constants
  const [trashOpeningAnimation, setTrashOpeningAnimation] = useState(false)
  const [heartOpeningAnimation, setHeartOpeningAnimation] = useState(false)

  // Sound Play Functions
  const incorrectPlay = () => {
    sounds.incorrectActionSound.toggle()
  }
  const correctPlay = () => {
    sounds.correctActionSound.toggle()
  }

  // For moving accessibility focus back to Card after interaction
  const phraseFocusRef = useRef(null)

  // For aria-live polite announcement
  const [ariaLiveMessage, setAriaLiveMessage] = useState('')



  const handleAccurateAnswerAnimation = () => {
    setDisplayAnswer(true)
    correctPlay()
    setWait(true)
    setActive(true)
    setTimeout(() => {
        setActive3(true)
    }, 2200)
  
    setTimeout(() => {
        setActive(false)
        setActive3(false)
        setHeartOpeningAnimation(false)
        setWait(false)
    }, 4400)
  }

  
  const handleIncurateAnswerAnimation = () => {
    setDisplayAnswer(false)
    incorrectPlay()
    setActive2(true)
    setWait(true)
    setTimeout(() => { }, 400)
  
    setTimeout(() => {
      setActive3(true)
    }, 2200)
  
    setTimeout(() => {
      setActive2(false)
      setActive3(false)
      setWait(false)
    }, 4400)
  }


  useEffect(() => {
    const lowerArray = users.map((element) => {
      return element.toLowerCase()
    })
    setCurrentUser(currentUser.toLocaleLowerCase())
  }, [])

  // Answer Indicator Component
  function AnswerIndicator({ isActive, isCorrect }) {
    return (
      <div className={isActive ? 'active done animate__animated animate__jackInTheBox' : 'inactive done'}>
        {isActive && (isCorrect ? <CheckMark /> : <XMark />)}
      </div>
    )
  }

  // Card Display Component
  function CardDisplay({ phrases, num }) {
    return (
      <div className='card_wrapper' tabIndex={0}>
        {phrases.length > 0 && num >= 0 && num < phrases.length ? (
          <CardPhrase themeImage={phrases[num].themeImage} actionPhrase={phrases[num].actionPhrase} phraseFocusRef={phraseFocusRef} themeForThemeImage={themeForThemeImage} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
  

  return (
    <>
      <div className='card_container_screen'>
        
        {/* Answer Indicator */}
        <div className='card_done_container'>
          <div className='answer_valid_indicator_container'>
            <AnswerIndicator isActive={active} isCorrect={true} />
            <AnswerIndicator isActive={active2} isCorrect={false} />
          </div>

          <div className={active2 || active ? 'card_container activeCard ' : 'card_container inactiveCard'}>
            <CardDisplay phrases={phrases} num={num} />
          </div>

          <div className={active3 ? ' active3' : ' inactive3 '}>
            <div className={displayAnswer ? 'bg_green' : 'bg_red'}>
              {displayAnswer ? (
                <div className='card_wrapper'>
                  <div className='theme_image'>
                    {num >= 0 && num < phrases.length ? (
                      <img src={phrases[num].themeImage} alt='ambience.LIFE theme image' aria-label={themeForThemeImage} />
                    ) : ('')}
                  </div>
                  <p className='card_phrase' style={{ color: displayAnswer ? '' : '#F1F1F1' }}>
                    {num >= 0 && num < phrases.length ? phrases[num].actionPhraseCorrect : ''}
                  </p>
                </div>
              ) : (
                <div className='card_wrapper'>
                  <div className='theme_image'>
                    {num >= 0 && num < phrases.length ? (
                      <img src={phrases[num].themeImage} alt='ambience.LIFE theme image' aria-label={themeForThemeImage} />
                    ) : ('')}
                  </div>
                  <p className='card_phrase'>
                    {num >= 0 && num < phrases.length ? phrases[num].actionPhraseIncorrect : ''}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

       {/* Interaction Buttons */}
       <div className='buttons interactions_container'>
          
       <div
    className='trash_div'
    onClick={
      wait
        ? null
        : () => {
            setTrashOpeningAnimation(true)
            validateCardsAnswer(
              phrases,
              num,
              handleAccurateAnswerAnimation,
              handleIncurateAnswerAnimation,
              handleCorrectAction,
              handleIncorrectAction,
              generateNewRandomNumber,
              0  // This represents the ButtonBehaviour for trash
            )
            setTimeout(() => {
              setTrashOpeningAnimation(false)
            }, 3300)
        }
    }
>
  <button className='kd_btn'>
    {!trashOpeningAnimation ? <TrashClosed /> : <AnimateTrash />}
  </button>
</div>

<div
    className='heart_div'
    onClick={
      wait
        ? null
        : () => {
            setHeartOpeningAnimation(true)
            validateCardsAnswer(
              phrases,
              num,
              handleAccurateAnswerAnimation,
              handleIncurateAnswerAnimation,
              handleCorrectAction,
              handleIncorrectAction,
              generateNewRandomNumber,
              1  // This represents the ButtonBehaviour for heart
            )
            setTimeout(() => {
              setHeartOpeningAnimation(false)
            }, 3300)
        }
    }
>
  <button className='kd_btn'>
    {!heartOpeningAnimation ? <HeartFull /> : <AnimateHeart />}
  </button>
</div>
        </div>

      </div>
    </>
  )
}

export default CardsFunctions