/* _TyperCardDisplay.jsx */
import React, { useEffect, useState, useRef } from 'react'

import _TyperPhrase from './_TyperPhrase'
import _TyperInputWithSubmit from './_TyperInputWithSubmit'
import { validateTyperAnswer } from './_TyperValidateAnswer'

function TyperCardDisplay({ shuffledPhrases, num, inputValue, setInputValue }) {

    const [cursorPosition, setCursorPosition] = useState(0)
    const inputRef = useRef(null)

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
        }, 4400)
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
        }, 4400)
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
            inputRef.current.setSelectionRange(cursorPosition, cursorPosition)
        }

        // Cleanup the event listener on component unmount
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('keydown', handleKeyDown)
            }
        }
    }, [inputValue, shuffledPhrases, num, cursorPosition])

    return (
        <div>
            {shuffledPhrases.length > 0 && num >= 0 && num < shuffledPhrases.length ? (
                <>
                    <_TyperPhrase
                        actionPhrase={shuffledPhrases[num].actionPhrase}
                    />
                    <input
                        ref={inputRef}
                        id='Activity Typer Input'
                        name='Activity Typer Input'
                        type='text'
                        className='typer_input_box mt-4'
                        value={inputValue}
                        onChange={(e) => {
                            const newCursorPosition = inputRef.current.selectionStart
                            setCursorPosition(newCursorPosition)
                            setInputValue(e.target.value)
                        }}
                        placeholder='Type the phrase here'
                        autoFocus
                    />
                </>
            ) : (
                <div className="card_wrapper">
                    <p className="typer_phrase">Loading...</p>
                </div>
            )}
        </div>
    )
}

export default TyperCardDisplay
