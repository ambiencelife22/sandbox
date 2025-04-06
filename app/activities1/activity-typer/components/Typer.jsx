/* Typer.jsx */
import React, { useState, useEffect, useRef } from 'react'

// @@ Import aux hooks @@
import { CheckMarkWhite, XMark } from '../../../components/SVG'
import { validateTyperAnswer } from './_TyperValidateAnswer'

import Head from 'next/head'

// @@ Import partner functions @@
import TyperPhrase from './_TyperPhrase'

// Answer Indicator Component
function AnswerIndicator({ isActive, isCorrect, hideIndicator }) {
    return (
        <div className={isActive && !hideIndicator ? 'typer_validation animate__animated animate__jackInTheBox' : 'inactive done'}>
            {isActive && (isCorrect ? <CheckMarkWhite /> : <XMark />)}
        </div>
    )
}

function TyperFunctions({
    handleCorrectAction,
    handleIncorrectAction,
    shuffledPhrases = [],
    num,
    generateNewRandomNumber,
    getNextPhraseIndex,
    setRepeatedPhrases,
    sounds,
    themeForThemeImage
}) {

    const [inputValue, setInputValue] = useState('')
    const [isCorrect, setIsCorrect] = useState(null)

    const inputRef = useRef(null)
    const [cursorPosition, setCursorPosition] = useState(0)

    const [currentPhrase, setCurrentPhrase] = useState('')
    const [currentThemeImage, setCurrentThemeImage] = useState('')

    const [loading, setLoading] = useState(true)

    // State variables for animations
    const [active, setActive] = useState(false)
    const [active2, setActive2] = useState(false)
    const [active3, setActive3] = useState(false)
    const [displayAnswer, setDisplayAnswer] = useState(false)
    const [wait, setWait] = useState(false)

    // Sound Play Functions
    const incorrectPlay = () => {
        sounds.incorrectActionSound.toggle()
    }
    const correctPlay = () => {
        sounds.correctActionSound.toggle()
    }

    const handleAccurateAnswerAnimation = () => {
        setCurrentPhrase(shuffledPhrases[num].actionPhraseCorrect)
        setCurrentThemeImage(shuffledPhrases[num].themeImage)

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
            setInputValue('')
            setIsCorrect(null)
            setWait(false)
            setDisplayAnswer(true)
            setTimeout(() => {
                getNextPhraseIndex()
            }, 44)
        }, 4444)
    }

    const handleIncurateAnswerAnimation = () => {
        setCurrentPhrase(shuffledPhrases[num].actionPhraseIncorrect)
        setCurrentThemeImage(shuffledPhrases[num].themeImage)

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
            setInputValue('')
            setIsCorrect(null)
            setWait(false)
            setDisplayAnswer(false)
            setTimeout(() => {
                getNextPhraseIndex()
            }, 44)
        }, 4444)
    }

    const handleSubmission = () => {
        const isCorrectAnswer = inputValue === shuffledPhrases[num].actionPhrase
        const isIncorrectAnswer = inputValue != shuffledPhrases[num].actionPhrase
      
        if (isCorrectAnswer) {
          setCurrentPhrase(shuffledPhrases[num].actionPhraseCorrect)
          setCurrentThemeImage(shuffledPhrases[num].themeImage)
          setDisplayAnswer(true)
          correctPlay()
          handleCorrectAction()
        }
        
        if (isIncorrectAnswer) {
          setCurrentPhrase(shuffledPhrases[num].actionPhraseIncorrect)
          setCurrentThemeImage(shuffledPhrases[num].themeImage)
          setDisplayAnswer(false)
          incorrectPlay()
          handleIncorrectAction()
        }
      
        setWait(true)
        setActive(true)
      
        setTimeout(() => {
          setActive3(true)
        }, 2200)
      
        setTimeout(() => {
          setActive(false)
          setActive3(false)
          setInputValue('')
          setIsCorrect(isCorrectAnswer)
          setWait(false)
          setDisplayAnswer(true)
          getNextPhraseIndex()
        }, 4444)
      }


    // Typer Display Component
    function TyperDisplay({ shuffledPhrases, num, inputValue, setInputValue }) {
        return (
            <div>
                {shuffledPhrases.length > 0 && num >= 0 && num < shuffledPhrases.length ? (
                    <>
                        <TyperPhrase
                            actionPhrase={shuffledPhrases[num].actionPhrase}
                        />
                        <div className='m-auto text-center'>
                        <input
                            ref={inputRef}
                            id='Activity Typer Input'
                            name='Activity Typer Input'
                            type='text'
                            className='typer_input_box mt-4 max-w-[99%]'
                            value={inputValue}
                            onChange={(e) => {
                                const newCursorPosition = inputRef.current.selectionStart
                                
                                // Capture current window scroll position
                                const x = window.scrollX
                                const y = window.scrollY
                            
                                // Update state variables
                                setCursorPosition(newCursorPosition)
                                setInputValue(e.target.value)
                            
                                // After setting state (or any other operations that might cause a scroll jump), restore scroll position
                                window.scrollTo(x, y)
                            }}
                            placeholder='Type the phrase here'
                            autoFocus
                        />
                        </div>
                    </>
                ) : (
                    <div className='card_wrapper'>
                        <p className='typer_phrase'>Loading...</p>
                    </div>
                )}
            </div>
        )
    }



    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                validateTyperAnswer(
                    inputValue,
                    shuffledPhrases[num].actionPhrase,
                    handleAccurateAnswerAnimation,
                    handleIncurateAnswerAnimation,
                    handleCorrectAction,
                    handleIncorrectAction,
                    generateNewRandomNumber
                )
            }
        }
    
        if (inputRef.current) {
            inputRef.current.addEventListener('keydown', handleKeyDown)
            
            // Capture current window scroll position
            const x = window.scrollX
            const y = window.scrollY
    
            inputRef.current.setSelectionRange(cursorPosition, cursorPosition)
            
            // After setting the cursor position, restore scroll position
            window.scrollTo(x, y)
        }
    
        // Cleanup the event listener on component unmount
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('keydown', handleKeyDown)
            }
        }
    }, [inputValue, shuffledPhrases, num, cursorPosition])
    


    return (
        
        <div className='typer_container_screen'>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
            </Head>
            <div className='input_and_button_wrapper'>
                {!active && !active2 && (
                    <div className='typer_card_container'>
                        <TyperDisplay
                            shuffledPhrases={shuffledPhrases}
                            num={num}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                    </div>
                )}
        
                {!active && !active2 && (
                    <div className='typer_submit_button_container'>
                        <button
                            aria-label='Submit'
                            className='typer_submit_button shadow-xl hover:shadow-2xl focus:shadow-2xl font-[Plus Jakarta Sans] mt-4 block rounded-xl bg-[#54005C] text-center'
                            onClick={handleSubmission}
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>
    
            <div className='card_done_container'>
                {/* Answer Indicator */}
                <div className='answer_valid_indicator_container'>
                    <AnswerIndicator isActive={active} isCorrect={true} />
                    <AnswerIndicator isActive={active2} isCorrect={false} />
                </div>
                
                <div className={active3 ? 'active3' : 'inactive3'}>
                    <div className={displayAnswer ? 'bg_green_typer' : 'bg_red_typer'}>
                        <div className='card_wrapper'>
                            <p className='typer_phrase'>
                                {currentPhrase}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )    
}

export default TyperFunctions
